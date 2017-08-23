import { connect } from 'preact-redux';

import MixerTrackList from  './MixerTrackList';

export default connect(
  function ({ mixerInstance }) {
    return {
      mix: mixerInstance.tracks.map(function (track) { return track.meta; }),
    };
  },
  function (dispatch) {
    return {
      onRemove(track) { console.log(track); },
      onSetVolume(track, volume) { console.log(track, volume); },
    };
  }
)(MixerTrackList);
