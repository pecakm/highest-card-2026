import { InputProps } from './input.types';
import { Container } from './input.styled';

export default function Input({
  className,
  value,
  onChange,
  onBlur,
  placeholder,
  id,
  name,
  label,
  error,
  helperText,
}: InputProps) {
  return (
    <Container
      className={className}
      id={id}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      fullWidth
    />
  );
}
