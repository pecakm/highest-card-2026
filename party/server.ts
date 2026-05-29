import type * as Party from 'partykit/server';

import type {
  ClientMessage,
  ServerMessage,
  Player,
  RoomStatus,
} from '@/types';

import { createDeck, shuffleDeck } from './deck';

export default class GameRoom implements Party.Server {
  players = new Map<string, Player>();
  status: RoomStatus = 'lobby';
  round = 0;

  constructor(readonly room: Party.Room) {}

  onConnect(connection: Party.Connection) {
    this.sendRoomState(connection);
  }

  onMessage(message: string, connection: Party.Connection) {
    const data = JSON.parse(message) as ClientMessage;

    if (data.type === 'join') {
      this.players.set(connection.id, {
        id: connection.id,
        name: data.name,
        score: 0,
        card: null,
      });

      this.sendRoomState();
    }

    if (data.type === 'startGame' && this.status === 'lobby') {
      this.status = 'playing';
      this.playRound();
    }

    if (data.type === 'nextRound' && this.status === 'playing') {
      this.playRound();
    }
  }

  onClose(connection: Party.Connection) {
    this.players.delete(connection.id);
    this.sendRoomState();
  }

  playRound() {
    const playerList = Array.from(this.players.values());

    if (playerList.length === 0) {
      this.sendRoomState();
      return;
    }

    const deck = shuffleDeck(createDeck());

    for (const player of playerList) {
      player.card = deck.pop() ?? null;
    }

    const highestValue = Math.max(...playerList.map((player) => player.card?.value ?? 0));

    for (const player of playerList) {
      if (player.card?.value === highestValue) {
        player.score += 1;
      }
    }

    this.round += 1;
    this.sendRoomState();
  }

  sendRoomState(target?: Party.Connection) {
    const message: ServerMessage = {
      type: 'roomState',
      status: this.status,
      round: this.round,
      players: Array.from(this.players.values()),
    };

    const payload = JSON.stringify(message);

    if (target) {
      target.send(payload);
    } else {
      this.room.broadcast(payload);
    }
  }
}
