import type { RoundChoice } from './roundChoice.type';

export type ClientMessage =
  | { type: 'join'; name: string }
  | { type: 'startGame' }
  | { type: 'nextRound' }
  | { type: 'roundChoice'; choice: RoundChoice };
