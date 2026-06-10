import { ButtonProps } from './button.types';
import { Container } from './button.styled';

export default function Button({
  children,
  className,
  onClick,
  type = 'button',
  disabled,
  variant = 'primary',
}: ButtonProps) {
  return (
    <Container
      className={className}
      $variant={variant}
      variant="contained"
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Container>
  );
}
