import { render, screen } from '@testing-library/svelte';
import App from './App.svelte';

test("says 'Home sweet home...'", () => {
  render(App);
  const node = screen.queryByText('Home sweet home...');
  expect(node).not.toBeNull();
});
