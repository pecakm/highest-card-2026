'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button, InvitePlayers } from '@/components';
import { useRoomSocket } from '@/hooks';
import {
  PageContainer,
  Table,
  SectionLabel,
  PlayersGrid,
  SeatName,
  PlayerSeat,
} from '@/ui';

import { StartSection } from './page.styled';

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
        <InvitePlayers joinUrl={joinUrl} />
      </Table>
    </PageContainer>
  );
}
