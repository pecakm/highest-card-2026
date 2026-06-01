import type { Player, RoundPhase } from '@/types';

import { formatCard } from './formatCard.util';

export function getPlayerCardDisplay(
  player: Player,
  viewerPlayerId: string | undefined,
  roundPhase: RoundPhase,
): string {
  if (!player.card) {
    return '—';
  }

  if (player.id === viewerPlayerId) {
    return formatCard(player.card);
  }

  if (roundPhase === 'resolved' && player.choice === 'in') {
    return formatCard(player.card);
  }

  return '—';
}
