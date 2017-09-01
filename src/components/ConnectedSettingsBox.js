import { connect } from 'preact-redux';

import { setTrackVolume } from '../ducks';
import SettingsBox from  './SettingsBox';

export default connect(
  function ({ settings, mixerInstance }) {
    return {
      settings,
      volume: mixerInstance.volume,
    };
  },
  function (dispatch) {
    return {
      onSetSettings(settings) { console.log(settings); },
      onSetVolume(track, volume) { dispatch(setTrackVolume(undefined, volume)); },
    };
  }
)(SettingsBox);
