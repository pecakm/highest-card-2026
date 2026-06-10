'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { QRCodeCanvas } from 'qrcode.react';

import { Button, Card } from '@/components';
import { useRoomSocket } from '@/hooks';
import { getRoundWinners } from '@/utils';
import {
  PageContainer,
  Table,
  SectionLabel,
  PlayersGrid,
  SeatName,
  PlayerSeat,
} from '@/ui';

import {
  PlayerCardSlot,
  Score,
  BadgeRow,
  Badge,
  InviteSection,
  JoinPanel,
  QrCode,
  JoinUrlRow,
  JoinUrlLabel,
  JoinUrlLink,
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
    <PageContainer>
      <Table>
        <SectionLabel>
          {t('players')} ({room.players.length})
        </SectionLabel>
        <PlayersGrid>
          {room.players.map((player, index) => {
            const isChoosing =
              room.roundPhase === 'choosing' && choosingPlayer?.id === player.id;
            const isWinner = winners.some((winner) => winner.id === player.id);

            return (
              <PlayerSeat key={player.id} $isChoosing={isChoosing} $isWinner={isWinner}>
                <PlayerCardSlot>
                  <Card
                    card={player.card}
                    faceDown={room.roundPhase === 'choosing' && !player.card}
                    size="sm"
                  />
                </PlayerCardSlot>
                <SeatName>{player.name}</SeatName>
                <Score>
                  {player.score} {t('points')}
                </Score>
                <BadgeRow>
                  {index === room.dealerPlayerIndex && (
                    <Badge $variant="dealer">{t('dealer')}</Badge>
                  )}
                  {isChoosing && <Badge $variant="turn">{t('choosing')}</Badge>}
                  {room.roundPhase === 'choosing' && player.choice && (
                    <Badge $variant="choice">{t(player.choice)}</Badge>
                  )}
                  {isWinner && <Badge $variant="winner">{t('winner')}</Badge>}
                </BadgeRow>
              </PlayerSeat>
            );
          })}
        </PlayersGrid>

        {joinUrl && (
          <InviteSection>
            <SectionLabel>{t('invitePlayers')}</SectionLabel>
            <JoinPanel>
              <QrCode>
                <QRCodeCanvas value={joinUrl} size={148} level="M" includeMargin={false} />
              </QrCode>
              <JoinUrlRow>
                <JoinUrlLabel>{t('joinUrl')}</JoinUrlLabel>
                <JoinUrlLink href={joinUrl} target="_blank" rel="noopener noreferrer">
                  {joinUrl}
                </JoinUrlLink>
              </JoinUrlRow>
              <Button onClick={copyJoinUrl} variant="secondary">{t('copyLink')}</Button>
            </JoinPanel>
          </InviteSection>
        )}
      </Table>
    </PageContainer>
  );
}
