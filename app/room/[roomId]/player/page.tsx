'use client';

import { useCallback, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { getPlayerNameSessionKey } from '@/constants';
import { useRoomSocket } from '@/hooks';
import { PageContainer } from '@/ui';
import { RoundChoice } from '@/types';

import { GameRoom, WaitingRoom } from './components';

export default function PlayerPage() {
  const { roomId } = useParams<{ roomId: string }>();
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
    <PageContainer>
      {room.status === 'playing' && room.viewerPlayerId ? (
        <GameRoom
          playerId={room.viewerPlayerId}
          roundPhase={room.roundPhase}
          choosingPlayerIndex={room.choosingPlayerIndex}
          dealerPlayerIndex={room.dealerPlayerIndex}
          players={room.players}
          onRoundChoice={onRoundChoice}
        />
      ) : (
        <WaitingRoom players={room.players} />
      )}
    </PageContainer>
  );
}
