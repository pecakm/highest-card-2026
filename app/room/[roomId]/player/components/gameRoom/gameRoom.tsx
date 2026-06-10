'use client';

import { useTranslations } from 'next-intl';

import { getRoundWinners } from '@/utils';
import { Button, Card } from '@/components';
import {
  RoomContainer,
  StatusBanner,
  Table,
  SectionLabel,
  PlayersGrid,
  SeatName,
} from '@/ui';

import { GameRoomProps } from './gameRoom.types';
import { getDisplayPlayers } from './gameRoom.utils';
import {
  OpponentCard,
  PlayerCardSlot,
  Score,
  BadgeRow,
  Badge,
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
      {/* {winners.length > 0 && (
        <StatusBanner $variant="success">
          {t('winners')} {winners.map((winner) => winner.name).join(', ')}
        </StatusBanner>
      )} */}

      <Table>
        {displayPlayers.length > 0 && (
          <>
            <SectionLabel>{t('opponents')}</SectionLabel>
            <PlayersGrid>
              {displayPlayers.map((player) => {
                const isChoosing =
                  roundPhase === 'choosing' && choosingPlayer?.id === player.id;
                const isWinner = winners.some((winner) => winner.id === player.id);

                return (
                  <OpponentCard
                    key={player.id}
                    $isChoosing={isChoosing}
                    $isWinner={isWinner}
                  >
                    <PlayerCardSlot>
                      <Card
                        card={player.card}
                        faceDown={roundPhase === 'choosing' && !player.card}
                        size="sm"
                      />
                    </PlayerCardSlot>
                    <SeatName>{player.name}</SeatName>
                    <Score>
                      {player.score} {t('points')}
                    </Score>
                    <BadgeRow>
                      {player.id === dealerPlayer?.id && (
                        <Badge $variant="dealer">{t('dealer')}</Badge>
                      )}
                      {isChoosing && <Badge $variant="turn">{t('choosing')}</Badge>}
                      {roundPhase === 'choosing' && player.choice && (
                        <Badge $variant="choice">{t(player.choice)}</Badge>
                      )}
                      {isWinner && <Badge $variant="winner">{t('winner')}</Badge>}
                    </BadgeRow>
                  </OpponentCard>
                );
              })}
            </PlayersGrid>
          </>
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
