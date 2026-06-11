import { ChangeEvent, FocusEvent } from 'react';

export interface InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  id?: string;
  name?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  className?: string;
}
