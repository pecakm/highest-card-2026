import type * as Party from 'partykit/server';

import type {
  ClientMessage,
  ServerMessage,
  Player,
  RoomStatus,
  RoundChoice,
  RoundPhase,
  JoinRejectedMessage,
} from '@/types';
import { createDeck, getPublicPlayerList, shuffleDeck } from '@/utils';
import { NextRoundDelay } from '@/constants';

import { getNextChoosingPlayerIndex, dealCardsToPlayers, applyRoundScores } from './server.utils';

export default class GameServer implements Party.Server {
  players = new Map<string, Player>();
  status: RoomStatus = 'lobby';
  round = 0;
  roundPhase: RoundPhase = 'resolved';
  choosingPlayerIndex = 0;
  dealerPlayerIndex = -1;
  nextRoundTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(readonly room: Party.Room) {}

  onConnect(connection: Party.Connection) {
    this.sendRoomState(connection);
  }

  onMessage(message: string, connection: Party.Connection) {
    const data = JSON.parse(message) as ClientMessage;

    if (data.type === 'join') {
      const name = data.name.trim();

      if (!name) {
        return;
      }

      const normalizedName = name.toLowerCase();
      const duplicatePlayer = this.getPlayerList().find(
        (player) =>
          player.id !== connection.id &&
          player.name.trim().toLowerCase() === normalizedName,
      );

      if (duplicatePlayer) {
        if (this.isConnectionActive(duplicatePlayer.id)) {
          const rejected: JoinRejectedMessage = {
            type: 'joinRejected',
            reason: 'duplicateName',
          };
          connection.send(JSON.stringify(rejected));
          return;
        }

        this.players.delete(duplicatePlayer.id);
      }

      this.players.set(connection.id, {
        id: connection.id,
        name,
        score: 0,
        card: null,
        choice: null,
      });

      if (this.status === 'playing' && this.roundPhase === 'choosing') {
        this.ensureChoosingPlayerIsEligible();
      }

      this.sendRoomState();
    }

    if (
      data.type === 'startGame' &&
      this.status === 'lobby' &&
      this.getPlayerList().length > 0
    ) {
      this.status = 'playing';
      this.playRound();
    }

    if (data.type === 'roundChoice' && this.status === 'playing' && this.roundPhase === 'choosing') {
      this.handleRoundChoice(connection.id, data.choice);
    }
  }

  onClose(connection: Party.Connection) {
    const playerList = this.getPlayerList();
    const leavingPlayerIndex = playerList.findIndex(
      (player) => player.id === connection.id,
    );
    const wasChoosingPlayer =
      leavingPlayerIndex !== -1 &&
      leavingPlayerIndex === this.choosingPlayerIndex;
    let nextChoosingPlayerId: string | null = null;

    if (
      wasChoosingPlayer &&
      this.status === 'playing' &&
      this.roundPhase === 'choosing'
    ) {
      const nextIndex = getNextChoosingPlayerIndex(
        playerList,
        leavingPlayerIndex,
      );

      nextChoosingPlayerId =
        nextIndex !== null ? playerList[nextIndex].id : null;
    }

    this.players.delete(connection.id);

    if (
      this.status === 'playing' &&
      this.roundPhase === 'choosing' &&
      leavingPlayerIndex !== -1
    ) {
      if (!wasChoosingPlayer && leavingPlayerIndex < this.choosingPlayerIndex) {
        this.choosingPlayerIndex -= 1;
      }

      if (leavingPlayerIndex < this.dealerPlayerIndex) {
        this.dealerPlayerIndex -= 1;
      }

      if (wasChoosingPlayer) {
        if (nextChoosingPlayerId) {
          this.choosingPlayerIndex = this.getPlayerList().findIndex(
            (player) => player.id === nextChoosingPlayerId,
          );
        } else {
          this.ensureChoosingPlayerIsEligible();
        }
      } else {
        this.ensureChoosingPlayerIsEligible();
      }
    }

    this.sendRoomState();
  }

  getPlayerList(): Player[] {
    return Array.from(this.players.values());
  }

  isConnectionActive(connectionId: string): boolean {
    for (const connection of this.room.getConnections()) {
      if (connection.id === connectionId) {
        return true;
      }
    }

    return false;
  }

  clearNextRoundTimeout() {
    if (this.nextRoundTimeout !== null) {
      clearTimeout(this.nextRoundTimeout);
      this.nextRoundTimeout = null;
    }
  }

  scheduleNextRound() {
    this.clearNextRoundTimeout();
    this.nextRoundTimeout = setTimeout(() => {
      this.nextRoundTimeout = null;

      if (this.status === 'playing' && this.roundPhase === 'resolved') {
        this.playRound();
      }
    }, NextRoundDelay);
  }

  playRound() {
    this.clearNextRoundTimeout();
    const playerList = this.getPlayerList();

    if (playerList.length === 0) {
      this.sendRoomState();
      return;
    }

    const deck = shuffleDeck(createDeck());
    dealCardsToPlayers(playerList, deck);

    this.round += 1;
    this.dealerPlayerIndex = (this.round - 1) % playerList.length;
    this.roundPhase = 'choosing';
    this.choosingPlayerIndex = this.dealerPlayerIndex;
    this.sendRoomState();
  }

  ensureChoosingPlayerIsEligible() {
    const playerList = this.getPlayerList();
    const currentPlayer = playerList[this.choosingPlayerIndex];

    if (currentPlayer?.card && currentPlayer.choice === null) {
      return;
    }

    const nextIndex = getNextChoosingPlayerIndex(
      playerList,
      this.choosingPlayerIndex,
    );

    if (nextIndex === null) {
      this.resolveRound(playerList);
      return;
    }

    this.choosingPlayerIndex = nextIndex;
  }

  handleRoundChoice(playerId: string, choice: RoundChoice) {
    const playerList = this.getPlayerList();
    const currentPlayer = playerList[this.choosingPlayerIndex];

    if (!currentPlayer || currentPlayer.id !== playerId || !currentPlayer.card) {
      return;
    }

    currentPlayer.choice = choice;

    if (playerList.every((player) => !player.card || player.choice !== null)) {
      this.resolveRound(playerList);
      return;
    }

    const nextIndex = getNextChoosingPlayerIndex(
      playerList,
      this.choosingPlayerIndex,
    );

    if (nextIndex === null) {
      this.resolveRound(playerList);
      return;
    }

    this.choosingPlayerIndex = nextIndex;
    this.sendRoomState();
  }

  resolveRound(playerList: Player[]) {
    applyRoundScores(playerList);

    this.roundPhase = 'resolved';
    this.sendRoomState();
    this.scheduleNextRound();
  }

  buildRoomStateMessage(viewerConnectionId: string): ServerMessage {
    return {
      type: 'roomState',
      status: this.status,
      round: this.round,
      roundPhase: this.roundPhase,
      choosingPlayerIndex: this.choosingPlayerIndex,
      dealerPlayerIndex: this.dealerPlayerIndex,
      viewerPlayerId: viewerConnectionId,
      players: getPublicPlayerList(
        this.getPlayerList(),
        viewerConnectionId,
        this.roundPhase,
      ),
    };
  }

  sendRoomState(target?: Party.Connection) {
    if (target) {
      target.send(JSON.stringify(this.buildRoomStateMessage(target.id)));
      return;
    }

    for (const connection of this.room.getConnections()) {
      connection.send(JSON.stringify(this.buildRoomStateMessage(connection.id)));
    }
  }
}
