'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import PartySocket from 'partysocket';

import { formatCard, getRoundWinners } from '@/utils';
import { Player, RoomStatus, ServerMessage } from '@/types';

import {
  Container,
  Title,
  PlayersTitle,
  PlayersList,
  PlayerItem,
  Text,
} from './page.styled';

export default function PlayerPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const t = useTranslations('PlayerPage');
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [status, setStatus] = useState<RoomStatus>('lobby');
  const [round, setRound] = useState(0);
  const [playerName, setPlayerName] = useState<string | null>(null);

  useEffect(() => {
    const name = sessionStorage.getItem(`room:${roomId}:playerName`)?.trim();

    if (!name) {
      router.replace(`/room/${roomId}/join`);
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlayerName(name);

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

  const currentPlayer = players.find((player) => player.name === playerName);
  const winners = getRoundWinners(players);

  return (
    <Container>
      <Title>{t('roomId', { roomId })}</Title>
      {status === 'playing' ? (
        <>
          <Title>{t('round', { round })}</Title>
          {currentPlayer?.card && (
            <Text>{t('yourCard')} {formatCard(currentPlayer.card)}</Text>
          )}
          {winners.length > 0 && (
            <Text>
              {t('winners')} {winners.map((winner) => winner.name).join(', ')}
            </Text>
          )}
          <PlayersTitle>{t('scoreboard')}</PlayersTitle>
          <PlayersList>
            {players.map((player) => (
              <PlayerItem key={player.id}>
                {player.name}: {player.card ? formatCard(player.card) : '—'} — {player.score} {t('points')}
              </PlayerItem>
            ))}
          </PlayersList>
        </>
      ) : (
        <>
          <PlayersTitle>{t('players')} ({players.length})</PlayersTitle>
          <PlayersList>
            {players.map((player) => (
              <PlayerItem key={player.id}>
                {player.name}
              </PlayerItem>
            ))}
          </PlayersList>
        </>
      )}
    </Container>
  );
}
