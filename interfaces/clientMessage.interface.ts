export type ClientMessage =
  | { type: 'join'; name: string }
  | { type: 'startGame' };
