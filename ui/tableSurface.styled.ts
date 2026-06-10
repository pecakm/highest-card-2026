import { css } from 'styled-components';

export const tableSurface = css`
  padding: 1.5rem 1rem 1.75rem;
  border-radius: 1.5rem;
  background:
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(76, 175, 80, 0.12) 0%, transparent 70%),
    linear-gradient(165deg, #1e5c38 0%, #143d26 45%, #0f2d1c 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    inset 0 2px 12px rgba(0, 0, 0, 0.35),
    0 8px 32px rgba(0, 0, 0, 0.35);
`;
