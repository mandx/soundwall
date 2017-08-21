/* global window, fetch */

const ContextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext);


export class Track {
  constructor(source, gainNode) {
    this.source = source;
    this.gainNode = gainNode;
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
}


export default class Mixer {

  constructor() {
    this.context = new ContextClass();
  }

  addSourceFromUrl(url) {
    const { context } = this;

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
        gainNode.gain.value = 1;

        // Starts the playback of this source
        source.start(0);

        return new Track(source, gainNode);
      });
  }

  removeTrack(track) {
    track.disconnect(this.context);
  }
}
