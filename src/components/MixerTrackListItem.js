import { h, Component } from 'preact';
import { autobind } from 'core-decorators';
import MinusIcon from 'preact-icons/lib/fa/minus';

import '../styles/MixerTrackListItem.css';


export default class MixerTrackListItem extends Component {

  @autobind
  handleRemove() {
    const { onRemove: callback, track } = this.props;
    callback(track);
  }

  @autobind
  handleSetVolume({ target }) {
    const { onSetVolume: callback, track } = this.props;
    callback(track, target.value / 100);
  }

  render() {
    const
      { track } = this.props;

    return (
      <div className="mixer-track-list-item track-list-item">
        <dt className="track-title">{track.title}</dt>
        <dd className="track-volume">
          <input
            type="range"
            min={0}
            max={100}
            value={track.volume * 100}
            onChange={this.handleSetVolume}
            title="Track volume"/>
        </dd>
        <dd className="track-actions">
          <button className="round track-remove" title="Remove" onClick={this.handleRemove}>
            <MinusIcon/>
          </button>
        </dd>
      </div>
    );
  }
}
