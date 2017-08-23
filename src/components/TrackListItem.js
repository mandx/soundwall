import { h, Component } from 'preact';

import '../styles/TrackListItem.css';


export default class TrackListItem extends Component {

  constructor(props) {
    super(props);
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  handleAddClick() {
    const { onAdd: callback, track } = this.props;
    callback(track);
  }

  render() {
    const
      { track } = this.props;

    return (
      <div className="track-list-item">
        <dt>{track.title}</dt>
        <dd><button onClick={this.handleAddClick}>Add</button></dd>
      </div>
    );
  }
}
