import type { ServerMessage } from './serverMessage.type';

export type ClientRoomState = Omit<ServerMessage, 'type'>;

export function clientRoomStateFromMessage(message: ServerMessage): ClientRoomState {
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
