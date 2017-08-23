import { h, Component } from 'preact';

import './styles/App.css';
import TrackList from './components/ConnectedTrackList';
import Mixer from './components/ConnectedMixer';


export default class SoundWallApp extends Component {
  render() {
    return (
      <main id="app">
        <Mixer/>
        <TrackList/>
      </main>
    );
  }
}
