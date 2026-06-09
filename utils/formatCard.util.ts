import type { CardData } from '@/types';

export function formatCard(card: CardData): string {
  return `${card.rank}${card.suit}`;
}
