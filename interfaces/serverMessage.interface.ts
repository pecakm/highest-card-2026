import { Player } from './player.interface';

export type ServerMessage =
  | { type: 'players'; players: Player[] }
  | { type: 'gameStarted' };
