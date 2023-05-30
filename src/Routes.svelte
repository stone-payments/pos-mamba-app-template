<script>
  import { Router, Route } from 'svelte-routing';
  import Home from '@/routes/Home.svelte';
  import About from '@/routes/About.svelte';
  import Blog from '@/routes/Blog.svelte';

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = '';
</script>

<Router {url}>
  <Route path="about" component={About} />
  <Route path="blog/*" component={Blog} />
  <Route path="/" component={Home} />
</Router>
