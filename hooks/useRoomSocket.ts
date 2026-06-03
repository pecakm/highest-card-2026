'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import PartySocket from 'partysocket';

import {
  ClientMessage,
  ClientRoomState,
  clientRoomStateFromMessage,
  ServerMessage,
} from '@/types';
import { initialClientRoomState } from '@/constants';

import type { UseRoomSocketOptions } from './useRoomSocket.types';

export function useRoomSocket({ roomId, enabled = true, onOpen }: UseRoomSocketOptions) {
  const [room, setRoom] = useState<ClientRoomState>(initialClientRoomState);
  const socketRef = useRef<PartySocket | null>(null);
  const onOpenRef = useRef(onOpen);

  useEffect(() => {
    onOpenRef.current = onOpen;
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
