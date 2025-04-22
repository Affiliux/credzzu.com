import type { Metadata } from 'next'

import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

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

      {/* Footer comum para todas as páginas legais */}
      <footer className='mt-auto w-full border-t border-white/10 bg-black py-6'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0'>
            <div className='flex items-center gap-2'>
              <Image src='/logo.png' alt='Credzzu Logo' width={120} height={120} className='h-6 w-auto' />
              <p className='text-sm font-light text-white/80'>
                © {new Date().getFullYear()} Credzzu. Todos os direitos reservados.
              </p>
            </div>

            <div className='flex flex-wrap items-center gap-x-8'>
              <nav className='flex flex-wrap gap-6 text-xs font-light'>
                <Link href='/terms' className='text-white/60 transition-colors hover:text-white'>
                  Termos de Uso
                </Link>
                <Link href='/privacy' className='text-white/60 transition-colors hover:text-white'>
                  Política de Privacidade
                </Link>
                <Link href='/' className='text-white/60 transition-colors hover:text-white'>
                  Página Inicial
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
