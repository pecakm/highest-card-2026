'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { QRCodeCanvas } from 'qrcode.react';

import { Button } from '@/components';
import { useRoomSocket } from '@/hooks';
import {
  PageContainer,
  Table,
  SectionLabel,
  PlayersGrid,
  SeatName,
  PlayerSeat,
} from '@/ui';

import {
  StartSection,
  InviteSection,
  JoinPanel,
  QrCode,
  JoinUrlRow,
  JoinUrlLabel,
  JoinUrlLink,
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
    <PageContainer>
      <Table>
        <SectionLabel>
          {t('players')} ({room.players.length})
        </SectionLabel>
        <PlayersGrid>
          {room.players.map((player) => (
            <PlayerSeat key={player.id}>
              <SeatName>{player.name}</SeatName>
            </PlayerSeat>
          ))}
        </PlayersGrid>

        <StartSection>
          <Button disabled={room.players.length === 0} onClick={startGame}>
            {t('startGame')}
          </Button>
        </StartSection>

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
