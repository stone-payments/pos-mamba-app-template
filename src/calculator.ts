import {
  Operations,
  EventType,
  type Action,
  type CalculationEvent,
  type Callback,
  type history,
} from '@/types';

// Math operations
const add: Action = (a: number, b: number): number => a + b;
const subtract: Action = (a: number, b: number): number => a - b;
const divide: Action = (a: number, b: number): number => a / b;
const multiply: Action = (a: number, b: number): number => a * b;

// map symbols to math operations
const operations: { [index: string]: Action } = {
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide,
};

class Calculator {
  currentTotal: number; // What the current running total is

  currentOperator: string; // What the active operator is

  lastOperator: string; // The last operator that was pressed

  displayShouldClear: boolean;

  onDisplayUpdateHandler: Callback;

  onDisplay: string;

  history: history[];

  constructor() {
    this.clear();
  }

  fireDisplayUpdateHandlers = (): void => {
    if (this.onDisplayUpdateHandler) {
      this.onDisplayUpdateHandler({
        display: this.onDisplay,
        history: this.history,
        lastOperator: this.lastOperator,
      });
    }
  };

  onDisplayUpdate = (func: Callback): void => {
    this.onDisplayUpdateHandler = func;
  };

  numberPressed = (e: CalculationEvent): void => {
    const isNegativeZero = this.onDisplay === '-0';
    if (this.displayShouldClear) {
      this.clear();
      this.displayShouldClear = false;
    }

    if (this.currentOperator && this.onDisplay && !isNegativeZero) {
      this.removeHangingDecimal();

      if (this.currentTotal) {
        const operation = operations[this.lastOperator];
        const result = operation(this.currentTotal, parseFloat(this.onDisplay));

        this.currentTotal = result;
      } else {
        this.currentTotal = parseFloat(this.onDisplay);
      }

      this.onDisplay = null;

      this.lastOperator = this.currentOperator;
      this.currentOperator = null;
    }

    // We handle null/-0 the same, replace them with the number pressed
    if (this.onDisplay === null || isNegativeZero) {
      this.onDisplay = isNegativeZero ? `-${e.detail}` : e.detail;
      this.fireDisplayUpdateHandlers();
      return;
    }

    // Don't let more than one 0 be displayed
    if (this.onDisplay === '0' && e.detail === '0') {
      return;
    }

    this.onDisplay = this.onDisplay.concat(e.detail);
    this.fireDisplayUpdateHandlers();
  };

  removeHangingDecimal = (): void => {
    if (this.onDisplay.indexOf(Operations.SEPARATOR) === this.onDisplay.length) {
      this.onDisplay = this.onDisplay.slice(0, this.onDisplay.length - 1);
    }
  };

  evaluate = (): string | number => {
    // No operator? Can't evaluate
    if (!this.currentOperator && !this.lastOperator) return;

    this.removeHangingDecimal();

    let leftNum: string | number;
    let rightNum: string | number;
    let operation: string | Action;
    if (this.displayShouldClear) {
      // Hitting evaluate again just after an evaluation, repeat op
      const latestOperation = this.history[this.history.length - 1];
      leftNum = parseFloat(this.onDisplay);
      rightNum = latestOperation.rightNum;
      operation = latestOperation.operation;
    } else {
      leftNum = this.currentTotal;
      rightNum = parseFloat(this.onDisplay);
      operation = operations[this.currentOperator || this.lastOperator];
    }

    const result = operation(leftNum, rightNum);
    this.currentTotal = null;
    this.onDisplay = result.toString();
    this.fireDisplayUpdateHandlers();
    this.displayShouldClear = true;
    this.history.push({
      operation,
      leftNum,
      rightNum,
    });
    return result;
    return '';
  };

  clear = (): void => {
    this.onDisplay = null;
    this.history = [];
    this.fireDisplayUpdateHandlers();
    this.currentTotal = null;
    this.currentOperator = null;
    this.lastOperator = null;
    this.displayShouldClear = true;
  };

  actionPressed = (e: CalculationEvent): void => {
    switch (e.detail) {
      case Operations.EVALUATE:
        this.evaluate();
        break;
      case Operations.ADD:
      case Operations.SUBTRACT:
      case Operations.MULTIPLY:
      case Operations.DIVIDE:
        this.currentOperator = e.detail;
        this.displayShouldClear = false;
        break;
      case Operations.ALL_CLEAR:
        this.clear();
        break;
      case Operations.SEPARATOR:
        if (
          typeof this.onDisplay === 'string' &&
          !this.onDisplay.includes(Operations.SEPARATOR) &&
          this.onDisplay.length > 0 &&
          !this.displayShouldClear
        ) {
          const newVal = this.onDisplay + Operations.SEPARATOR;
          this.onDisplay = newVal;
          this.fireDisplayUpdateHandlers();
        } else if (this.displayShouldClear || this.onDisplay === null) {
          const newVal = `0${Operations.SEPARATOR}`;
          this.onDisplay = newVal;
          this.fireDisplayUpdateHandlers();
          this.displayShouldClear = false;
        }
        break;
      case Operations.POLARITY:
        if (this.currentOperator && this.onDisplay) {
          this.currentTotal = parseFloat(this.onDisplay);
        }

        if (!this.onDisplay || (this.onDisplay && this.currentOperator)) {
          this.onDisplay = '0';
        }

        if (this.onDisplay.substr(0, 1) === '-') {
          this.onDisplay = this.onDisplay.substr(1, this.onDisplay.length);
        } else {
          this.onDisplay = `-${this.onDisplay}`;
        }
        this.displayShouldClear = false;
        this.fireDisplayUpdateHandlers();
        break;
      default:
        break;
    }
  };

  handleSelect = (e: CalculationEvent): void => {
    switch (e.type) {
      case EventType.Number:
        this.numberPressed(e);
        break;
      case EventType.Operator:
        this.actionPressed(e);
        break;
      default:
        throw new Error('Event type not recognized!');
    }
  };

  // Unit test util
  multipleSelects = (arr: Array<CalculationEvent>): void => {
    arr.forEach(this.handleSelect);
  };
}

export default Calculator;
