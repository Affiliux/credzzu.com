'use client'

import { useState } from 'react'

import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqItems = [
    {
      question: 'Como o Credzzu funciona?',
      answer:
        'O Credzzu permite que você registre dívidas, acompanhe pagamentos e envie lembretes automáticos para seus amigos ou conhecidos que lhe devem dinheiro. Basta adicionar um novo contato, registrar o valor devido e o sistema cuida do resto.',
    },
    {
      question: 'É necessário cartão de crédito para começar?',
      answer:
        'Não, o plano mensal é totalmente gratuito e você pode começar a usar imediatamente após o cadastro, sem necessidade de cartão de crédito. O plano premium anual requer pagamento, mas você pode testar todas as funcionalidades básicas antes de decidir fazer o upgrade.',
    },
    {
      question: 'Como os lembretes são enviados aos meus amigos?',
      answer:
        'Os lembretes são enviados por email ou SMS, dependendo das informações de contato que você fornecer. Você pode personalizar a frequência e o tom dos lembretes, mantendo-os amigáveis ou mais formais, de acordo com sua preferência e relacionamento.',
    },
    {
      question: 'O Credzzu cobra alguma taxa sobre os pagamentos recuperados?',
      answer:
        'Não, o Credzzu não cobra nenhuma taxa sobre os valores recuperados. No plano gratuito, você pode registrar manualmente os pagamentos recebidos. No plano premium, oferecemos integração com métodos de pagamento para facilitar a cobrança, mas qualquer taxa é apenas a do próprio processador de pagamento escolhido.',
    },
    {
      question: 'Posso cancelar minha assinatura a qualquer momento?',
      answer:
        'Sim, você pode cancelar sua assinatura premium a qualquer momento, sem taxas adicionais ou penalidades. Após o cancelamento, você continuará com acesso ao plano premium até o final do período já pago, e depois será automaticamente transferido para o plano gratuito, mantendo seus dados básicos.',
    },
  ]

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id='faq' className='relative w-full overflow-hidden bg-black py-16 md:py-24 lg:py-32'>
      {/* Background Elements */}
      <div className='absolute top-0 left-0 h-full w-full'>
        <div className='absolute -top-40 -right-20 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl'></div>
        <div className='absolute -bottom-20 -left-40 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl'></div>

        {/* Estrelas cintilantes */}
        <div className='absolute top-20 left-1/3 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute top-1/3 right-1/4 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute bottom-1/3 left-1/5 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute top-1/2 left-32 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_10px_5px_rgba(16,185,129,0.3)]'></div>
        <div className='absolute top-3/4 right-1/3 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_8px_4px_rgba(16,185,129,0.2)]'></div>
        <div className='absolute bottom-10 left-1/4 h-0.5 w-0.5 rounded-full bg-emerald-300 shadow-[0_0_8px_4px_rgba(16,185,129,0.2)]'></div>
      </div>

      {/* Gradiente superior para transição suave */}
      <div className='absolute top-0 left-0 h-24 w-full bg-gradient-to-b from-black to-transparent'></div>

      <div className='relative container mx-auto px-3 sm:px-6'>
        <div className='mx-auto mb-12 flex max-w-3xl flex-col items-center text-center md:mb-16'>
          <h2 className='bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-3xl font-light tracking-tight text-transparent sm:text-4xl md:text-5xl lg:text-6xl'>
            Perguntas Frequentes
          </h2>
          <p className='mt-4 max-w-2xl text-base text-white/60 md:mt-6 md:text-lg'>
            Tire suas dúvidas sobre como o Credzzu pode ajudar você a recuperar seu dinheiro
          </p>
        </div>

        <div className='mx-auto max-w-3xl divide-y divide-white/10'>
          {faqItems.map((item, index) => (
            <div key={index} className='py-4 md:py-5'>
              <button
                onClick={() => toggleQuestion(index)}
                className='flex w-full items-center justify-between py-2 text-left text-base font-medium text-white md:text-lg'
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`h-4 w-4 text-emerald-400 transition-transform duration-300 md:h-5 md:w-5 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className='py-3 text-sm text-white/70 md:py-4 md:text-base'>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
