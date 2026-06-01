import { ButtonProps } from './button.types';
import { Container } from './button.styled';

export default function Button({
  children,
  className,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  return (
    <Container
      className={className}
      variant="contained"
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Container>
  );
}
