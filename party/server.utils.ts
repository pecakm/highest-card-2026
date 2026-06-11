import type { CardData, Player } from '@/types';

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

export function dealCardsToPlayers(players: Player[], deck: CardData[]): void {
  for (const player of players) {
    player.card = deck.pop() ?? null;
    player.choice = null;
  }
}

export function applyRoundScores(players: Player[]): void {
  const inPlayers = players.filter((player) => player.choice === 'in' && player.card);

  if (inPlayers.length === 0) {
    return;
  }

  const highestValue = Math.max(...inPlayers.map((player) => player.card!.value));

  for (const player of inPlayers) {
    if (player.card!.value === highestValue) {
      player.score += 1;
    } else {
      player.score -= 1;
    }
  }
}
