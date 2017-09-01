/* global window, fetch */

import { autobind } from 'core-decorators';

const ContextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext);


const FADE_TIME = 3;


export class Track {

  constructor(audioBuffer, context, url, { meta, volume }) {
    this.context = context;
    this._url = url;
    this.meta = meta;
    this.sources = [];

    const
      volumeNode = this.volumeNode = context.createGain();

    if (typeof volume != 'number' || volume < 0 || volume > 1) {
      volume = 1;
    }
    volumeNode.gain.value = volume;

    this.audioBuffer = audioBuffer;
  }

  newSource(time) {
    const
      source = this.context.createBufferSource(),
      fadeInNode = this.context.createGain(),
      fadeOutNode = this.context.createGain(),
      { duration } = this.audioBuffer;

    source.buffer = this.audioBuffer;
    source.connect(fadeInNode);
    fadeInNode.connect(fadeOutNode);
    fadeOutNode.connect(this.volumeNode);

    // Fade the playNow track in.
    fadeInNode.gain.exponentialRampToValueAtTime(0.0001, time);
    fadeInNode.gain.exponentialRampToValueAtTime(1, time + FADE_TIME);

    // At the end of the track, fade it out.
    fadeOutNode.gain.exponentialRampToValueAtTime(1, time + duration - FADE_TIME);
    fadeOutNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    source.onended = this.onSourceEnded;

    source.start(time);

    source.__fadeInNode = fadeInNode;
    source.__fadeOutNode = fadeOutNode;

    return source;
  }

  disconnectSource(source) {
    source.stop();
    source.disconnect();
    source.__fadeInNode.disconnect();
    source.__fadeOutNode.disconnect();
  }

  @autobind
  onSourceEnded() {
    const
      { currentTime } = this.context,
      { duration } = this.audioBuffer,
      { sources } = this;

    sources.push(this.newSource(currentTime + duration - FADE_TIME * 4));
    this.disconnectSource(sources.shift());
  }

  start(time) {
    const
      { sources } = this,
      { currentTime } = this.context,
      { duration } = this.audioBuffer;

    time = time || currentTime;
    sources.push(this.newSource(time));
    sources.push(this.newSource(time + duration - FADE_TIME * 2));
  }

  get node() {
    return this.volumeNode;
  }

  get url() {
    return this._url;
  }

  get volume() {
    return this.volumeNode.gain.value;
  }

  set volume(value) {
    this.volumeNode.gain.value = value;
  }

  disconnect() {
    const
      { sources } = this;

    while (sources.length) {
      this.disconnectSource(sources.shift());
    }

    this.volumeNode.disconnect();
  }

  toJSON() {
    return {
      url: this.url,
      volume: this.volume,
    };
  }

  static fromJSON(data, mixer) {
    return mixer.addSourceFromUrl(data.url, { volume: data.volume, meta: data });
  }
}


export default class Mixer {

  constructor() {
    const
      context = this.context = new ContextClass(),
      gainNode = this.gainNode = context.createGain();

    gainNode.connect(context.destination);

    this._tracks = [];
  }

  get tracks() {
    return [].concat(this._tracks);
  }

  addSourceFromUrl(url, { volume, meta }) {
    const
      self = this,
      { context } = this;

    return fetch(url)
      .then(function (response) {
        return response.arrayBuffer();
      })
      .then(function (buffer) {
        return context.decodeAudioData(buffer);
      })
      .then(function (audioBuffer) {
        const track = new Track(audioBuffer, context, url, { meta, volume });
        track.node.connect(self.gainNode);
        track.start();

        self._tracks.push(track);
        return track;
      });
  }

  removeTrack(track) {
    this._tracks = this._tracks.filter(function (currentTrack) {
      if (currentTrack.url == track.url) {
        currentTrack.disconnect();
        return false;
      }
      return true;
    });
  }

  get volume() {
    return this.gainNode.gain.value;
  }

  set volume(value) {
    this.gainNode.gain.value = value;
  }
}
