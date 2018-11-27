import Keyboard from '@mamba/pos/api/keyboard.js';
import App from '../../src/index.html';

let lastApp;

/* Create a new app root for testing */
global.newApp = () => {
  if (lastApp) lastApp.destroy();
  lastApp = new App({ target: document.body });
  return lastApp;
};

/** Dispatch a click event on a dom node */
global.clickOn = (el, opts = {}) => {
  el.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
      ...opts,
    }),
  );
};

/** Dispatch key events on the window */
global.fireKey = keyName => {
  window.dispatchEvent(
    new KeyboardEvent('keydown', {
      keyCode: Keyboard.getKeyCode(keyName),
      bubbles: true,
      cancelable: false,
    }),
  );

  window.dispatchEvent(
    new KeyboardEvent('keyup', {
      keyCode: Keyboard.getKeyCode(keyName),
      bubbles: true,
      cancelable: false,
    }),
  );
};
