import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 42rem;
  margin-inline: auto;
  padding: 1.5rem 1rem 2.5rem;
`;

export const Title = styled.h1`
  font-size: clamp(1.125rem, 4vw, 1.375rem);
  font-weight: 600;
  color: rgba(254, 254, 254, 0.75);
  text-align: center;
  letter-spacing: 0.02em;
`;
