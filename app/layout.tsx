import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import RegisterModal from '@/components/modals/register-modal';
import LoginModal from '@/components/modals/login-modal';
import Header from '@/components/header';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PokéTable',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <RegisterModal />
        <LoginModal />
        <Header />
        {children}
      </body>
    </html>
  )
}
