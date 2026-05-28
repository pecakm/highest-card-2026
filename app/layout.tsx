import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeProvider } from '@mui/material/styles';

import { StyledComponentsRegistry } from '@/lib/styled-components';
import { theme } from '@/lib/mui';

import './global.css';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Highest Card',
  description: 'Find the highest card in a deck of cards',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.className}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <StyledComponentsRegistry>
              {children}
            </StyledComponentsRegistry>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
