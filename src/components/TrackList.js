import { h, Component } from 'preact';
import { autobind } from 'core-decorators';

import '../styles/TrackList.css';
import TrackListItem from  './TrackListItem';


export default class TrackList extends Component {

  @autobind
  handleAdd(track) {
    const { onAdd: callback } = this.props;
    callback(track);
  }

  @autobind
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
