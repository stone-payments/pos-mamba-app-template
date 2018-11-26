import Keyboard from '@mamba/pos/api/keyboard.js';
import Root from './mocks/Root.html';

let lastRoot;

/* Create a new app root for testing */
global.newTestRoot = ({ unique = true } = {}) => {
  if (unique && lastRoot) lastRoot.destroy();

  lastRoot = new Root({ target: document.body });

  lastRoot.target = lastRoot.options.target;

  return lastRoot;
};

/** Dispatch a clcik event on a dom node */
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
