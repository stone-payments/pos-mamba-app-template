import Router from 'svelte-page';

const { newApp } = global;

newApp();

it('should be at home', () => {
  expect(document.title).toBe('Home');
});

it('should go to about page', () => {
  Router.go('/about');
  expect(document.title).toBe('About');
});
