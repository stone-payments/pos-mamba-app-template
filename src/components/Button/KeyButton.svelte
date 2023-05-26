<script lang="ts">
  import type { Ref } from '@/types';

  let pressed = false;

  export let bgColor: string | boolean = false;
  export let bgActive: string | boolean = false;

  export let ref: Ref = null;

  $: buttonProps = {
    ...$$restProps,
  };
</script>

<button
  bind:this={ref}
  {...buttonProps}
  on:click
  on:mousedown={() => (pressed = true)}
  on:mouseup={() => setTimeout(() => (pressed = false), 100)}
  on:mouseleave={() => (pressed = false)}
  style="background-color: {pressed ? bgActive || '#dde8d6' : bgColor || 'transparent'};"
>
  <span>
    <slot />
  </span>
</button>

<style>
  button {
    transition: background 0.1s ease-out;
    border: 0;
    color: #445179;
    font-size: 2.1rem;
    line-height: 2.2rem;
    font-weight: 300;
    border-radius: 27px;
  }
</style>
