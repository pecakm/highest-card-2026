'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PartySocket from 'partysocket';

import { Container, Title } from './page.styled';

export default function GamePage() {
  const { roomId } = useParams<{ roomId: string }>();
  const router = useRouter();

  useEffect(() => {
    const name = sessionStorage.getItem(`room:${roomId}:playerName`)?.trim();

    if (!name) {
      router.replace(`/room/${roomId}/join`);
      return;
    }

    const socket = new PartySocket({
      host: process.env.NEXT_PUBLIC_PARTYKIT_HOST!,
      room: roomId,
    });

    const join = () => {
      socket.send(JSON.stringify({ type: 'join', name }));
    };

    if (socket.readyState === WebSocket.OPEN) {
      join();
    } else {
      socket.addEventListener('open', join, { once: true });
    }

    return () => {
      socket.close();
    };
  }, [roomId, router]);

  return (
    <Container>
      <Title>Room ID: {roomId}</Title>
    </Container>
  );
}
