import type { Card } from '@/types';
import { Suits, Ranks } from '@/constants';

export function createDeck(): Card[] {
  return Suits.flatMap((suit) =>
    Ranks.map(({ rank, value }) => ({
      suit,
      rank,
      value,
    }))
  );
}
