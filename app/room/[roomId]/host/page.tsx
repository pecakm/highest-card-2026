'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import PartySocket from 'partysocket';

import { Container, Title } from './page.styled';

export default function HostPage() {
  const { roomId } = useParams<{ roomId: string }>();

  useEffect(() => {
    const socket = new PartySocket({
      host: process.env.NEXT_PUBLIC_PARTYKIT_HOST!,
      room: roomId,
    });

    const startGame = () => {
      socket.send(JSON.stringify({ type: 'startGame' }));
    };

    if (socket.readyState === WebSocket.OPEN) {
      startGame();
    } else {
      socket.addEventListener('open', startGame, { once: true });
    }

    return () => {
      socket.close();
    };
  }, [roomId]);

  return (
    <Container>
      <Title>Room ID: {roomId}</Title>
      Game is on
    </Container>
  );
}
