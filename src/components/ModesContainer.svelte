<script lang="ts">
  import { Direction as Mode } from '@/types';

  export let direction: Mode;
</script>

<div
  class="modes"
  class:vertical={direction === Mode.Vertical}
  class:horizontal={direction === Mode.Horizontal}
>
  <slot />
</div>

<style>
  .modes {
    align-items: center;
    border-radius: 27px;
    line-height: 20px;
    position: relative;

    & :global(button) {
      display: inline;
      padding: 0;
    }

    & :global(button:not(.btn-result)) {
      font-size: 1.6rem;
      font-weight: 400;
    }

    &,
    & :global(table) {
      height: 100%;
      width: 100%;
    }

    &.horizontal {
      &,
      & :global(button) {
        height: 50px;
      }
    }

    &.vertical {
      padding-bottom: 50px;

      & :global(button:not(.btn-result)) {
        align-self: center;
        width: 100%;
        height: 100%;
        font-size: 2.1rem;
      }
    }
  }
</style>
