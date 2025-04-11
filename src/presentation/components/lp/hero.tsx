import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/presentation/components/ui/button'

export default function Hero() {
  return (
    <section className='w-full py-12 md:py-20 lg:py-32 xl:py-48'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid items-center gap-10 lg:grid-cols-2'>
          <div className='flex flex-col justify-center space-y-6'>
            <div className='space-y-4'>
              <h1 className='text-3xl leading-tight font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'>
                Track who owes you money, collect it with ease
              </h1>
              <p className='text-muted-foreground max-w-xl text-base sm:text-lg md:text-xl'>
                Credzzu helps you keep track of money owed by friends and makes collecting it simple and stress-free.
              </p>
            </div>
            <div className='flex flex-col gap-3 sm:flex-row'>
              <Button asChild size='lg' className='w-full sm:w-auto'>
                <Link href='/signup'>
                  Get Started
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
              <Button variant='outline' size='lg' className='w-full sm:w-auto'>
                <Link href='#how-it-works'>Learn More</Link>
              </Button>
            </div>
          </div>
          <div className='flex justify-center'>
            <Image
              src='/placeholder.svg?height=550&width=550'
              width={550}
              height={550}
              alt='Dashboard Preview'
              className='aspect-square w-full max-w-sm rounded-xl object-cover sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
