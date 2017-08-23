import { h, Component } from 'preact';
import PlayCircleIcon from 'preact-icons/lib/fa/play-circle';
import RefreshIcon from 'preact-icons/lib/fa/refresh';

import MixerTrackList from './ConnectedMixerTrackList';
import SettingsLauncher from './ConnectedSettingsLauncher';


export default class Mixer extends Component {
  render() {
    const
      { mixing } = this.props;

    return (
      <section className="mixer">
        <section className="controls">
          {!!mixing && <RefreshIcon/>}
          <button title="Play">
            <PlayCircleIcon/>
            Play
          </button>
        </section>
        <MixerTrackList/>
        <SettingsLauncher/>
      </section>
    );
  }
}
