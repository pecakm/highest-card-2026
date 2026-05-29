import { ButtonProps } from './button.types';
import { Container } from './button.styled';

export default function Button({ children, className, onClick }: ButtonProps) {
  return (
    <Container
      className={className}
      variant="contained"
      onClick={onClick}
    >
      {children}
    </Container>
  );
}
