export function getPlayerNameSessionKey(roomId: string): string {
  return `room:${roomId}:playerName`;
}
