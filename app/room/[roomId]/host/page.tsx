'use client';

import { useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { QRCodeCanvas } from 'qrcode.react';

import { Button } from '@/components';
import { useRoomSocket } from '@/hooks';
import { getPlayerCardDisplay, getRoundWinners } from '@/utils';

import { Container, Title, Text, PlayersTitle, PlayersList, PlayerItem } from './page.styled';

export default function HostPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const t = useTranslations('HostPage');
  const hasStartedRef = useRef(false);
  const { room } = useRoomSocket({
    roomId,
    onOpen: (sendMessage) => {
      if (hasStartedRef.current) {
        return;
      }

      hasStartedRef.current = true;
      sendMessage({ type: 'startGame' });
    },
  });

  const joinUrl = `${process.env.NEXT_PUBLIC_APP_URL}/room/${roomId}/join`;
  const choosingPlayer = room.players[room.choosingPlayerIndex];
  const winners = getRoundWinners(room.players, room.roundPhase);

  function copyJoinUrl() {
    navigator.clipboard.writeText(joinUrl);
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
            {player.name}
            {index === room.dealerPlayerIndex && ` ${t('dealer')}`}:{' '}
            {getPlayerCardDisplay(player)} — {player.score}{t('points')}
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
