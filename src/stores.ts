import { writable } from 'svelte/store';

const initial = {};

const { subscribe /* , set */ } = writable(initial);

export const calculation = {
  subscribe,
};
