import type { Suit } from '@/types';

const RedSuits: Suit[] = ['♥', '♦'];

export function isRedSuit(suit: Suit): boolean {
  return RedSuits.includes(suit);
}
