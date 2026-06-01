'use client';

import { useParams } from 'next/navigation';
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
  round,
  roundPhase,
  choosingPlayerIndex,
  dealerPlayerIndex,
  players,
  onRoundChoice,
}: GameRoomProps) {
  const { roomId } = useParams<{ roomId: string }>();
  const t = useTranslations('PlayerPage.GameRoom');
  const playerName = sessionStorage.getItem(`room:${roomId}:playerName`)?.trim();
  const currentPlayer = players.find((player) => player.name === playerName);
  const choosingPlayer = players[choosingPlayerIndex];
  const isMyTurn =
    roundPhase === 'choosing' &&
    choosingPlayer !== undefined &&
    currentPlayer?.id === choosingPlayer.id;
  const buttonsDisabled =
    roundPhase !== 'choosing' || !isMyTurn || currentPlayer?.choice !== null;
  const winners = getRoundWinners(players, roundPhase);

  return (
    <Container>
      <RoundTitle>{t('round', { round })}</RoundTitle>
      {currentPlayer?.card && (
        <Text>{t('yourCard')} {formatCard(currentPlayer.card)}</Text>
      )}
      {roundPhase === 'choosing' && !isMyTurn && choosingPlayer && (
        <Text>{t('waitingForPlayer', { name: choosingPlayer.name })}</Text>
      )}
      {roundPhase === 'choosing' && (
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
            {getPlayerCardDisplay(player, currentPlayer?.id, roundPhase)} — {player.score}{t('points')}
            {roundPhase === 'choosing' && player.choice && ` (${t(player.choice)})`}
          </PlayerItem>
        ))}
      </PlayersList>
    </Container>
  );
}
