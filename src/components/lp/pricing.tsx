import { AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function Pricing() {
  return (
    <section id='pricing' className='relative w-full overflow-hidden bg-black py-16 md:py-24 lg:py-32'>
      {/* Background Elements */}
      <div className='absolute top-0 left-0 h-full w-full'>
        <div className='absolute -top-40 -left-40 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl'></div>
        <div className='absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl'></div>

        {/* Estrelas cintilantes */}
        <div className='absolute top-32 right-1/3 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute top-1/4 left-1/3 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute right-1/5 bottom-1/3 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute top-1/2 left-24 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute bottom-36 left-1/3 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_8px_4px_rgba(16,185,129,0.2)]'></div>
        <div className='absolute right-32 bottom-20 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_8px_4px_rgba(16,185,129,0.2)]'></div>
      </div>

      {/* Gradiente superior para transição suave com Features */}
      <div className='absolute top-0 left-0 h-24 w-full bg-gradient-to-b from-black to-transparent'></div>

      {/* Gradiente inferior para transição suave com CTA */}
      <div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black to-transparent'></div>

      <div className='relative container mx-auto px-3 sm:px-6'>
        <div className='mx-auto mb-12 flex max-w-3xl flex-col items-center text-center md:mb-16'>
          <Badge
            variant='outline'
            className='border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-xs font-medium tracking-wider text-emerald-400 uppercase'
          >
            Preços
          </Badge>
          <h2 className='mt-5 text-6xl font-light tracking-tight text-white'>
            Escolha um plano <span className='font-medium'>perfeito para você</span>
          </h2>
          <p className='mt-4 max-w-2xl text-base text-white/60 md:mt-6 md:text-lg'>
            Comece com nosso plano mensal ou economize com o plano anual
          </p>
        </div>

        <div className='mx-auto grid max-w-screen-lg gap-6 md:grid-cols-2 md:gap-8'>
          {/* Monthly Plan */}
          <div className='group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-px transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_0_2rem_-0.5rem_rgba(16,185,129,0.2)]'>
            <div className='relative h-full rounded-2xl backdrop-blur-sm'>
              {/* Card Content */}
              <div className='flex h-full flex-col p-6 md:p-8'>
                <div className='mb-6 md:mb-8'>
                  <h3 className='text-lg font-light tracking-wide text-white md:text-xl'>Plano Mensal</h3>
                  <div className='mt-3 flex items-end md:mt-4'>
                    <span className='text-4xl font-extralight text-white md:text-5xl'>R$100</span>
                    <span className='ml-2 text-base text-white/40 md:text-lg'>/mês</span>
                  </div>
                  <p className='mt-2 text-xs text-white/50 md:text-sm'>Para todas as necessidades</p>
                </div>

                <div className='mb-6 space-y-4 md:mb-8 md:space-y-5'>
                  <div className='h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent'></div>

                  <div className='space-y-3 md:space-y-4'>
                    <h4 className='text-xs font-medium tracking-wider text-white/80 uppercase md:text-sm'>
                      Recursos incluídos
                    </h4>
                    <ul className='space-y-2 text-xs md:space-y-3 md:text-sm'>
                      <li className='flex items-start'>
                        <CheckCircle className='mr-3 h-4 w-4 shrink-0 text-emerald-400 md:h-5 md:w-5' />
                        <span className='text-white/80'>Acompanhe credores ilimitados</span>
                      </li>
                      <li className='flex items-start'>
                        <CheckCircle className='mr-3 h-4 w-4 shrink-0 text-emerald-400 md:h-5 md:w-5' />
                        <span className='text-white/80'>Acompanhamento completo de dívidas</span>
                      </li>
                      <li className='flex items-start'>
                        <CheckCircle className='mr-3 h-4 w-4 shrink-0 text-emerald-400 md:h-5 md:w-5' />
                        <span className='text-white/80'>Registro manual de pagamentos</span>
                      </li>
                      <li className='flex items-start'>
                        <CheckCircle className='mr-3 h-4 w-4 shrink-0 text-emerald-400 md:h-5 md:w-5' />
                        <span className='text-white/80'>Lembretes automáticos de pagamento</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='mt-auto'>
                  <Button
                    className='group relative w-full overflow-hidden border border-white/20 bg-transparent py-2.5 text-sm text-white transition-all duration-300 hover:border-white/30 hover:bg-white/5 md:py-3 md:text-base'
                    asChild
                  >
                    <Link href='/signup' className='flex items-center justify-center'>
                      <span className='z-10'>Começar Grátis</span>
                      <span className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-500 group-hover:translate-x-full group-hover:opacity-100'></span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Annual Plan */}
          <div className='group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/[0.08] to-transparent p-px transition-all duration-500 hover:shadow-[0_0_3rem_-0.5rem_rgba(16,185,129,0.4)]'>
            <div className='absolute -top-20 -right-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl'></div>
            <div className='absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl'></div>

            <div className='relative h-full rounded-2xl backdrop-blur-sm'>
              {/* Popular Badge */}
              <div className='absolute top-6 -right-10 rotate-45 bg-emerald-500 px-10 py-1 text-xs font-medium text-white shadow-lg md:-right-12 md:px-12'>
                PREMIUM
              </div>

              {/* Card Content */}
              <div className='flex h-full flex-col p-6 md:p-8'>
                <div className='mb-6 md:mb-8'>
                  <h3 className='text-lg font-light tracking-wide text-white md:text-xl'>Plano Anual</h3>
                  <div className='mt-3 flex items-end md:mt-4'>
                    <span className='text-4xl font-extralight text-white md:text-5xl'>R$1000</span>
                    <span className='ml-2 text-base text-white/40 md:text-lg'>/uma vez</span>
                  </div>
                  <p className='mt-2 text-xs text-emerald-400 md:text-sm'>Economize R$200 no pagamento anual</p>
                </div>

                <div className='mb-6 space-y-4 md:mb-8 md:space-y-5'>
                  <div className='h-px w-full bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent'></div>

                  <div className='space-y-3 md:space-y-4'>
                    <h4 className='text-xs font-medium tracking-wider text-white/80 uppercase md:text-sm'>
                      Todos os recursos do plano mensal, mais:
                    </h4>
                    <ul className='space-y-2 text-xs md:space-y-3 md:text-sm'>
                      <li className='flex items-start'>
                        <CheckCircle className='mr-3 h-4 w-4 shrink-0 text-emerald-400 md:h-5 md:w-5' />
                        <span className='text-white/80'>Suporte Prioritário</span>
                      </li>
                      <li className='flex items-start'>
                        <CheckCircle className='mr-3 h-4 w-4 shrink-0 text-emerald-400 md:h-5 md:w-5' />
                        <span className='text-white/80'>Análises avançadas</span>
                      </li>
                      <li className='flex items-start'>
                        <CheckCircle className='mr-3 h-4 w-4 shrink-0 text-emerald-400 md:h-5 md:w-5' />
                        <span className='text-white/80'>Desconto na assinatura</span>
                      </li>
                      <li className='flex items-start'>
                        <CheckCircle className='mr-3 h-4 w-4 shrink-0 text-emerald-400 md:h-5 md:w-5' />
                        <span className='text-white/80'>Cancelamento sem taxas a qualquer momento</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='mt-auto'>
                  <Button
                    className='group relative w-full overflow-hidden border-0 bg-emerald-500 py-2.5 text-sm text-white shadow-[0_0_1rem_rgba(16,185,129,0.3)] transition-all duration-300 hover:bg-emerald-600 hover:shadow-[0_0_2rem_rgba(16,185,129,0.5)] md:py-3 md:text-base'
                    asChild
                  >
                    <Link href='/signup' className='flex items-center justify-center'>
                      <span className='z-10'>Assinar Premium</span>
                      <span className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-500 group-hover:translate-x-full group-hover:opacity-100'></span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-12 flex justify-center md:mt-16'>
          <p className='max-w-md text-center text-xs text-white/40 md:text-sm'>
            Todos os planos incluem suporte via whatsapp e acesso ao sistema.
            <span className='mx-1.5 inline-block h-1 w-1 rounded-full bg-white/20'></span>
            Cancele a qualquer momento sem taxas adicionais.
          </p>
        </div>
      </div>
    </section>
  )
}
