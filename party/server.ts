import type * as Party from 'partykit/server';

import type {
  ClientMessage,
  ServerMessage,
  Player,
  RoomStatus,
  RoundChoice,
  RoundPhase,
} from '@/types';
import { createDeck, shuffleDeck } from '@/utils';

export default class GameRoom implements Party.Server {
  players = new Map<string, Player>();
  status: RoomStatus = 'lobby';
  round = 0;
  roundPhase: RoundPhase = 'resolved';
  choosingPlayerIndex = 0;

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
        choice: null,
      });

      this.sendRoomState();
    }

    if (data.type === 'startGame' && this.status === 'lobby') {
      this.status = 'playing';
      this.playRound();
    }

    if (data.type === 'nextRound' && this.status === 'playing' && this.roundPhase === 'resolved') {
      this.playRound();
    }

    if (data.type === 'roundChoice' && this.status === 'playing' && this.roundPhase === 'choosing') {
      this.handleRoundChoice(connection.id, data.choice);
    }
  }

  onClose(connection: Party.Connection) {
    this.players.delete(connection.id);
    this.sendRoomState();
  }

  getPlayerList(): Player[] {
    return Array.from(this.players.values());
  }

  playRound() {
    const playerList = this.getPlayerList();

    if (playerList.length === 0) {
      this.sendRoomState();
      return;
    }

    const deck = shuffleDeck(createDeck());

    for (const player of playerList) {
      player.card = deck.pop() ?? null;
      player.choice = null;
    }

    this.round += 1;
    this.roundPhase = 'choosing';
    this.choosingPlayerIndex = 0;
    this.sendRoomState();
  }

  handleRoundChoice(playerId: string, choice: RoundChoice) {
    const playerList = this.getPlayerList();
    const currentPlayer = playerList[this.choosingPlayerIndex];

    if (!currentPlayer || currentPlayer.id !== playerId) {
      return;
    }

    currentPlayer.choice = choice;
    this.choosingPlayerIndex += 1;

    if (this.choosingPlayerIndex >= playerList.length) {
      this.resolveRound(playerList);
    } else {
      this.sendRoomState();
    }
  }

  resolveRound(playerList: Player[]) {
    const inPlayers = playerList.filter((player) => player.choice === 'in' && player.card);

    if (inPlayers.length > 0) {
      const highestValue = Math.max(...inPlayers.map((player) => player.card!.value));

      for (const player of inPlayers) {
        if (player.card!.value === highestValue) {
          player.score += 1;
        }
      }
    }

    this.roundPhase = 'resolved';
    this.sendRoomState();
  }

  sendRoomState(target?: Party.Connection) {
    const message: ServerMessage = {
      type: 'roomState',
      status: this.status,
      round: this.round,
      roundPhase: this.roundPhase,
      choosingPlayerIndex: this.choosingPlayerIndex,
      players: this.getPlayerList(),
    };

    const payload = JSON.stringify(message);

    if (target) {
      target.send(payload);
    } else {
      this.room.broadcast(payload);
    }
  }
}
