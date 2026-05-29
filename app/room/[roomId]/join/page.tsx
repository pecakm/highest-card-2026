'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import PartySocket from 'partysocket';

import { Player, ServerMessage } from '@/interfaces';
import { Input, Button } from '@/components';

import { Container, Title, PlayersTitle, PlayersList, PlayerItem } from './page.styled';

export default function JoinPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const [name, setName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const socketRef = useRef<PartySocket | null>(null);

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
      socket.close();
    };
  }, [roomId]);

  function joinRoom() {
    if (!name.trim()) return;

    socketRef.current?.send(
      JSON.stringify({
        type: 'join',
        name,
      })
    );
  }

  return (
    <Container>
      <Title>Room: {roomId}</Title>

      <Input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Your name"
      />

      <Button onClick={joinRoom}>Join room</Button>

      <PlayersTitle>Players</PlayersTitle>

      <PlayersList>
        {players.map((player) => (
          <PlayerItem key={player.id}>{player.name}</PlayerItem>
        ))}
      </PlayersList>
    </Container>
  );
}
