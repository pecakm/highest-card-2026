import { ButtonProps } from './button.types';
import { Container } from './button.styled';

export default function Button({ children, className }: ButtonProps) {
  return (
    <Container className={className} variant="contained">
      {children}
    </Container>
  );
}
