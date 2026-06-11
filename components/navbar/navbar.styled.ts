import Link from 'next/link';
import styled from 'styled-components';

import { Card } from '@/components';

export const Container = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background:
    radial-gradient(ellipse 60% 100% at 50% 0%, rgba(102, 187, 106, 0.12) 0%, transparent 70%),
    rgba(31, 48, 42, 0.82);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-block-end: 1px solid rgba(102, 187, 106, 0.2);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  max-width: 42rem;
  margin-inline: auto;
  padding: 0.875rem 1rem;
`;

export const Title = styled(Link)`
  font-size: clamp(2rem, 8vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-decoration: none;
  background: linear-gradient(180deg, #fff 0%, rgba(254, 254, 254, 0.75) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &:hover {
    opacity: 0.9;
  }
`;

export const CardFan = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  transform: scale(0.7);
  position: relative;
  bottom: 5px;
`;

export const StyledCard = styled(Card)`
  &:nth-of-type(1) {
    transform: rotate(-12deg) translateY(0.25rem);
    z-index: 1;
  }

  &:nth-of-type(2) {
    transform: rotate(12deg) translateY(0.25rem);
    z-index: 2;
    margin-inline: -0.75rem;
  }

  &:nth-of-type(3) {
    transform: rotate(12deg) translateY(0.25rem);
    z-index: 1;
  }
`;
