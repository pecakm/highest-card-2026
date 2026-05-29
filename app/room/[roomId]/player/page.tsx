'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PartySocket from 'partysocket';

import { Player, RoomStatus, ServerMessage } from '@/types';

import {
  Container,
  Title,
  PlayersTitle,
  PlayersList,
  PlayerItem,
} from './page.styled';

export default function PlayerPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [status, setStatus] = useState<RoomStatus>('lobby');

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

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data) as ServerMessage;

      if (data.type === 'roomState') {
        setStatus(data.status);
        setPlayers(data.players);
      }
    });

    return () => {
      socket.close();
    };
  }, [roomId, router]);

  return (
    <Container>
      <Title>Room ID: {roomId}</Title>
      {status === 'playing' ? (
        <Title>Game started</Title>
      ) : (
        <>
          <PlayersTitle>Players ({players.length})</PlayersTitle>
          <PlayersList>
            {players.map((player) => (
              <PlayerItem key={player.id}>
                {player.id} - {player.name}
              </PlayerItem>
            ))}
          </PlayersList>
        </>
      )}
    </Container>
  );
}
