import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import getCurrentUser from '@/actions/get-current-user';
import RegisterModal from '@/components/modals/register-modal';
import LoginModal from '@/components/modals/login-modal';
import CreatePokemonModal from '@/components/modals/create-pokemon-modal';
import Header from '@/components/header';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PokéTable',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <RegisterModal />
        <LoginModal />
        <CreatePokemonModal />
        <Header currentUser={currentUser} />
        <main className="container min-h-screen pb-10">
          {children}
        </main>
      </body>
    </html>
  )
}
