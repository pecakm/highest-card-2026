import type { ClientMessage } from '@/types';

export type UseRoomSocketOptions = {
  roomId: string;
  enabled?: boolean;
  onOpen?: (send: (message: ClientMessage) => void) => void;
};
