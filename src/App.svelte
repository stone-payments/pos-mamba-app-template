<script>
  import { Router, Route, Link } from 'svelte-navigator';
  import BackButton from '@c/BackButton.svelte';
  import ForwardButton from '@c/ForwardButton.svelte';
  import LazyRoute from '@c/LazyRoute.svelte';

  const Home = () => import('@routes/Home.svelte');
  const About = () => import('@routes/About.svelte');
  const Blog = () => import('@routes/Blog.svelte');
</script>

<Router>
  <header>
    <h1>My Mamba Application</h1>

    <nav aria-label="Main">
      <BackButton />
      <ForwardButton />
      <Link to="/">Home</Link>
      <Link to="about">About</Link>
      <Link to="blog">Blog</Link>
    </nav>
  </header>

  <main>
    <!--
      When `delayMs` is set, the fallback will be displayed
      after `delayMs` milliseconds.
      It might lead to a better UX, because it will suppress
      a flash of spinners on a fast connection.
    -->
    <Route path="/" component={Home} />
    <LazyRoute path="blog/*blogRoute" component={Blog} delayMs={500}>
      <h4>Loading...</h4>
    </LazyRoute>
    <LazyRoute path="about" component={About} delayMs={500}>Loading About...</LazyRoute>

    <!-- Fallback for undefined routes: -->
    <!--
      <Route>
        <h3>Default</h3>
        <p>No Route could be matched.</p>
      </Route>
    -->
  </main>
</Router>

<style>
  :global(body) {
    font-family: sans-serif;
  }
</style>
