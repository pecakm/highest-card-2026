'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { QRCodeCanvas } from 'qrcode.react';

import { Button } from '@/components';
import { useRoomSocket } from '@/hooks';

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
  const t = useTranslations('LobbyPage');
  const router = useRouter();
  const { room, send } = useRoomSocket({ roomId });
  const joinUrl = `${process.env.NEXT_PUBLIC_APP_URL}/room/${roomId}/join`;

  useEffect(() => {
    if (room.status === 'playing') {
      router.replace(`/room/${roomId}/host`);
    }
  }, [room.status, roomId, router]);

  function startGame() {
    send({ type: 'startGame' });
  }

  function copyJoinUrl() {
    navigator.clipboard.writeText(joinUrl);
  }

  if (room.status !== 'lobby') {
    return null;
  }

  return (
    <Container>
      <Title>{t('roomId', { roomId })}</Title>
      {joinUrl && (
        <>
          <QRCodeCanvas value={joinUrl} />
          <Text>
            {t('joinUrl')} <Link href={joinUrl}>{joinUrl}</Link>
          </Text>
          <Button onClick={copyJoinUrl}>{t('copyLink')}</Button>
        </>
      )}
      <PlayersTitle>{t('players')} ({room.players.length})</PlayersTitle>
      <PlayersList>
        {room.players.map((player) => (
          <PlayerItem key={player.id}>{player.id} - {player.name}</PlayerItem>
        ))}
      </PlayersList>

      <Button disabled={room.players.length === 0} onClick={startGame}>
        {t('startGame')}
      </Button>
    </Container>
  );
}
