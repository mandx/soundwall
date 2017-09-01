import { connect } from 'preact-redux';

import MixerTrackList from  './MixerTrackList';
import { setTrackVolume, removeTrack } from '../ducks';


export default connect(
  function ({ mixerInstance }) {
    return {
      mix: mixerInstance.tracks.map(function (track) {
        return {
          ...track.meta,
          volume: track.volume,
        };
      }),
    };
  },
  function (dispatch) {
    return {
      onRemove(track) { dispatch(removeTrack(track)); },
      onSetVolume(track, volume) { dispatch(setTrackVolume(track, volume)); },
    };
  }
)(MixerTrackList);
