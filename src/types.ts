export type Ref = null | HTMLButtonElement | HTMLDivElement | HTMLElement | HTMLSpanElement;

enum Direction {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

enum Operations {
  DIVIDE = '/',
  MULTIPLY = '*',
  SUBTRACT = '-',
  ADD = '+',
  EVALUATE = '=',
  ALL_CLEAR = '',
  POLARITY = '+/-',
  PERCENTAGE = '%',
  SEPARATOR = ',',
}

enum EventType {
  Operator = 'operator',
  Action = 'action',
  Number = 'number',
}

export type OperationsKeys = keyof typeof Operations;

export interface CalculationEvent {
  type: EventType; // 'number' | 'operator' | 'action'
  detail: Operations | string;
}

export type Action = (a: number, b: number) => number;

export interface history {
  operation: Action;
  leftNum: number;
  rightNum: number;
}

export interface Display {
  display: string;
  history: history[];
  lastOperator: string;
}

export type Callback = (a: Display | string) => void;

export { Direction, Operations, EventType };
