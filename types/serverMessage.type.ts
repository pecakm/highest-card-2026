import { Player } from './player.interface';
import { RoomStatus } from './roomStatus.type';

export type ServerMessage = {
  type: 'roomState';
  status: RoomStatus;
  round: number;
  players: Player[];
};
