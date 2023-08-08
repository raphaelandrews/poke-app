import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs'

import CreatePokemonModal from '@/components/modals/create-pokemon-modal';
import Header from '@/components/header';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Poké App',
  description: 'Pokémon App',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          <CreatePokemonModal />
          <Header />
          <main className="container min-h-screen pb-10">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
