export default function HowItWorks() {
  return (
    <section id='how-it-works' className='w-full py-12 md:py-20 lg:py-32'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center justify-center space-y-6 text-center'>
          <div className='space-y-3'>
            <div className='inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700'>
              How It Works
            </div>
            <h2 className='text-3xl leading-tight font-bold tracking-tight sm:text-4xl md:text-5xl'>
              Simple steps to get your money back
            </h2>
            <p className='text-muted-foreground mx-auto max-w-3xl text-base sm:text-lg md:text-xl'>
              Credzzu makes the awkward process of asking for your money back simple and straightforward.
            </p>
          </div>
        </div>
        <div className='mx-auto grid max-w-5xl gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3'>
          {[
            {
              step: '1',
              title: 'Add a debt',
              description: 'Enter who owes you, how much, and what it was for.',
            },
            {
              step: '2',
              title: 'Send a reminder',
              description: 'Automatically send friendly reminders when payments are due.',
            },
            {
              step: '3',
              title: 'Get paid',
              description: 'Collect payments directly through the app with your preferred method.',
            },
          ].map(({ step, title, description }) => (
            <div key={step} className='flex flex-col items-center space-y-4 text-center'>
              <div className='flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-900'>
                <span className='text-xl font-bold'>{step}</span>
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
