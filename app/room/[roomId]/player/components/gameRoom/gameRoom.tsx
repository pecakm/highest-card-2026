'use client';

import { useTranslations } from 'next-intl';

import { formatCard, getPlayerCardDisplay, getRoundWinners } from '@/utils';
import { Button } from '@/components';

import { GameRoomProps } from './gameRoom.types';
import {
  Container,
  RoundTitle,
  Text,
  Buttons,
  PlayersTitle,
  PlayersList,
  PlayerItem,
} from './gameRoom.styled';

export default function GameRoom({
  playerId,
  round,
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
      <Text>{t('yourName')} {currentPlayer?.name}</Text>
      <RoundTitle>{t('round', { round })}</RoundTitle>
      {currentPlayer?.card && (
        <Text>{t('yourCard')} {formatCard(currentPlayer.card)}</Text>
      )}
      {roundPhase === 'choosing' && !canChooseThisRound && (
        <Text>{t('waitingForNextRound')}</Text>
      )}
      {roundPhase === 'choosing' && canChooseThisRound && !isMyTurn && choosingPlayer && (
        <Text>{t('waitingForPlayer', { name: choosingPlayer.name })}</Text>
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
      {winners.length > 0 && (
        <Text>
          {t('winners')} {winners.map((winner) => winner.name).join(', ')}
        </Text>
      )}
      <PlayersTitle>{t('scoreboard')}</PlayersTitle>
      <PlayersList>
        {players.map((player, index) => (
          <PlayerItem key={player.id}>
            {player.name}
            {index === dealerPlayerIndex && ` ${t('dealer')}`}:{' '}
            {getPlayerCardDisplay(player)} — {player.score}{t('points')}
            {roundPhase === 'choosing' && player.choice && ` (${t(player.choice)})`}
          </PlayerItem>
        ))}
      </PlayersList>
    </Container>
  );
}
