import { h, Component } from 'preact';
import PlayIcon from 'preact-icons/lib/fa/play';
import RefreshIcon from 'preact-icons/lib/fa/refresh';

import MixerTrackList from './ConnectedMixerTrackList';
import SettingsBox from './ConnectedSettingsBox';
import '../styles/Mixer.css';


export default class Mixer extends Component {

  render() {
    const
      { mixing } = this.props;

    return (
      <section className="mixer">
        <section className="controls">
          <button disabled={mixing} class="round play" title="Play">
            {mixing
              ? <RefreshIcon className="spinning-icon"/>
              : <PlayIcon/>}
          </button>
        </section>
        <SettingsBox/>
        <MixerTrackList/>
      </section>
    );
  }
}
