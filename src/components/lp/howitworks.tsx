import { Badge } from '@/components/ui/badge'

export default function HowItWorks() {
  return (
    <section id='how-it-works' className='relative w-full overflow-hidden bg-black py-16 md:py-24 lg:pt-48 lg:pb-12'>
      {/* Background Elements */}
      <div className='absolute top-0 left-0 h-full w-full'>
        <div className='absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl'></div>

        {/* Estrelas cintilantes */}
        <div className='absolute top-24 left-1/4 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute top-1/2 right-1/5 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute bottom-1/4 left-1/3 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute top-32 right-32 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute right-1/4 bottom-40 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_8px_4px_rgba(16,185,129,0.2)]'></div>
      </div>

      {/* Gradiente de contraste para o título */}
      <div className='absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-500/30 via-emerald-500/15 to-transparent blur-3xl'></div>

      <div className='relative container mx-auto px-3 sm:px-6'>
        <div className='mx-auto mb-12 flex max-w-3xl flex-col items-center text-center md:mb-16'>
          <Badge
            variant='outline'
            className='border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-xs font-medium tracking-wider text-emerald-400 uppercase'
          >
            Como Funciona
          </Badge>
          <h2 className='mt-5 bg-gradient-to-r from-white to-white/70 bg-clip-text text-3xl font-light tracking-tight text-transparent sm:text-4xl md:mt-6 md:text-5xl lg:text-6xl'>
            Passos simples para <span className='font-medium'>recuperar seu dinheiro</span>
          </h2>
          <p className='mt-4 max-w-2xl text-base text-white/60 md:mt-6 md:text-lg'>
            O Credzzu torna o processo desconfortável de pedir seu dinheiro de volta simples e direto.
          </p>
        </div>

        <div className='mx-auto grid max-w-5xl gap-6 md:gap-6 md:gap-8 lg:grid-cols-3'>
          {[
            {
              step: '1',
              title: 'Adicionar uma dívida',
              description: 'Registre quem deve, quanto deve e quando deve ser pago.',
            },
            {
              step: '2',
              title: 'Enviaremos uma mensagem para o devedor',
              description: 'Enviaremos uma mensagem para o devedor avisando que você está esperando o pagamento.',
            },
            {
              step: '3',
              title: 'Receber o pagamento',
              description: 'Receba pagamentos diretamente do devedor.',
            },
          ].map((item, index) => (
            <div
              key={item.step}
              className='group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-px transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_0_2rem_-0.5rem_rgba(16,185,129,0.2)]'
            >
              <div className='relative h-full rounded-2xl p-6 backdrop-blur-sm md:p-8'>
                <div className='flex flex-col items-center space-y-4 text-center md:space-y-6'>
                  <div className='flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20 transition-all duration-300 group-hover:bg-emerald-500/20 group-hover:ring-emerald-500/40 md:h-20 md:w-20'>
                    <span className='text-2xl font-light md:text-3xl'>{item.step}</span>
                  </div>
                  <div className='space-y-2 text-center md:space-y-3'>
                    <h3 className='text-xl font-light text-white sm:text-2xl md:text-3xl'>{item.title}</h3>
                    <p className='mx-auto text-sm text-white/60 md:text-base'>{item.description}</p>
                  </div>
                </div>

                {/* Subtle line connector for desktop */}
                {index < 2 && (
                  <div className='absolute top-[4.8rem] -right-5 hidden h-px w-10 bg-gradient-to-r from-emerald-500/40 to-transparent lg:block'></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
