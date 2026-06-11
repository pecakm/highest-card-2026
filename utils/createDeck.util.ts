import type { CardData } from '@/types';
import { Suits, Ranks } from '@/constants';

export function createDeck(): CardData[] {
  return Suits.flatMap((suit) =>
    Ranks.map(({ rank, value }) => ({
      suit,
      rank,
      value,
    }))
  );
}
