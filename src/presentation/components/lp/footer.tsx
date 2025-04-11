import { DollarSign } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='w-full border-t py-6'>
      <div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:gap-0'>
        <div className='flex items-center gap-2 text-center md:text-left'>
          <DollarSign className='h-5 w-5 text-emerald-500' />
          <p className='text-sm font-medium'>© {new Date().getFullYear()} Credzzu. All rights reserved.</p>
        </div>
        <nav className='flex flex-wrap justify-center gap-4 text-sm sm:gap-6'>
          <Link href='#' className='text-muted-foreground hover:text-foreground font-medium transition-colors'>
            Terms
          </Link>
          <Link href='#' className='text-muted-foreground hover:text-foreground font-medium transition-colors'>
            Privacy
          </Link>
          <Link href='#' className='text-muted-foreground hover:text-foreground font-medium transition-colors'>
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
