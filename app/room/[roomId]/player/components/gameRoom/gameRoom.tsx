'use client';

import { useTranslations } from 'next-intl';

import { getRoundWinners } from '@/utils';
import { Button, Card, PlayerSeatList } from '@/components';
import {
  RoomContainer,
  StatusBanner,
  Table,
  SectionLabel,
  Score,
  BadgeRow,
  Badge,
} from '@/ui';

import { GameRoomProps } from './gameRoom.types';
import { getDisplayPlayers } from './gameRoom.utils';
import {
  PlayerSection,
  YourCard,
  PlayerInfo,
  PlayerName,
  ActionButtons,
} from './gameRoom.styled';

export default function GameRoom({
  playerId,
  roundPhase,
  choosingPlayerIndex,
  dealerPlayerIndex,
  players,
  onRoundChoice,
}: GameRoomProps) {
  const t = useTranslations('PlayerPage.GameRoom');
  const currentPlayer = players.find((player) => player.id === playerId);
  const dealerPlayer = players[dealerPlayerIndex];
  const displayPlayers = getDisplayPlayers(players, playerId);
  const choosingPlayer = players[choosingPlayerIndex];
  const canChooseThisRound = Boolean(currentPlayer?.card);
  const isMyTurn =
    roundPhase === 'choosing' &&
    canChooseThisRound &&
    choosingPlayer !== undefined &&
    currentPlayer?.id === choosingPlayer.id;
  const buttonsDisabled =
    roundPhase !== 'choosing' || !isMyTurn || currentPlayer?.choice !== null;
  const winners = getRoundWinners(players, roundPhase);
  const isCurrentPlayerWinner = winners.some((winner) => winner.id === playerId);

  return (
    <RoomContainer>
      {roundPhase === 'choosing' && !canChooseThisRound && (
        <StatusBanner $variant="waiting">{t('waitingForNextRound')}</StatusBanner>
      )}

      <Table>
        {displayPlayers.length > 0 && (
          <PlayerSeatList
            title={t('opponents')}
            players={displayPlayers}
            roundPhase={roundPhase}
            choosingPlayerId={choosingPlayer?.id}
            dealerPlayerId={dealerPlayer?.id}
          />
        )}
        {!!currentPlayer && (
          <PlayerSection>
            <SectionLabel>{t('yourHand')}</SectionLabel>
            <YourCard>
              <Card card={currentPlayer.card} size="lg" />
            </YourCard>
            <PlayerInfo>
              <PlayerName>{currentPlayer.name}</PlayerName>
              <Score>
                {currentPlayer.score} {t('points')}
              </Score>
              <BadgeRow>
                {playerId === dealerPlayer?.id && (
                  <Badge $variant="dealer">{t('dealer')}</Badge>
                )}
                {isMyTurn && <Badge $variant="turn">{t('yourTurn')}</Badge>}
                {roundPhase === 'choosing' && currentPlayer.choice && (
                  <Badge $variant="choice">{t(currentPlayer.choice)}</Badge>
                )}
                {isCurrentPlayerWinner && (
                  <Badge $variant="winner">{t('winner')}</Badge>
                )}
              </BadgeRow>
            </PlayerInfo>

            {roundPhase === 'choosing' && canChooseThisRound && (
              <ActionButtons>
                <Button disabled={buttonsDisabled} onClick={() => onRoundChoice('in')}>
                  {t('in')}
                </Button>
                <Button
                  variant="secondary"
                  disabled={buttonsDisabled}
                  onClick={() => onRoundChoice('pass')}
                >
                  {t('pass')}
                </Button>
              </ActionButtons>
            )}
          </PlayerSection>
        )}
      </Table>
    </RoomContainer>
  );
}
