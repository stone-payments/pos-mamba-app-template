import { Store } from 'svelte/store.js';

export const INITIAL_DATA = {};

const store = new Store(INITIAL_DATA);

if (__DEV__) {
  window.__store__ = store;
}

export default store;
