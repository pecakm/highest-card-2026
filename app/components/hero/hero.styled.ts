import styled from 'styled-components';

import { Card } from '@/components';

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
  padding-block: 0.5rem 0.25rem;
`;

export const Tagline = styled.p`
  max-width: 28rem;
  font-size: 1.0625rem;
  line-height: 1.5;
  color: rgba(254, 254, 254, 0.7);
`;

export const CardFan = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  margin-block: 0.75rem 0.25rem;
  padding-block: 0.5rem;
`;

export const StyledCard = styled(Card)`
  &:nth-of-type(1) {
    transform: rotate(-12deg) translateY(0.25rem);
    z-index: 1;
  }

  &:nth-of-type(2) {
    transform: translateY(-0.35rem);
    z-index: 2;
    margin-inline: -0.75rem;
  }

  &:nth-of-type(3) {
    transform: rotate(12deg) translateY(0.25rem);
    z-index: 1;
  }
`;
