import type { Player } from '@/types';

import { formatCard } from './formatCard.util';

export function getPlayerCardDisplay(player: Player): string {
  return player.card ? formatCard(player.card) : '—';
}
