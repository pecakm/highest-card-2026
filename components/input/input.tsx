import { InputProps } from './input.types';
import { Container } from './input.styled';

export default function Input({ className, value, onChange, placeholder }: InputProps) {
  return (
    <Container
      className={className}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
