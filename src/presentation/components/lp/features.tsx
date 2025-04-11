import { CreditCard, DollarSign, Users } from 'lucide-react'

export default function Features() {
  return (
    <section id='features' className='bg-muted/40 w-full py-12 md:py-20 lg:py-32'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center justify-center space-y-6 text-center'>
          <div className='space-y-3'>
            <div className='inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700'>Features</div>
            <h2 className='text-3xl leading-tight font-bold tracking-tight sm:text-4xl md:text-5xl'>
              Everything you need to manage IOUs
            </h2>
            <p className='text-muted-foreground mx-auto max-w-3xl text-base sm:text-lg md:text-xl'>
              Credzzu makes it easy to track, remind, and collect money owed by friends and family.
            </p>
          </div>
        </div>
        <div className='mx-auto grid max-w-5xl gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3'>
          {[
            {
              icon: <Users className='h-6 w-6 text-emerald-600' />,
              title: 'Friend Management',
              description: 'Easily add friends and track who owes you what, when, and why.',
            },
            {
              icon: <CreditCard className='h-6 w-6 text-emerald-600' />,
              title: 'Payment Collection',
              description: 'Send payment requests and collect money through multiple payment methods.',
            },
            {
              icon: <DollarSign className='h-6 w-6 text-emerald-600' />,
              title: 'Debt Tracking',
              description: 'Get a clear overview of all outstanding debts and payment history.',
            },
          ].map(({ icon, title, description }, index) => (
            <div
              key={index}
              className='bg-background flex flex-col justify-center space-y-4 rounded-lg border p-6 text-center shadow-sm sm:text-left'
            >
              <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 sm:mx-0'>
                {icon}
              </div>
              <div className='space-y-2'>
                <h3 className='text-lg font-bold sm:text-xl'>{title}</h3>
                <p className='text-muted-foreground text-sm sm:text-base'>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
