'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Input, Button } from '@/components';

import { Container, Title } from './page.styled';

export default function JoinPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const router = useRouter();
  const [name, setName] = useState('');

  function joinRoom() {
    if (!name.trim()) return;

    sessionStorage.setItem(`room:${roomId}:playerName`, name.trim());
    router.push(`/room/${roomId}/player`);
  }

  return (
    <Container>
      <Title>Room ID: {roomId}</Title>

      <Input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Your name"
      />

      <Button onClick={joinRoom}>Join room</Button>
    </Container>
  );
}
