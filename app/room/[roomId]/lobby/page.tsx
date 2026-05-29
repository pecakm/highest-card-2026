'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { QRCodeCanvas } from 'qrcode.react';
import PartySocket from 'partysocket';

import { Button } from '@/components';
import { Player, ServerMessage } from '@/interfaces';

import {
  Container,
  Title,
  Text,
  PlayersTitle,
  PlayersList,
  PlayerItem,
} from './page.styled';

export default function LobbyPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const socketRef = useRef<PartySocket | null>(null);

  const joinUrl = typeof window !== 'undefined' ? `${window.location.origin}/room/${roomId}/join` : '';

  useEffect(() => {
    const socket = new PartySocket({
      host: process.env.NEXT_PUBLIC_PARTYKIT_HOST!,
      room: roomId,
    });

    socketRef.current = socket;

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data) as ServerMessage;

      if (data.type === 'players') {
        setPlayers(data.players);
      }
    });

    return () => {
      socketRef.current = null;
      socket.close();
    };
  }, [roomId]);

  function startGame() {
    router.push(`/room/${roomId}/host`);
  }

  function copyJoinUrl() {
    navigator.clipboard.writeText(joinUrl);
  }

  return (
    <Container>
      <Title>Room ID: {roomId}</Title>
      {joinUrl && (
        <>
          <QRCodeCanvas value={joinUrl} />
          <Text>
            Join URL: <Link href={joinUrl}>{joinUrl}</Link>
          </Text>
          <Button onClick={copyJoinUrl}>Copy link</Button>
        </>
      )}

      <PlayersTitle>Players ({players.length})</PlayersTitle>

      <PlayersList>
        {players.map((player) => (
          <PlayerItem key={player.id}>{player.id} - {player.name}</PlayerItem>
        ))}
      </PlayersList>

      <Button onClick={startGame}>Start Game</Button>
    </Container>
  );
}
