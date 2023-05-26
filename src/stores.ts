import { writable } from 'svelte/store';
import Calculator from '@/calculator';
import { Operations, type Display } from './types';

export const symbol = writable(Operations.ALL_CLEAR);

const initial: Display = { display: '', history: [], lastOperator: '' };
const calc = new Calculator();

function createCalculator() {
  const { subscribe, set } = writable<Display>(initial);

  calc.onDisplayUpdate((display: Display) => set(display));

  return {
    subscribe,
    handleSelect: calc.handleSelect,
  };
}

export const calculation = createCalculator();
