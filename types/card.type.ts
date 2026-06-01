import type { Suit } from './suit.type';
import type { Rank } from './rank.type';

export type Card = {
  suit: Suit;
  rank: Rank;
  value: number;
};
