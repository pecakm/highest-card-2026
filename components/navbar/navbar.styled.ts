import styled from 'styled-components';

export const Container = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background:
    radial-gradient(ellipse 60% 100% at 50% 0%, rgba(76, 175, 80, 0.08) 0%, transparent 70%),
    rgba(51, 51, 51, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-block-end: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 42rem;
  margin-inline: auto;
  padding: 0.875rem 1rem;
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
