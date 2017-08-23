/* global document */

// import Mixer from './mixer';
// fetch('sounds/manifest.json')
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (manifest) {
//     console.log(manifest);
//     return manifest;
//   })
//   .then(function (manifest) {
//     const mixer = window.mixer = new Mixer();
//     Object.keys(manifest).forEach(function (trackId) {
//       mixer.addSourceFromUrl(`sounds/${manifest[trackId].filename}`);
//     });
//   });


import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import 'preact/devtools';

import { default as storeFactory, persistStore } from './store';
import { loadTracks, BLACKLIST_KEYS } from './ducks';
import App from './App';
import './styles/main.css';

const store = storeFactory();
persistStore(
  store,
  { blacklist: BLACKLIST_KEYS },
  store.dispatch.bind(store, loadTracks())
);

render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.body);
