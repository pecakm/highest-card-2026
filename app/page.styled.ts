import styled from 'styled-components';

import { Color } from '@/ui';

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
