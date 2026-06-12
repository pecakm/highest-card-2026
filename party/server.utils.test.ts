import { describe, expect, it } from 'vitest';

import type { CardData, Player } from '@/types';

import { applyRoundScores } from './server.utils';

function card(value: number): CardData {
  return { suit: '♠', rank: 'A', value };
}

function player(
  id: string,
  options: {
    score?: number;
    card?: CardData | null;
    choice?: Player['choice'];
  } = {},
): Player {
  return {
    id,
    name: id,
    score: options.score ?? 0,
    card: options.card ?? null,
    choice: options.choice ?? null,
  };
}

describe('applyRoundScores', () => {
  it('awards +1 to the highest card and -1 to other players who stayed in', () => {
    const players = [
      player('alice', { card: card(10), choice: 'in' }),
      player('bob', { card: card(14), choice: 'in' }),
      player('carol', { card: card(7), choice: 'in' }),
    ];

    applyRoundScores(players);

    expect(players[0].score).toBe(-1);
    expect(players[1].score).toBe(1);
    expect(players[2].score).toBe(-1);
  });

  it('gives +1 to each player tied for the highest card', () => {
    const players = [
      player('alice', { card: card(14), choice: 'in' }),
      player('bob', { card: card(14), choice: 'in' }),
      player('carol', { card: card(9), choice: 'in' }),
    ];

    applyRoundScores(players);

    expect(players[0].score).toBe(1);
    expect(players[1].score).toBe(1);
    expect(players[2].score).toBe(-1);
  });

  it('does not change scores when every player passes', () => {
    const players = [
      player('alice', { score: 3, card: card(14), choice: 'pass' }),
      player('bob', { score: -2, card: card(5), choice: 'pass' }),
    ];

    applyRoundScores(players);

    expect(players[0].score).toBe(3);
    expect(players[1].score).toBe(-2);
  });

  it('does not change scores when no player stayed in', () => {
    const players = [
      player('alice', { score: 1, card: card(14), choice: 'pass' }),
      player('bob', { score: 0, card: card(5), choice: null }),
    ];

    applyRoundScores(players);

    expect(players[0].score).toBe(1);
    expect(players[1].score).toBe(0);
  });
});
