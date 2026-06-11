import Link from 'next/link';
import styled from 'styled-components';

export const InviteSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-block-start: 1.25rem;
  padding-block-start: 1.5rem;
  border-block-start: 1px solid rgba(255, 255, 255, 0.08);
`;

export const JoinPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export const QrCode = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
`;

export const JoinUrlRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  text-align: center;
  width: 100%;
`;

export const JoinUrlLabel = styled.span`
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(254, 254, 254, 0.45);
`;

export const JoinUrlLink = styled(Link)`
  font-size: 0.8125rem;
  color: rgba(254, 254, 254, 0.85);
  word-break: break-all;
  text-decoration: underline;
  text-underline-offset: 0.15em;

  &:hover {
    color: #fff;
  }
`;
