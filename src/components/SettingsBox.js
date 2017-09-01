import { h, Component } from 'preact';
import { autobind } from 'core-decorators';
import classnames from 'classnames';
import CogIcon from 'preact-icons/lib/fa/cog';

import '../styles/SettingsBox.css';

export default class SettingsBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  @autobind
  handleToggleVisible() {
    this.setState({ open: !this.state.open });
  }

  @autobind
  handleSetVolume({ target }) {
    const { onSetVolume: callback, track } = this.props;
    callback(track, target.value / 100);
  }

  render() {
    const
      { volume } = this.props,
      containerClassName = 'settings-form-container',
      { open } = this.state;

    return (
      <aside className="settings">
        <button title="Settings" class="round settings" onClick={this.handleToggleVisible}>
          <CogIcon/>
          {/* open ? 'Close settings' : 'Settings' */}
        </button>
        <div className={classnames(containerClassName, open ? containerClassName + '-open' : '')}>
          <label className="setting checkbox">
            <input type="checkbox" checked/>
            Play last mix at startup
          </label>
          <label className="setting slider">
            <input
              type="range"
              min={0}
              max={100}
              value={volume * 100}
              onChange={this.handleSetVolume}
              title="Master volume"/>
          </label>
        </div>
      </aside>
    );
  }
}
