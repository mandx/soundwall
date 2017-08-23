import { connect } from 'preact-redux';

import SettingsLauncher from  './SettingsLauncher';

export default connect(
  function ({ settings }) {
    return {
      settings,
    };
  },
  function (dispatch) {
    return {
      onSetSettings(settings) { console.log(settings); },
    };
  }
)(SettingsLauncher);
