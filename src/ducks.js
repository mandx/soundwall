/* global location, fetch */

import { resolve } from 'url';
import { REHYDRATE } from 'redux-persist/constants';

import { uniqueByKey, removeKeys } from './utilities';
import Mixer from './mixer';

export const BLACKLIST_KEYS = [
  'fetching',
  'mixing',
  'mixerInstance',
  '__mixingTracks',
];

const INITIAL_STATE = {
  __mixingTracks: {},
  fetching: false,
  mixing: false,
  playOnStartup: true,
  mixerInstance: new Mixer(),
  tracks: [],
};


export const TRACKS_MIX_START = 'TRACKS_MIX_START';
export const TRACKS_MIX_FINISH = 'TRACKS_MIX_FINISH';
export const TRACKS_FETCH_START = 'TRACKS_FETCH_START';
export const TRACKS_FETCH_FINISH = 'TRACKS_FETCH_FINISH';


export function mixTrack(track) {
  return function mixTrackAction(dispatch, getState) {
    const mixer = getState().mixerInstance;

    for (let i = mixer.tracks.length - 1; i >= 0; i--) {
      if (mixer.tracks[i].url == track.url) {
        return Promise.resolve(track);
      }
    }

    dispatch({ type: TRACKS_MIX_START, payload: track });
    return mixer.addSourceFromUrl(track.url, { meta: track }).then(function () {
      dispatch({ type: TRACKS_MIX_FINISH, payload: track });
      return track;
    });
  };
}


export function loadTracks() {
  return function loadTracksAction(dispatch) {
    dispatch({ type: TRACKS_FETCH_START });

    return fetch('sounds/manifest.json')
      .then(function (response) {
        return response.json();
      })
      .then(function (tracks) {
        tracks.forEach(function (track) {
          track.url = resolve('' + location, `sounds/${track.url}`);
        });

        dispatch({ type: TRACKS_FETCH_FINISH, payload: tracks });
        return tracks;
      });
  };
}


export default function reducer(state = INITIAL_STATE, action) {

  switch (action.type) {

    case REHYDRATE: {
      const incoming = action.payload.myReducer;
      if (incoming) {

        return {
          ...state,
          ...removeKeys(incoming, BLACKLIST_KEYS),
        };
      } else {
        return state;
      }
    }

    case TRACKS_FETCH_START:
      return {
        ...state,
        fetching: true,
      };

    case TRACKS_FETCH_FINISH:
      return {
        ...state,
        fetching: false,
        tracks: uniqueByKey(state.tracks.concat(action.payload), 'url'),
      };

    case TRACKS_MIX_START: {
      const __mixingTracks = {...state.__mixingTracks};
      __mixingTracks[action.payload.url] = true;

      return {
        ...state,
        __mixingTracks,
        mixing: true,
      };
    }

    case TRACKS_MIX_FINISH: {
      const __mixingTracks = {...state.__mixingTracks};
      delete __mixingTracks[action.payload.url];

      return {
        ...state,
        __mixingTracks,
        mixing: !!Object.keys(__mixingTracks).length,
      };
    }

    default:
      return state;
  }
}
