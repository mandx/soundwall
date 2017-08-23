import { h, Component } from 'preact';
import classnames from 'classnames';
import CogIcon from 'preact-icons/lib/fa/cog';

import '../styles/SettingsLauncher.css';

export default class SettingsLauncher extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleToggleVisible = this.handleToggleVisible.bind(this);
  }

  handleToggleVisible() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const
      containerClassName = 'settings-form-container',
      { open } = this.state;

    return (
      <aside className="settings">
        <button onClick={this.handleToggleVisible}>
          <CogIcon/>
          {open ? 'Close settings' : 'Settings'}
        </button>
        <div className={classnames(containerClassName, open ? containerClassName + '-open' : '')}>
          <label>
            <input type="checkbox" checked/>
            Play last mix at startup
          </label>
        </div>
      </aside>
    );
  }
}
