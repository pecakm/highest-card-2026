import { Player } from './player.interface';
import { RoomStatus } from './roomStatus.type';
import { RoundPhase } from './roundPhase.type';

export type ServerMessage = {
  type: 'roomState';
  status: RoomStatus;
  round: number;
  roundPhase: RoundPhase;
  choosingPlayerIndex: number;
  dealerPlayerIndex: number;
  players: Player[];
};
