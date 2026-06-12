import { useTranslations } from 'next-intl';

import { getRoundWinners } from '@/utils';
import { PlayerSeatList } from '@/components';
import { RoomContainer, StatusBanner, Table } from '@/ui';

import { CurrentPlayer } from '..';

import { GameRoomProps } from './gameRoom.types';
import { getDisplayPlayers } from './gameRoom.utils';

export default function GameRoom({
  playerId,
  roundPhase,
  choosingPlayerIndex,
  dealerPlayerIndex,
  players,
  onRoundChoice,
}: GameRoomProps) {
  const t = useTranslations('PlayerPage.gameRoom');
  const currentPlayer = players.find((player) => player.id === playerId);
  const dealerPlayer = players[dealerPlayerIndex];
  const displayPlayers = getDisplayPlayers(players, playerId);
  const choosingPlayer = players[choosingPlayerIndex];
  const canChooseThisRound = Boolean(
    currentPlayer?.hasCardThisRound && currentPlayer.choice === null,
  );
  const isWaitingForNextRound = roundPhase === 'choosing'
    && currentPlayer !== undefined
    && !currentPlayer.hasCardThisRound;
  const winners = getRoundWinners(players, roundPhase);
  const isMyTurn = roundPhase === 'choosing'
    && canChooseThisRound
    && choosingPlayer !== undefined
    && currentPlayer?.id === choosingPlayer.id;

  return (
    <RoomContainer>
      {isWaitingForNextRound && (
        <StatusBanner>{t('waitingForNextRound')}</StatusBanner>
      )}
      <Table>
        {displayPlayers.length > 0 && (
          <PlayerSeatList
            title={t('opponents')}
            players={displayPlayers}
            roundPhase={roundPhase}
            choosingPlayerId={choosingPlayer?.id}
            dealerPlayerId={dealerPlayer?.id}
            winnerPlayerIds={winners.map((winner) => winner.id)}
          />
        )}
        {!!currentPlayer && (
          <CurrentPlayer
            player={currentPlayer}
            roundPhase={roundPhase}
            isDealer={playerId === dealerPlayer?.id}
            isMyTurn={isMyTurn}
            isWinner={winners.some((winner) => winner.id === playerId)}
            onRoundChoice={onRoundChoice}
          />
        )}
      </Table>
    </RoomContainer>
  );
}
