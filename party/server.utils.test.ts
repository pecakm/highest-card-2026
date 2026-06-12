import { describe, expect, it } from 'vitest';

import type { CardData, Player } from '@/types';

import { applyRoundScores, getNextChoosingPlayerIndex } from './server.utils';

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

describe('getNextChoosingPlayerIndex', () => {
  it('returns the next player who has a card and has not chosen yet', () => {
    const players = [
      player('alice', { card: card(10), choice: 'in' }),
      player('bob', { card: card(8), choice: null }),
      player('carol', { card: card(12), choice: null }),
    ];

    expect(getNextChoosingPlayerIndex(players, 0)).toBe(1);
  });

  it('wraps around to the start of the list', () => {
    const players = [
      player('alice', { card: card(10), choice: null }),
      player('bob', { card: card(8), choice: 'in' }),
      player('carol', { card: card(12), choice: 'pass' }),
    ];

    expect(getNextChoosingPlayerIndex(players, 2)).toBe(0);
  });

  it('skips players who already chose or have no card', () => {
    const players = [
      player('alice', { card: card(10), choice: 'in' }),
      player('bob', { card: null, choice: null }),
      player('carol', { card: card(12), choice: 'pass' }),
      player('dave', { card: card(7), choice: null }),
    ];

    expect(getNextChoosingPlayerIndex(players, 0)).toBe(3);
  });

  it('returns null when no eligible player remains', () => {
    const players = [
      player('alice', { card: card(10), choice: 'in' }),
      player('bob', { card: card(8), choice: 'pass' }),
      player('carol', { card: null, choice: null }),
    ];

    expect(getNextChoosingPlayerIndex(players, 1)).toBeNull();
  });
});
