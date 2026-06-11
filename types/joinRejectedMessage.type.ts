import type { JoinRejectedReason } from './joinRejectedReason.type';

export type JoinRejectedMessage = {
  type: 'joinRejected';
  reason: JoinRejectedReason;
};
