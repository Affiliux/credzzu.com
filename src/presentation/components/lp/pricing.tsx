import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/presentation/components/ui/button'

export default function Pricing() {
  return (
    <section id='pricing' className='bg-muted/40 w-full py-12 md:py-24 lg:py-32'>
      <div className='container px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <div className='inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700'>Pricing</div>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl/tight'>Simple, transparent pricing</h2>
            <p className='text-muted-foreground max-w-[900px] text-base sm:text-lg lg:text-base xl:text-xl'>
              Start for free, upgrade when you need more features.
            </p>
          </div>
        </div>

        <div className='mx-auto grid max-w-5xl gap-6 py-12 sm:grid-cols-1 md:grid-cols-2'>
          {/* Free Plan */}
          <div className='bg-background flex flex-col justify-between rounded-lg border p-6 shadow-sm'>
            <div>
              <h3 className='text-2xl font-bold'>Free</h3>
              <div className='mt-4 text-4xl font-bold'>$0</div>
              <p className='text-muted-foreground mt-1 text-sm'>Forever free</p>
              <ul className='mt-6 space-y-2 text-left'>
                <li className='flex items-center'>
                  <CheckCircle className='mr-2 h-4 w-4 text-emerald-500' />
                  Track up to 5 friends
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='mr-2 h-4 w-4 text-emerald-500' />
                  Basic debt tracking
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='mr-2 h-4 w-4 text-emerald-500' />
                  Manual payment recording
                </li>
              </ul>
            </div>
            <Button className='mt-6 w-full sm:w-auto' variant='outline' asChild>
              <Link href='/signup'>Get Started</Link>
            </Button>
          </div>

          {/* Premium Plan */}
          <div className='bg-background flex flex-col justify-between rounded-lg border p-6 shadow-sm'>
            <div>
              <h3 className='text-2xl font-bold'>Premium</h3>
              <div className='mt-4 text-4xl font-bold'>$5</div>
              <p className='text-muted-foreground mt-1 text-sm'>Per month</p>
              <ul className='mt-6 space-y-2 text-left'>
                <li className='flex items-center'>
                  <CheckCircle className='mr-2 h-4 w-4 text-emerald-500' />
                  Unlimited friends
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='mr-2 h-4 w-4 text-emerald-500' />
                  Automatic payment reminders
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='mr-2 h-4 w-4 text-emerald-500' />
                  Direct payment collection
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='mr-2 h-4 w-4 text-emerald-500' />
                  Advanced analytics
                </li>
              </ul>
            </div>
            <Button className='mt-6 w-full sm:w-auto' asChild>
              <Link href='/signup'>Get Premium</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
