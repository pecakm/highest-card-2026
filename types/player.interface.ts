import type { Card } from './card.type';

export interface Player {
  id: string;
  name: string;
  score: number;
  card: Card | null;
}
