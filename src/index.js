import App from './App.html';
import store from './store.js';

/**
 * Bootstrap the application.
 * If developing, it wraps the whole app within a '@mambasdk/pos' for better visuals.
 * If the code is running on the production environment, just initialize the app.
 *
 * We use dynamic import here for preventing webpack from bundling the @mambasdk/pos
 * even in a production environment build.
 * */
const root = document.getElementById('root');

if (__POS__) {
  new App({ target: root, store });
} else if (__BROWSER__) {
  if (__DEV__) {
    window.MambaStore = store;
  }
  /** If developing, wrap the app with a <POS></POS> */
  import('@mambasdk/pos/simulator/view/index.js').then(({ default: POS }) => {
    const appFragment = document.createDocumentFragment();
    new App({ target: appFragment, store });
    new POS({
      target: root,
      store,
      slots: {
        default: appFragment,
      },
    });
  });
}
