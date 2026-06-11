'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { InvitePlayers, PlayerSeatList } from '@/components';
import { useRoomSocket } from '@/hooks';
import { PageContainer, Table } from '@/ui';

export default function HostPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const t = useTranslations('HostPage');
  const { room } = useRoomSocket({ roomId });

  const joinUrl = `${process.env.NEXT_PUBLIC_APP_URL}/room/${roomId}/join`;
  const choosingPlayer = room.players[room.choosingPlayerIndex];
  const dealerPlayer = room.players[room.dealerPlayerIndex];

  if (room.status !== 'playing') {
    return null;
  }

  return (
    <PageContainer>
      <Table>
        <PlayerSeatList
          title={`${t('players')} (${room.players.length})`}
          players={room.players}
          roundPhase={room.roundPhase}
          choosingPlayerId={choosingPlayer?.id}
          dealerPlayerId={dealerPlayer?.id}
        />
        <InvitePlayers joinUrl={joinUrl} />
      </Table>
    </PageContainer>
  );
}
