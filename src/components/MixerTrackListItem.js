import { h, Component } from 'preact';


export default class MixerTrackListItem extends Component {

  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSetVolume = this.handleSetVolume.bind(this);
  }

  handleRemove() {
    const { onRemove: callback, track } = this.props;
    callback(track);
  }

  handleSetVolume(something) {
    console.log(something);
    const { onSetVolume: callback, track } = this.props;
    callback(track, /* volume? */);
  }

  render() {
    const
      { track } = this.props;

    return (
      <div className="mixer-track-list-item track-list-item">
        <dt>{track.title}</dt>
        <dd><input type="range" onChange={this.handleSetVolume}/></dd>
      </div>
    );
  }
}
