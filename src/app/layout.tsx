import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import ModalProvider from '@/providers/ModalProvider';
import { Toaster } from '@/components/ui/sonner';
import Player from '@/components/Player';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Beat Store',
  description: 'Shop With The Wave',
};

export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider />
              <Sidebar>{children}</Sidebar>
              <Player />
              <Toaster />
            </UserProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
