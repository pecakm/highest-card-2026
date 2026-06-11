import type { RoundChoice } from './roundChoice.type';

export type ClientMessage =
  | { type: 'join'; name: string }
  | { type: 'startGame' }
  | { type: 'roundChoice'; choice: RoundChoice };
