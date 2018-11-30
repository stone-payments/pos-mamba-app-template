import App from '../../src/index.html';

let lastApp;

/* Create a new app root for testing */
global.newApp = () => {
  if (lastApp) lastApp.destroy();
  lastApp = new App({ target: document.body });
  return lastApp;
};
