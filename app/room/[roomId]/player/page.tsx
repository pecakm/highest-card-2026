'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import PartySocket from 'partysocket';

import { Player, RoomStatus, ServerMessage } from '@/types';

import { GameRoom, WaitingRoom } from './components';
import { Container, Title } from './page.styled';

export default function PlayerPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const t = useTranslations('PlayerPage');
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [status, setStatus] = useState<RoomStatus>('lobby');
  const [round, setRound] = useState(0);

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
        setRound(data.round);
      }
    });

    return () => {
      socket.close();
    };
  }, [roomId, router]);

  return (
    <Container>
      <Title>{t('roomId', { roomId })}</Title>
      {status === 'playing' ? (
        <GameRoom round={round} players={players} />
      ) : (
        <WaitingRoom players={players} />
      )}
    </Container>
  );
}
