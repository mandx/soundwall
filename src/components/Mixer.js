import { h, Component } from 'preact';
import PlayCircleIcon from 'preact-icons/lib/fa/play-circle';

import MixerTrackList from './ConnectedMixerTrackList';
import SettingsLauncher from './ConnectedSettingsLauncher';


export default class Mixer extends Component {
  render() {
    return (
      <section className="mixer">
        <section className="controls">
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
