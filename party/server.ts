import type * as Party from 'partykit/server';

import type { ClientMessage, ServerMessage, Player } from '@/interfaces';

export default class GameRoom implements Party.Server {
  players = new Map<string, Player>();

  constructor(readonly room: Party.Room) {}

  onConnect(connection: Party.Connection) {
    this.sendPlayers();
  }

  onMessage(message: string, connection: Party.Connection) {
    const data = JSON.parse(message) as ClientMessage;

    if (data.type === 'join') {
      this.players.set(connection.id, {
        id: connection.id,
        name: data.name,
      });

      this.sendPlayers();
    }
  }

  onClose(connection: Party.Connection) {
    this.players.delete(connection.id);
    this.sendPlayers();
  }

  sendPlayers() {
    const message: ServerMessage = {
      type: 'players',
      players: Array.from(this.players.values()),
    };

    this.room.broadcast(JSON.stringify(message));
  }
}
