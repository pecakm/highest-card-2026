'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PartySocket from 'partysocket';
import { QRCodeCanvas } from 'qrcode.react';

import { Button } from '@/components';

import { Container, Title, Text } from './page.styled';

export default function HostPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const joinUrl = typeof window !== 'undefined' ? `${window.location.origin}/room/${roomId}/join` : '';

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

  function copyJoinUrl() {
    navigator.clipboard.writeText(joinUrl);
  }

  return (
    <Container>
      <Title>Room ID: {roomId}</Title>
      Game is on
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
