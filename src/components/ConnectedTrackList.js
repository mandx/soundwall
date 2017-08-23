import { connect } from 'preact-redux';

import TrackList from './TrackList';
import { mixTrack } from '../ducks';


export default connect(
  function ({ tracks }) {
    return {
      tracks,
    };
  },
  function (dispatch) {
    return {
      onAdd(track) {
        return dispatch(mixTrack(track));
      },
    };
  }
)(TrackList);
