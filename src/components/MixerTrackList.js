import { h, Component } from 'preact';
import { autobind } from 'core-decorators';

import MixerTrackListItem from  './MixerTrackListItem';


export default class MixerTrackList extends Component {

  @autobind
  handleRemove(track) {
    const { onRemove: callback } = this.props;
    callback(track);
  }

  @autobind
  handleSetVolume(track, volume) {
    const { onSetVolume: callback } = this.props;
    callback(track, volume);
  }

  @autobind
  renderTrack(track) {
    return (
      <MixerTrackListItem
        key={track.url}
        track={track}
        onRemove={this.handleRemove}
        onSetVolume={this.handleSetVolume}/>
    );
  }

  render() {
    const
      { mix } = this.props;

    return (
      <dl className="mixer-track-list track-list">
        {mix.map(this.renderTrack)}
      </dl>
    );
  }
}
