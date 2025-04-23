'use client'

import React from 'react'

import { Bell, MessageCircle } from 'lucide-react'
import Image from 'next/image'

import { Badge } from '../ui/badge'

export default function Notifications() {
  return (
    <section id='notifications' className='relative w-full overflow-hidden bg-black py-16 md:py-24'>
      {/* Background Elements */}
      <div className='absolute top-0 left-0 h-full w-full'>
        <div className='absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl'></div>

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
            Notificações
          </Badge>
          <h2 className='mt-5 text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl'>
            Mantenha todos <span className='font-bold'>sempre informados</span>
          </h2>
          <p className='mt-4 max-w-2xl text-base text-white/60 md:mt-6 md:text-lg'>
            Sistema inteligente de notificações que mantém a comunicação eficiente e profissional com seus devedores.
          </p>
        </div>

        <div className='flex flex-col items-center justify-center gap-16 lg:flex-row xl:gap-32'>
          <div className='relative order-2 lg:order-1 lg:pt-6'>
            <div className='overflow-hidden rounded-2xl'>
              <Image
                src='/whatsapp.png'
                alt='Notificações inteligentes via WhatsApp'
                width={600}
                height={400}
                className='w-full scale-105 object-cover shadow-xl transition duration-300'
                priority
              />
            </div>
          </div>

          <div className='order-1 lg:order-2 lg:-mt-6'>
            <dl className='space-y-8 lg:max-w-md'>
              <div className='flex gap-x-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 transition duration-300 hover:translate-x-2'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 shadow-lg shadow-emerald-500/20'>
                  <Bell className='h-6 w-6 text-white' />
                </div>
                <div className='w-[95%]'>
                  <dt className='text-lg font-semibold text-white'>Alertas Automáticos</dt>
                  <dd className='mt-2 text-gray-300'>
                    Notificações automáticas enviadas 24 horas antes do vencimento, garantindo que nenhum prazo seja
                    esquecido. Sistema inteligente que monitora todos os prazos.
                  </dd>
                </div>
              </div>

              <div className='flex gap-x-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 transition duration-300 hover:translate-x-2'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 shadow-lg shadow-emerald-500/20'>
                  <MessageCircle className='h-6 w-6 text-white' />
                </div>
                <div className='w-[95%]'>
                  <dt className='text-lg font-semibold text-white'>Múltiplos Canais</dt>
                  <dd className='mt-2 text-gray-300'>
                    Envio de lembretes por email e WhatsApp, aumentando as chances de seus devedores visualizarem as
                    notificações. Comunicação profissional e efetiva em diferentes plataformas.
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
