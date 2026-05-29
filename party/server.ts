import type * as Party from 'partykit/server';

import type {
  ClientMessage,
  ServerMessage,
  Player,
  RoomStatus,
} from '@/types';

export default class GameRoom implements Party.Server {
  players = new Map<string, Player>();
  status: RoomStatus = 'lobby';

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
      });

      this.sendRoomState();
    }

    if (data.type === 'startGame' && this.status === 'lobby') {
      this.status = 'playing';
      this.sendRoomState();
    }
  }

  onClose(connection: Party.Connection) {
    this.players.delete(connection.id);
    this.sendRoomState();
  }

  sendRoomState(target?: Party.Connection) {
    const message: ServerMessage = {
      type: 'roomState',
      status: this.status,
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
