import type { RoomStateMessage } from './roomStateMessage.type';

export type ClientRoomState = Omit<RoomStateMessage, 'type'>;
