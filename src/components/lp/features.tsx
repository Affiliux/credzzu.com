'use client'

import React from 'react'

import { BarChart3, Bell, CreditCard, DollarSign, LayoutDashboard, Users } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

export default function Features() {
  return (
    <section id='features' className='relative w-full overflow-hidden bg-black py-16 md:py-24 lg:py-32'>
      {/* Background Elements */}
      <div className='absolute top-0 left-0 h-full w-full'>
        <div className='absolute -top-40 -left-40 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl'></div>
        <div className='absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl'></div>

        {/* Estrelas cintilantes */}
        <div className='absolute top-20 right-1/4 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute top-1/3 left-1/5 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute right-1/3 bottom-1/4 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute top-1/2 right-24 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute bottom-20 left-1/4 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_8px_4px_rgba(16,185,129,0.2)]'></div>
      </div>

      {/* Gradiente inferior para transição suave */}
      <div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black to-transparent'></div>

      <div className='relative container mx-auto px-3 sm:px-6'>
        <div className='mx-auto mb-12 flex max-w-3xl flex-col items-center text-center md:mb-16'>
          <Badge
            variant='outline'
            className='border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-xs font-medium tracking-wider text-emerald-400 uppercase'
          >
            Recursos
          </Badge>
          <h2 className='mt-5 text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl'>
            Tudo que você precisa <span className='font-bold'>para gerenciar dívidas</span>
          </h2>
          <p className='mt-4 max-w-2xl text-base text-white/60 md:mt-6 md:text-lg'>
            Credzzu facilita o rastreamento, lembretes e cobrança de dinheiro devido por conhecidos, amigos e
            familiares.
          </p>
        </div>

        <div className='mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3'>
          {[
            {
              icon: <Users className='h-6 w-6 md:h-8 md:w-8' />,
              title: 'Controle de Devedores',
              description:
                'Gerencie facilmente todos os seus devedores em um só lugar, com informações detalhadas e histórico completo.',
            },
            {
              icon: <CreditCard className='h-6 w-6 md:h-8 md:w-8' />,
              title: 'Controle de Dívidas',
              description: 'Acompanhe todas as dívidas, prazos e status de pagamento de forma organizada e eficiente.',
            },
            {
              icon: <DollarSign className='h-6 w-6 md:h-8 md:w-8' />,
              title: 'Taxas em Dívidas',
              description: 'Calcule automaticamente juros e multas por atraso, mantendo os valores sempre atualizados.',
            },
            {
              icon: <Bell className='h-6 w-6 md:h-8 md:w-8' />,
              title: 'Notificações Inteligentes',
              description: 'Receba lembretes automáticos via WhatsApp e email para não perder nenhum pagamento.',
            },
            {
              icon: <BarChart3 className='h-6 w-6 md:h-8 md:w-8' />,
              title: 'Relatórios Avançados',
              description: 'Visualize estatísticas detalhadas e insights sobre suas cobranças e recebimentos.',
            },
            {
              icon: <LayoutDashboard className='h-6 w-6 md:h-8 md:w-8' />,
              title: 'Painel Fácil',
              description: 'Interface intuitiva e simples de usar, tornando o gerenciamento de dívidas mais prático.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className='group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-px transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_0_2rem_-0.5rem_rgba(16,185,129,0.2)]'
            >
              <div className='relative h-full rounded-2xl p-6 backdrop-blur-sm md:p-8'>
                <div className='flex flex-col items-center space-y-4 text-center md:space-y-6'>
                  <div className='flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20 transition-all duration-300 group-hover:bg-emerald-500/20 group-hover:ring-emerald-500/40 md:h-16 md:w-16'>
                    {React.cloneElement(feature.icon, { className: 'h-6 w-6 md:h-8 md:w-8 text-emerald-400' })}
                  </div>
                  <div className='space-y-2 text-center md:space-y-3'>
                    <h3 className='text-lg font-light text-white sm:text-xl md:text-2xl'>{feature.title}</h3>
                    <p className='mx-auto text-sm text-white/60 md:text-base'>{feature.description}</p>
                  </div>
                </div>

                {/* Subtle gradient on hover */}
                <div className='absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-emerald-500/0 to-emerald-500/0 opacity-0 transition-all duration-500 group-hover:from-emerald-500/[0.03] group-hover:to-transparent group-hover:opacity-100'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
