/* global window, fetch */


import Mixer from './mixer';


fetch('sounds/manifest.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (manifest) {
    console.log(manifest);
    return manifest;
  })
  .then(function (manifest) {
    const mixer = window.mixer = new Mixer();
    Object.keys(manifest).forEach(function (trackId) {
      mixer.addSourceFromUrl(`sounds/${manifest[trackId].filename}`);
    });
  });
