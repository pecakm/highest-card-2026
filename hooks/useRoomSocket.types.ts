import type { ClientMessage, JoinRejectedReason } from '@/types';

export type UseRoomSocketOptions = {
  roomId: string;
  enabled?: boolean;
  onOpen?: (send: (message: ClientMessage) => void) => void;
  onJoinRejected?: (reason: JoinRejectedReason) => void;
};
