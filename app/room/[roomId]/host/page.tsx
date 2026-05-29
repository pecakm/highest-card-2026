'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { QRCodeCanvas } from 'qrcode.react';

import { Button } from '@/components';

import { Container, Title, Text } from './page.styled';

export default function HostPage() {
  const { roomId } = useParams();

  const joinUrl = typeof window !== 'undefined' ? `${window.location.origin}/room/${roomId}/join` : '';

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
    </Container>
  );
}
