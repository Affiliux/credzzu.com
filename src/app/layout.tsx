import { Metadata, Viewport } from 'next'

import AppProviders from '@/application/contexts'

import { Toaster as Sonner } from '@/presentation/components/ui/sonner'
import { Toaster } from '@/presentation/components/ui/toaster'
import { TooltipProvider } from '@/presentation/components/ui/tooltip'

import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'dark',
  themeColor: 'black',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://credzzu.com'),
  title: 'Credzzu ©',
  description: 'Credzzu - Parceiro na hora de emprestar, e de cobrar também.',
  authors: { name: 'DustInc' },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='pt-BR'
      className='dark scroll-smooth'
      data-color-scheme='dark'
      prefers-color-scheme='dark'
      suppressHydrationWarning
    >
      <body className={`h-full min-h-screen w-screen overflow-x-hidden bg-black antialiased`} suppressHydrationWarning>
        <TooltipProvider>
          <AppProviders>{children}</AppProviders>

          <Toaster />
          <Sonner />
        </TooltipProvider>
      </body>
    </html>
  )
}
