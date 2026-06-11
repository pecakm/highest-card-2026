import type { Player } from './player.interface';
import type { RoomStatus } from './roomStatus.type';
import type { RoundPhase } from './roundPhase.type';

export type RoomStateMessage = {
  type: 'roomState';
  status: RoomStatus;
  round: number;
  roundPhase: RoundPhase;
  choosingPlayerIndex: number;
  dealerPlayerIndex: number;
  viewerPlayerId: string;
  players: Player[];
};
