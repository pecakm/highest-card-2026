import type { ClientRoomState } from '@/types';

export const initialClientRoomState: ClientRoomState = {
  status: 'lobby',
  players: [],
  round: 0,
  roundPhase: 'resolved',
  choosingPlayerIndex: 0,
  dealerPlayerIndex: -1,
};
