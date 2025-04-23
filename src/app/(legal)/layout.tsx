import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import  Footer  from '@/components/lp/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Credzzu | Documentos Legais',
  description: 'Documentos legais da plataforma Credzzu.',
}

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} flex min-h-screen flex-col bg-black text-white antialiased`}>
      {/* Efeito de gradiente no fundo */}
      <div className='fixed top-0 left-0 -z-10 h-full w-full'>
        <div className='absolute top-0 -z-10 h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/40 via-black to-black'></div>
      </div>

      {children}

      <Footer />
    </div>
  )
}
