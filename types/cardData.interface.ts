import type { Suit } from './suit.type';
import type { Rank } from './rank.type';

export interface CardData {
  suit: Suit;
  rank: Rank;
  value: number;
}
