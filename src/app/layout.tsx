'use client';
import Navbar from '@/components/Navbar';
import { DataContext } from '@/context/context';
import { Contact } from '@/models/contact';
import { Container } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Inter } from 'next/font/google';
import React, { useState } from 'react';
import theme from '../theme';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [contacts, setContacts] = useState<Contact[]>([]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <DataContext.Provider
              value={{
                contacts,
                setContacts,
              }}
            >
              <Container maxWidth="xl">
                <Navbar />
                {children}
              </Container>
            </DataContext.Provider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
