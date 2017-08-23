import { connect } from 'preact-redux';

import MixerTrackList from  './MixerTrackList';

export default connect(
  function ({ mix }) {
    return {
      mix,
    };
  },
  function (dispatch) {
    return {
      onRemove(track) { console.log(track); },
      onSetVolume(track, volume) { console.log(track, volume); },
    };
  }
)(MixerTrackList);
