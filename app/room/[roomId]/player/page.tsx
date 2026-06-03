'use client';

import { useCallback, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { getPlayerNameSessionKey } from '@/constants';
import { useRoomSocket } from '@/hooks';
import { RoundChoice } from '@/types';

import { GameRoom, WaitingRoom } from './components';
import { Container, Title } from './page.styled';

export default function PlayerPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const t = useTranslations('PlayerPage');
  const router = useRouter();
  const playerName =
    typeof window !== 'undefined'
      ? sessionStorage.getItem(getPlayerNameSessionKey(roomId))?.trim() ?? null
      : null;

  useEffect(() => {
    if (!playerName) {
      router.replace(`/room/${roomId}/join`);
    }
  }, [playerName, roomId, router]);

  const { room, send } = useRoomSocket({
    roomId,
    enabled: Boolean(playerName),
    onOpen: (sendMessage) => {
      if (playerName) {
        sendMessage({ type: 'join', name: playerName });
      }
    },
    onJoinRejected: () => {
      sessionStorage.removeItem(getPlayerNameSessionKey(roomId));
      router.replace(`/room/${roomId}/join?error=duplicateName`);
    },
  });

  const onRoundChoice = useCallback(
    (choice: RoundChoice) => {
      send({ type: 'roundChoice', choice });
    },
    [send],
  );

  return (
    <Container>
      <Title>{t('roomId', { roomId })}</Title>
      {room.status === 'playing' && room.viewerPlayerId ? (
        <GameRoom
          playerId={room.viewerPlayerId}
          round={room.round}
          roundPhase={room.roundPhase}
          choosingPlayerIndex={room.choosingPlayerIndex}
          dealerPlayerIndex={room.dealerPlayerIndex}
          players={room.players}
          onRoundChoice={onRoundChoice}
        />
      ) : (
        <WaitingRoom players={room.players} />
      )}
    </Container>
  );
}
