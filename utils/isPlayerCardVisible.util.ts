import type { Player, RoundPhase } from '@/types';

export function isPlayerCardVisible(
  player: Player,
  viewerPlayerId: string | undefined,
  roundPhase: RoundPhase,
): boolean {
  if (!player.card) {
    return false;
  }

  if (player.id === viewerPlayerId) {
    return true;
  }

  if (roundPhase === 'resolved' && player.choice === 'in') {
    return true;
  }

  return false;
}
