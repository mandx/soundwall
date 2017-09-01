import { h, Component } from 'preact';
import { autobind } from 'core-decorators';
import PlusIcon from 'preact-icons/lib/fa/plus';

import '../styles/TrackListItem.css';


export default class TrackListItem extends Component {

  @autobind
  handleAddClick() {
    const { onAdd: callback, track } = this.props;
    callback(track);
  }

  render() {
    const
      { track } = this.props;

    return (
      <div className="track-list-item">
        <dt className="track-title">{track.title}</dt>
        <dd className="track-actions">
          {!track.disabled &&
            <button className="round track-add" title="Add" onClick={this.handleAddClick}>
              <PlusIcon/>
            </button>}
        </dd>
      </div>
    );
  }
}
