import { keyframes } from 'styled-components';

export const choicePulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 213, 79, 0.45);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(255, 213, 79, 0);
  }
`;
