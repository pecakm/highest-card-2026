'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
      <Title>Room ID: {roomId}</Title>
      {status === 'playing' ? (
        <>
          <Title>Round {round}</Title>
          {currentPlayer?.card && (
            <Text>Your card: {formatCard(currentPlayer.card)}</Text>
          )}
          {winners.length > 0 && (
            <Text>
              Winner{winners.length > 1 ? 's' : ''}: {winners.map((winner) => winner.name).join(', ')}
            </Text>
          )}
          <PlayersTitle>Scoreboard</PlayersTitle>
          <PlayersList>
            {players.map((player) => (
              <PlayerItem key={player.id}>
                {player.name}: {player.card ? formatCard(player.card) : '—'} — {player.score} pts
              </PlayerItem>
            ))}
          </PlayersList>
        </>
      ) : (
        <>
          <PlayersTitle>Players ({players.length})</PlayersTitle>
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
