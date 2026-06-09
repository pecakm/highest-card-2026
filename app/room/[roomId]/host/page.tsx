'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { QRCodeCanvas } from 'qrcode.react';

import { Button, Card } from '@/components';
import { useRoomSocket } from '@/hooks';
import { getRoundWinners } from '@/utils';

import {
  Container,
  Title,
  Text,
  PlayersTitle,
  PlayersList,
  PlayerItem,
  PlayerCard,
} from './page.styled';

export default function HostPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const t = useTranslations('HostPage');
  const { room } = useRoomSocket({ roomId });

  const joinUrl = `${process.env.NEXT_PUBLIC_APP_URL}/room/${roomId}/join`;
  const choosingPlayer = room.players[room.choosingPlayerIndex];
  const winners = getRoundWinners(room.players, room.roundPhase);

  function copyJoinUrl() {
    navigator.clipboard.writeText(joinUrl);
  }

  if (room.status !== 'playing') {
    return null;
  }

  return (
    <Container>
      <Title>{t('roomId', { roomId })}</Title>
      <Title>{t('round', { round: room.round })}</Title>
      {room.roundPhase === 'choosing' && choosingPlayer && (
        <Text>{t('waitingForPlayer', { name: choosingPlayer.name })}</Text>
      )}
      <PlayersTitle>{t('players')}</PlayersTitle>
      <PlayersList>
        {room.players.map((player, index) => (
          <PlayerItem key={player.id}>
            <PlayerCard>
              <Card
                card={player.card}
                faceDown={room.roundPhase === 'choosing' && !player.card}
                size="sm"
              />
            </PlayerCard>
            {player.name}
            {index === room.dealerPlayerIndex && ` ${t('dealer')}`}: {player.score}
            {t('points')}
            {room.roundPhase === 'choosing' && player.choice && ` (${t(player.choice)})`}
            {winners.some((winner) => winner.id === player.id) ? ` ${t('winner')}` : ''}
          </PlayerItem>
        ))}
      </PlayersList>
      {winners.length > 0 && (
        <Text>
          {t('winners')} {winners.map((winner) => winner.name).join(', ')}
        </Text>
      )}
      {joinUrl && (
        <>
          <QRCodeCanvas value={joinUrl} />
          <Text>
            {t('joinUrl')} <Link href={joinUrl}>{joinUrl}</Link>
          </Text>
          <Button onClick={copyJoinUrl}>{t('copyLink')}</Button>
        </>
      )}
    </Container>
  );
}
