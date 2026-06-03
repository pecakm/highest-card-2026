import type { ClientRoomState, RoomStateMessage } from '@/types';

export function clientRoomStateFromMessage(message: RoomStateMessage): ClientRoomState {
  return {
    status: message.status,
    players: message.players,
    round: message.round,
    roundPhase: message.roundPhase,
    choosingPlayerIndex: message.choosingPlayerIndex,
    dealerPlayerIndex: message.dealerPlayerIndex,
    viewerPlayerId: message.viewerPlayerId,
  };
}
