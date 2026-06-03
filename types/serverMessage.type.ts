import type { JoinRejectedMessage } from './joinRejectedMessage.type';
import type { RoomStateMessage } from './roomStateMessage.type';

export type ServerMessage = RoomStateMessage | JoinRejectedMessage;
