'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PartySocket from 'partysocket';
import { QRCodeCanvas } from 'qrcode.react';

import { Button } from '@/components';
import { formatCard, getRoundWinners } from '@/lib/game';
import { Player, ServerMessage } from '@/types';

import { Container, Title, Text, PlayersTitle, PlayersList, PlayerItem } from './page.styled';

export default function HostPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const joinUrl = typeof window !== 'undefined' ? `${window.location.origin}/room/${roomId}/join` : '';
  const [players, setPlayers] = useState<Player[]>([]);
  const [round, setRound] = useState(0);
  const socketRef = useRef<PartySocket | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const socket = new PartySocket({
      host: process.env.NEXT_PUBLIC_PARTYKIT_HOST!,
      room: roomId,
    });

    socketRef.current = socket;

    const startGame = () => {
      if (hasStartedRef.current) {
        return;
      }

      hasStartedRef.current = true;
      socket.send(JSON.stringify({ type: 'startGame' }));
    };

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data) as ServerMessage;

      if (data.type === 'roomState') {
        setPlayers(data.players);
        setRound(data.round);
      }
    });

    if (socket.readyState === WebSocket.OPEN) {
      startGame();
    } else {
      socket.addEventListener('open', startGame, { once: true });
    }

    return () => {
      socketRef.current = null;
      socket.close();
    };
  }, [roomId]);

  function nextRound() {
    socketRef.current?.send(JSON.stringify({ type: 'nextRound' }));
  }

  function copyJoinUrl() {
    navigator.clipboard.writeText(joinUrl);
  }

  const winners = getRoundWinners(players);

  return (
    <Container>
      <Title>Room ID: {roomId}</Title>
      <Title>Round {round}</Title>

      <PlayersTitle>Players</PlayersTitle>
      <PlayersList>
        {players.map((player) => (
          <PlayerItem key={player.id}>
            {player.name}: {player.card ? formatCard(player.card) : '—'} — {player.score} pts
            {winners.some((winner) => winner.id === player.id) ? ' (winner)' : ''}
          </PlayerItem>
        ))}
      </PlayersList>

      {winners.length > 0 && (
        <Text>
          Winner{winners.length > 1 ? 's' : ''}: {winners.map((winner) => winner.name).join(', ')}
        </Text>
      )}

      <Button onClick={nextRound}>Next round</Button>

      {joinUrl && (
        <>
          <QRCodeCanvas value={joinUrl} />
          <Text>
            Join URL: <Link href={joinUrl}>{joinUrl}</Link>
          </Text>
          <Button onClick={copyJoinUrl}>Copy link</Button>
        </>
      )}
    </Container>
  );
}
