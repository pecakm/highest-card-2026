import type { Card, Player } from '@/types';

export function formatCard(card: Card): string {
  return `${card.rank} of ${card.suit}`;
}

export function getRoundWinners(players: Player[]): Player[] {
  const highestValue = Math.max(...players.map((player) => player.card?.value ?? 0));

  if (highestValue === 0) {
    return [];
  }

  return players.filter((player) => player.card?.value === highestValue);
}
