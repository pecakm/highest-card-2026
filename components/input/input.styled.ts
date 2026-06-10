import styled from 'styled-components';
import { TextField } from '@mui/material';

import { Color } from '@/ui';

export const Container = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      border-radius: 0.75rem;
      background: rgba(255, 255, 255, 0.16);
      color: #fefefe;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;

      fieldset {
        border-color: rgba(255, 255, 255, 0.32);
        transition: border-color 0.2s ease;
      }

      &:hover fieldset {
        border-color: rgba(255, 255, 255, 0.5);
      }

      &.Mui-focused fieldset {
        border-color: rgba(165, 214, 167, 0.95);
        border-width: 1px;
      }

      &.Mui-focused {
        box-shadow: 0 0 0 3px rgba(165, 214, 167, 0.3);
      }

      &.Mui-error fieldset {
        border-color: rgba(255, 138, 128, 0.9);
      }

      &.Mui-error.Mui-focused {
        box-shadow: 0 0 0 3px rgba(255, 138, 128, 0.3);
      }

      input {
        padding: 0.875rem 1rem;
        font-size: 1rem;
        font-weight: 500;

        &::placeholder {
          color: rgba(254, 254, 254, 0.72);
          opacity: 1;
        }
      }
    }

    .MuiInputLabel-root {
      color: rgba(254, 254, 254, 0.85);

      &.Mui-focused {
        color: #c8e6c9;
      }

      &.Mui-error {
        color: ${Color.Error};
      }
    }

    .MuiFormHelperText-root {
      margin-inline: 0.25rem;
      margin-block-start: 0.375rem;
      font-size: 0.8125rem;
      color: rgba(254, 254, 254, 0.85);

      &.Mui-error {
        color: ${Color.Error};
      }
    }
  }
`;
