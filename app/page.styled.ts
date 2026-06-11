import styled from 'styled-components';

import { Color } from '@/ui';

export const Hero = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
  padding-block: 0.5rem 0.25rem;
`;

export const Title = styled.h1`
  font-size: clamp(2rem, 8vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  background: linear-gradient(180deg, #fff 0%, rgba(254, 254, 254, 0.75) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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

  & > *:nth-child(1) {
    transform: rotate(-12deg) translateY(0.25rem);
    z-index: 1;
  }

  & > *:nth-child(2) {
    transform: translateY(-0.35rem);
    z-index: 2;
    margin-inline: -0.75rem;
  }

  & > *:nth-child(3) {
    transform: rotate(12deg) translateY(0.25rem);
    z-index: 1;
  }
`;

export const HowToPlaySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-block-start: 1.25rem;
  padding-block-start: 1.5rem;
  border-block-start: 1px solid rgba(255, 255, 255, 0.08);
`;

export const StepList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const StepItem = styled.li`
  display: flex;
  gap: 0.875rem;
  align-items: flex-start;
`;

export const StepNumber = styled.span`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 700;
  color: ${Color.Success};
  background: ${Color.SuccessBg};
  border: 1px solid ${Color.SuccessBorder};
`;

export const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-block-start: 0.1rem;
`;

export const StepTitle = styled.h3`
  font-size: 0.9375rem;
  font-weight: 700;
  color: rgba(254, 254, 254, 0.95);
`;

export const StepDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(254, 254, 254, 0.62);
`;

export const ScoringNote = styled.p`
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${Color.InfoBorder};
  background: ${Color.InfoBg};
  color: ${Color.Info};
  font-size: 0.875rem;
  line-height: 1.5;
`;

export const CtaDescription = styled.p`
  font-size: 0.9375rem;
  line-height: 1.5;
  color: rgba(254, 254, 254, 0.7);
  text-align: center;
`;

export const CtaActions = styled.div`
  display: flex;
  justify-content: center;
  margin-block-start: 0.25rem;
`;
