import { h, Component } from 'preact';

import '../styles/TrackList.css';
import TrackListItem from  './TrackListItem';


export default class TrackList extends Component {

  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.renderTrack = this.renderTrack.bind(this);
  }

  handleAdd(track) {
    const { onAdd: callback } = this.props;
    callback(track);
  }

  renderTrack(track) {
    return <TrackListItem key={track.id} track={track} onAdd={this.handleAdd}/>;
  }

  render() {
    const
      { tracks } = this.props;

    return (
      <dl className="available-tracks track-list">
        {tracks.map(this.renderTrack)}
      </dl>
    );
  }
}
