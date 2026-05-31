import type { Card } from '@/types';

export function formatCard(card: Card): string {
  return `${card.rank}${card.suit}`;
}
