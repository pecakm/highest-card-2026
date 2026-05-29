'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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

export default function HostPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const [players, setPlayers] = useState<Player[]>([]);

  const joinUrl = typeof window !== 'undefined' ? `${window.location.origin}/room/${roomId}/join` : '';

  useEffect(() => {
    const socket = new PartySocket({
      host: process.env.NEXT_PUBLIC_PARTYKIT_HOST!,
      room: roomId,
    });

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data) as ServerMessage;

      if (data.type === 'players') {
        setPlayers(data.players);
      }
    });

    return () => {
      socket.close();
    };
  }, [roomId]);

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
    </Container>
  );
}
