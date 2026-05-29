import { Player } from './player.interface';

export interface ServerMessage {
  type: 'players';
  players: Player[];
}
