'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import PartySocket from 'partysocket';

import { ClientMessage, ClientRoomState, ServerMessage } from '@/types';

import { initialClientRoomState } from './useRoomSocket.constants';
import type { UseRoomSocketOptions } from './useRoomSocket.types';
import { clientRoomStateFromMessage } from './useRoomSocket.utils';

export function useRoomSocket({
  roomId,
  enabled = true,
  onOpen,
  onJoinRejected,
}: UseRoomSocketOptions) {
  const [room, setRoom] = useState<ClientRoomState>(initialClientRoomState);
  const socketRef = useRef<PartySocket | null>(null);
  const onOpenRef = useRef(onOpen);
  const onJoinRejectedRef = useRef(onJoinRejected);

  useEffect(() => {
    onOpenRef.current = onOpen;
    onJoinRejectedRef.current = onJoinRejected;
  });

  const send = useCallback((message: ClientMessage) => {
    socketRef.current?.send(JSON.stringify(message));
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const socket = new PartySocket({
      host: process.env.NEXT_PUBLIC_PARTYKIT_HOST!,
      room: roomId,
    });

    socketRef.current = socket;

    const handleOpen = () => {
      onOpenRef.current?.(send);
    };

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data) as ServerMessage;

      if (data.type === 'roomState') {
        setRoom(clientRoomStateFromMessage(data));
        return;
      }

      if (data.type === 'joinRejected') {
        onJoinRejectedRef.current?.(data.reason);
      }
    });

    if (socket.readyState === WebSocket.OPEN) {
      handleOpen();
    } else {
      socket.addEventListener('open', handleOpen, { once: true });
    }

    return () => {
      socketRef.current = null;
      socket.close();
    };
  }, [roomId, enabled, send]);

  return { room, send };
}
