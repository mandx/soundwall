import { h, Component } from 'preact';

import MixerTrackListItem from  './MixerTrackListItem';


export default class MixerTrackList extends Component {

  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSetVolume = this.handleSetVolume.bind(this);
    this.renderTrack = this.renderTrack.bind(this);
  }

  handleRemove(track) {
    const { onRemove: callback } = this.props;
    callback(track);
  }

  handleSetVolume(track, volume) {
    const { onSetVolume: callback } = this.props;
    callback(track, volume);
  }

  renderTrack(track) {
    return (
      <MixerTrackListItem
        key={track.id}
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
