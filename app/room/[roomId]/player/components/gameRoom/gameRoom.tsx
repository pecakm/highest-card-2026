'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { formatCard, getRoundWinners } from '@/utils';

import { GameRoomProps } from './gameRoom.types';
import {
  Container,
  RoundTitle,
  Text,
  PlayersTitle,
  PlayersList,
  PlayerItem,
} from './gameRoom.styled';

export default function GameRoom({ round, players }: GameRoomProps) {
  const { roomId } = useParams<{ roomId: string }>();
  const t = useTranslations('PlayerPage.GameRoom');
  const playerName = sessionStorage.getItem(`room:${roomId}:playerName`)?.trim();
  const currentPlayer = players.find((player) => player.name === playerName);
  const winners = getRoundWinners(players);

  return (
    <Container>
      <RoundTitle>{t('round', { round })}</RoundTitle>
      {currentPlayer?.card && (
        <Text>{t('yourCard')} {formatCard(currentPlayer.card)}</Text>
      )}
      {winners.length > 0 && (
        <Text>
          {t('winners')} {winners.map((winner) => winner.name).join(', ')}
        </Text>
      )}
      <PlayersTitle>{t('scoreboard')}</PlayersTitle>
      <PlayersList>
        {players.map((player) => (
          <PlayerItem key={player.id}>
            {player.name}: {player.card ? formatCard(player.card) : '—'} — {player.score} {t('points')}
          </PlayerItem>
        ))}
      </PlayersList>
    </Container>
  );
}
