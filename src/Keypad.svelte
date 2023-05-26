<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import KeyButton from '@/components/Button/KeyButton.svelte';
  import Modes from '@/components/ModesContainer.svelte';
  import { Direction, EventType, Operations } from '@/types';

  const dispatch = createEventDispatcher();

  const select = (num: number) => () => dispatch(EventType.Number, String(num));
  const operator = (opetator: Operations) => dispatch(EventType.Operator, opetator);
</script>

<div class="keypad">
  <div class="left-keys">
    <Modes direction={Direction.Horizontal}>
      <table>
        <tr>
          <td>
            <KeyButton data-test="AC" on:click={() => operator(Operations.ALL_CLEAR)}>AC</KeyButton>
          </td>
          <td>
            <KeyButton
              data-test={Operations.POLARITY}
              on:click={() => operator(Operations.POLARITY)}
            >
              &plus;/&minus;
            </KeyButton>
          </td>
          <td>
            <KeyButton
              data-test={Operations.PERCENTAGE}
              on:click={() => operator(Operations.PERCENTAGE)}
            >
              <strong>&percnt;</strong>
            </KeyButton>
          </td>
        </tr>
      </table>
    </Modes>
    <div class="keys">
      <div class="row">
        <KeyButton data-test="1" on:click={select(1)}>1</KeyButton>
        <KeyButton data-test="2" on:click={select(2)}>2</KeyButton>
        <KeyButton data-test="3" on:click={select(3)}>3</KeyButton>
      </div>
      <div class="row">
        <KeyButton data-test="4" on:click={select(4)}>4</KeyButton>
        <KeyButton data-test="5" on:click={select(5)}>5</KeyButton>
        <KeyButton data-test="6" on:click={select(6)}>6</KeyButton>
      </div>
      <div class="row">
        <KeyButton data-test="7" on:click={select(7)}>7</KeyButton>
        <KeyButton data-test="8" on:click={select(8)}>8</KeyButton>
        <KeyButton data-test="9" on:click={select(9)}>9</KeyButton>
      </div>
      <div class="row">
        <div class="colspan" />
        <KeyButton data-test="0" on:click={select(0)}>0</KeyButton>
        <KeyButton data-test="," on:click={() => operator(Operations.SEPARATOR)}>,</KeyButton>
      </div>
    </div>
  </div>
  <div class="right-keys">
    <Modes direction={Direction.Vertical}>
      <table>
        <tr>
          <td>
            <!-- Division -->
            <KeyButton data-test={Operations.DIVIDE} on:click={() => operator(Operations.DIVIDE)}>
              &#247;
            </KeyButton>
          </td>
        </tr>
        <tr>
          <td>
            <!-- Multiply-->
            <KeyButton
              data-test={Operations.MULTIPLY}
              on:click={() => operator(Operations.MULTIPLY)}
            >
              &#215;
            </KeyButton>
          </td>
        </tr>
        <tr>
          <td>
            <!-- Minus -->
            <KeyButton
              data-test={Operations.SUBTRACT}
              on:click={() => operator(Operations.SUBTRACT)}
            >
              &minus;
            </KeyButton>
          </td>
        </tr>
        <tr>
          <td>
            <!-- Plus -->
            <KeyButton data-test={Operations.ADD} on:click={() => operator(Operations.ADD)}>
              &plus;
            </KeyButton>
          </td>
        </tr>
      </table>
      <KeyButton
        class="btn-result"
        bgColor="#4cbf84"
        bgActive="#4EB17D"
        data-test={Operations.EVALUATE}
        on:click={() => operator(Operations.EVALUATE)}
      >
        &equals;
      </KeyButton>
    </Modes>
  </div>
</div>

<style>
  .keypad {
    display: flex;
    flex: 1;
    background-color: white;
    margin-top: -13px;
    padding: 12px;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 -20px 30px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .keys {
    bottom: 0;
    display: block;
    left: 0px;
    padding-top: 5px;
    padding-right: 12px;
    position: absolute;
    right: 50px;
    top: 50px;

    .row {
      position: relative;
      width: 100%;
      height: 25%;
      white-space: nowrap;
    }

    :global(button),
    .colspan {
      display: inline-block;
      width: 33.333%;
      float: left;
      height: 100%;
    }
  }

  table {
    width: 100%;
    height: 100%;
    table-layout: fixed;

    * {
      vertical-align: middle;
    }

    :global(button) {
      width: 100%;
    }
  }

  .left-keys {
    width: 100%;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    padding-right: 60px;
    position: relative;
  }

  .right-keys {
    height: 100%;
    width: 50px;
    position: absolute;
    top: 0;
    right: 12px;
    bottom: 0;
    padding: 12px 0;
    padding-bottom: 15px;
  }

  :global(button.btn-result) {
    height: 50px;
    width: 50px;
    bottom: 0;
    margin-left: 1px;
    border-radius: 25px;
    position: absolute;
    font-size: 2.4rem;
    color: white;
    font-weight: 300;
    box-shadow: inset -9px 12px 20px #85d377, 0 0px 4px rgba(140, 183, 141, 0.1),
      0 0px 14px rgba(0, 0, 0, 0.1);
  }
</style>
