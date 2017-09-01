import { connect } from 'preact-redux';

import Mixer from  './Mixer';


export default connect(
  function ({ mixing }) {
    return {
      mixing,
    };
  }
)(Mixer);
