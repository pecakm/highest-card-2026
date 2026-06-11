import { useTranslations } from 'next-intl';

import { NavbarProps } from './navbar.types';
import { Container, Inner, Title } from './navbar.styled';

export default function Navbar({ className }: NavbarProps) {
  const t = useTranslations('Navbar');

  return (
    <Container className={className}>
      <Inner>
        <Title>{t('title')}</Title>
      </Inner>
    </Container>
  );
}
