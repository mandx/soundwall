/* global window, fetch */

const ContextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext);


export class Track {

  constructor(url, source, gainNode) {
    this._url = url;
    this.source = source;
    this.gainNode = gainNode;
  }

  get url() {
    return this._url;
  }

  get volume() {
    return this.gainNode.gain.value;
  }

  set volume(value) {
    return this.gainNode.gain.value;
  }

  disconnect(...args) {
    this.source.disconnect(...args);
    this.gainNode.disconnect(...args);
  }

  toJSON() {
    return {
      url: this.url,
      volume: this.volume,
    };
  }

  fromJSON(data, mixer) {
    return mixer.addSourceFromUrl(data.url, data.volume);
  }
}


export default class Mixer {

  constructor() {
    this._context = new ContextClass();
    this._tracks = [];
  }

  get tracks() {
    return [].concat(this._tracks);
  }

  addSourceFromUrl(url, volume=1) {
    const
      self = this,
      { _context: context } = this;

    return fetch(url)
      .then(function (response) {
        return response.arrayBuffer();
      })
      .then(function (buffer) {
        return context.decodeAudioData(buffer);
      })
      .then(function (audioData) {
        const
          source = context.createBufferSource(),
          gainNode = context.createGain();

        source.buffer = audioData;
        source.loop = true;

        // Connect the source to the gain node.
        source.connect(gainNode);
        // Connect the gain node to the destination.
        gainNode.connect(context.destination);
        gainNode.gain.value = volume;

        // Starts the playback of this source
        source.start(0);

        const track = new Track(url, source, gainNode);
        self._tracks.push(track);
        return track;
      });
  }

  removeTrack(track) {
    this._tracks = this._tracks.filter(function (currentTrack) {
      if (currentTrack === track) {
        track.disconnect(this._context);
        return false;
      }
      return true;
    });
  }
}
