'use client';

import { useTranslations } from 'next-intl';

import { Card } from '@/components';
import { getRoundWinners } from '@/utils';
import {
  PlayersGrid,
  PlayerSeat,
  SeatName,
  SectionLabel,
  Score,
  BadgeRow,
  Badge,
} from '@/ui';

import { PlayerSeatListProps } from './playerSeatList.types';
import { Container, PlayerCardSlot } from './playerSeatList.styled';

export default function PlayerSeatList({
  title,
  players,
  roundPhase,
  choosingPlayerId,
  dealerPlayerId,
}: PlayerSeatListProps) {
  const t = useTranslations('PlayerSeatList');
  const winners = getRoundWinners(players, roundPhase);

  return (
    <Container>
      <SectionLabel>{title}</SectionLabel>
      <PlayersGrid>
        {players.map((player) => {
          const isChoosing = roundPhase === 'choosing' && choosingPlayerId === player.id;
          const isWinner = winners.some((winner) => winner.id === player.id);

          return (
            <PlayerSeat key={player.id} $isChoosing={isChoosing} $isWinner={isWinner}>
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
                {player.id === dealerPlayerId && (
                  <Badge $variant="dealer">{t('dealer')}</Badge>
                )}
                {isChoosing && <Badge $variant="turn">{t('choosing')}</Badge>}
                {roundPhase === 'choosing' && player.choice && (
                  <Badge $variant="choice">{t(player.choice)}</Badge>
                )}
                {isWinner && <Badge $variant="winner">{t('winner')}</Badge>}
              </BadgeRow>
            </PlayerSeat>
          );
        })}
      </PlayersGrid>
    </Container>
  );
}
