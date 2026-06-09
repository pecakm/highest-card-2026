import type { Player } from '@/types';

export function getNextChoosingPlayerIndex(
  playerList: Player[],
  currentIndex: number,
): number | null {
  const length = playerList.length;

  for (let i = 1; i <= length; i++) {
    const nextIndex = (currentIndex + i) % length;
    const player = playerList[nextIndex];

    if (player.card && player.choice === null) {
      return nextIndex;
    }
  }

  return null;
}
