'use client';

import { useTranslations } from 'next-intl';

import { getRoundWinners } from '@/utils';
import { Button, Card } from '@/components';

import { GameRoomProps } from './gameRoom.types';
import {
  Container,
  Text,
  Buttons,
  PlayersList,
  PlayerItem,
  PlayerCard,
  YourCard,
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

  return (
    <Container>
      {roundPhase === 'choosing' && !canChooseThisRound && (
        <Text>{t('waitingForNextRound')}</Text>
      )}
      {/* {roundPhase === 'choosing' && canChooseThisRound && !isMyTurn && choosingPlayer && (
        <Text>{t('waitingForPlayer', { name: choosingPlayer.name })}</Text>
      )} */}
      {winners.length > 0 && (
        <Text>
          {t('winners')} {winners.map((winner) => winner.name).join(', ')}
        </Text>
      )}
      <PlayersList>
        {players.map((player, index) => (
          <PlayerItem key={player.id}>
            <PlayerCard>
              <Card
                card={player.card}
                faceDown={roundPhase === 'choosing' && !player.card}
                size="sm"
              />
            </PlayerCard>
            {player.name}
            {index === dealerPlayerIndex && ` ${t('dealer')}`}: {player.score}
            {t('points')}
            {roundPhase === 'choosing' && player.choice && ` (${t(player.choice)})`}
          </PlayerItem>
        ))}
      </PlayersList>
      {currentPlayer?.card && (
        <YourCard>
          <Card card={currentPlayer.card} size="lg" />
        </YourCard>
      )}
            {roundPhase === 'choosing' && canChooseThisRound && (
        <Buttons>
          <Button disabled={buttonsDisabled} onClick={() => onRoundChoice('in')}>
            {t('in')}
          </Button>
          <Button disabled={buttonsDisabled} onClick={() => onRoundChoice('pass')}>
            {t('pass')}
          </Button>
        </Buttons>
      )}
    </Container>
  );
}
