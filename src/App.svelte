<script lang="ts">
  import { calculation } from '@/stores';
  import Header from '@c/Header.svelte';
  import Keypad from '@/Keypad.svelte';
  import { EventType } from './types';

  const handleSelect = ({ type, detail }) =>
    calculation.handleSelect({ type: type as EventType, detail });
</script>

<div class="main" data-test="main">
  <Header />
  <Keypad on:number={handleSelect} on:operator={handleSelect} />
</div>

<style>
  :global(body) {
    /* background-image: url(./assets/reference.png); */
    background-repeat: no-repeat;
    background-position: 0 -30px;
    background-size: 100% 110%;
  }

  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
