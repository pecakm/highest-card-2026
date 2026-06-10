import styled from 'styled-components';

import { Color, tableSurface } from '@/ui';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 42rem;
  margin-inline: auto;
  padding: 1.5rem 1rem 2.5rem;
`;

export const ErrorMessage = styled.p`
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${Color.ErrorBorder};
  background: ${Color.ErrorBg};
  color: ${Color.Error};
  text-align: center;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.4;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  ${tableSurface}
`;
