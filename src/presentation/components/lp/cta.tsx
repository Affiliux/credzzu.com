import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/presentation/components/ui/button'

export default function CTA() {
  return (
    <section className='w-full border-t py-12 md:py-24 lg:py-32'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              Ready to collect whats yours?
            </h2>
            <p className='text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              Join thousands of users who have successfully collected over $1 million in owed money.
            </p>
          </div>
          <div className='flex flex-col gap-2 min-[400px]:flex-row'>
            <Button asChild size='lg'>
              <Link href='/signup'>
                Get Started for Free
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
