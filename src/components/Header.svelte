<script lang="ts">
  import { calculation } from '@/stores';
  import { Operations, type Ref } from '@/types';

  // Display node ref
  let displayElement: Ref;

  // Operation symbol helper
  const operationProperSymbol = (o: string) => {
    const op: Operations = Operations[o as Operations];
    const symbols: Record<Operations, string> = {
      [Operations.DIVIDE]: '&#247;',
      [Operations.ADD]: '&plus;',
      [Operations.MULTIPLY]: '&#215;',
      [Operations.SUBTRACT]: '&minus;',
      [Operations.PERCENTAGE]: '&minus;',
      [Operations.EVALUATE]: '&equals;',
      [Operations.SEPARATOR]: ',',
      [Operations.POLARITY]: '&plusmn;',
      [Operations.ALL_CLEAR]: '',
    };
    return symbols[op] || o;
  };

  let display: string | null = null;
  let fonstSize = 46;
  let visible = true;
  const maxWidthResult: number = window.innerWidth - 90;
  let lastOperator = '';

  $: {
    // Update display
    display = $calculation.display;
    if (displayElement) {
      // Reduce font to fit in it's place
      const reduceSize = () => {
        const displayWidth = (displayElement && displayElement.getBoundingClientRect().width) || 0;

        // Determine if fit to show it, otherwise, reduce again
        if (displayWidth >= maxWidthResult && fonstSize > 18) {
          fonstSize -= 2;

          // Call recuce font function again to determine if it fiting in place
          setTimeout(reduceSize, 0);
        } else {
          visible = true;
        }
      };

      if (!display) {
        // Reset fonst size and visibility if display is null(AC)
        fonstSize = 46;
        visible = true;
      } else {
        visible = false;
        setTimeout(reduceSize, 0);
      }
    }

    // Update last operator used
    const op: string = $calculation.lastOperator;
    if (!display) {
      lastOperator = '';
    } else if (op !== Operations.SEPARATOR) {
      lastOperator = $calculation.lastOperator;
    }
  }

  $: resultStyle = `
    visibility: ${visible ? 'visible' : 'hidden'};
    font-size: ${fonstSize}px;
    max-width: ${maxWidthResult}px;
  `;
</script>

<header>
  <div class="history abs">
    <span>
      {#each $calculation.history as { leftNum, operation, rightNum }, i}
        {#if i > 0}
          <span>&nbsp;&equals;</span>
        {/if}
        {leftNum}
        {@html operationProperSymbol(operation.name.toUpperCase())}
        {rightNum}
      {/each}
    </span>
  </div>
  <div class="operations">
    <table>
      <tr>
        <td data-test="last-operator" class="symbol">{lastOperator || ''}</td>
        <td class="result-cell">
          <div class="result" style={resultStyle}>
            <span data-test="result" bind:this={displayElement}>{display || '0'}</span>
          </div>
        </td>
      </tr>
    </table>
  </div>
</header>

<style>
  header {
    position: relative;
    height: 120px;
    padding: 45px 25px 20px 12px;
    color: rgb(248, 248, 248);
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.2);

    .operations {
      height: 100%;
      padding-top: 0;
      font-size: 46px;
      font-weight: 400;
      line-height: 1;
      padding-bottom: 10px;

      .symbol {
        width: 40px;
        height: 100%;
        text-align: center;
        font-size: 24px;
        vertical-align: middle;
      }

      > table {
        height: 100%;
      }

      .result-cell {
        text-align: right;
        vertical-align: bottom;

        .result {
          overflow: hidden;
          white-space: nowrap;
          text-align: right;
          margin-left: auto;

          > span {
            float: right;
          }
        }
      }
    }

    table {
      width: 100%;
    }
  }

  .abs {
    position: absolute;
    left: 0;
    right: 0;
  }

  .history {
    font-size: 1.4rem;
    top: 0;
    width: 100%;
    height: 45px;
    opacity: 0.7;
    text-align: right;
    padding: 12px;
    letter-spacing: 0.5px;
    word-spacing: 0px;
    white-space: nowrap;
    overflow: hidden;

    > span {
      overflow: hidden;
      float: right;
    }
  }
</style>
