import { ChevronLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Termos de Uso | Credzzu',
  description: 'Termos de uso da plataforma Credzzu. Leia as condições para utilização dos nossos serviços.',
}

export default function TermsPage() {
  return (
    <>
      {/* Header simplificado */}
      <header className='sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md'>
        <div className='container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8 xl:max-w-7xl 2xl:max-w-[1400px]'>
          <Link href='/' className='relative z-50 flex items-center gap-2'>
            <Image src='/logo.png' alt='Logo Credzzu' width={160} height={160} priority className='h-10 w-auto' />
          </Link>

          <Link
            href='/'
            className='flex items-center gap-2 text-sm font-light text-white/70 transition-colors hover:text-white'
          >
            <ChevronLeft className='h-4 w-4' />
            <span>Voltar para a página inicial</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto flex-1 px-4 py-12 sm:px-6 lg:px-8 xl:max-w-4xl'>
        <div className='mx-auto max-w-3xl'>
          <h1 className='mb-8 text-center text-3xl font-medium tracking-tight md:text-4xl'>Termos de Uso</h1>
          <div className='space-y-6 text-white/80'>
            <p className='text-sm font-light'>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>1. Aceitação dos Termos</h2>
              <p className='text-sm leading-relaxed font-light'>
                Ao se cadastrar e utilizar a plataforma Credzzu, você declara ter lido, entendido e concordado com os
                presentes Termos de Uso. Caso não concorde com estes termos, não utilize o serviço.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>2. Descrição do Serviço</h2>
              <p className='text-sm leading-relaxed font-light'>
                O Credzzu é uma plataforma digital destinada à gestão de empréstimos e cobranças, permitindo que o
                usuário organize dívidas, cadastre devedores, calcule parcelas com juros e acompanhe o status dos
                pagamentos.
              </p>
              <p className='text-sm leading-relaxed font-light'>
                <strong className='font-medium'>Importante:</strong> O Credzzu não realiza cobrança ativa aos devedores
                e não gera QR Codes de pagamento.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>3. Cadastro do Usuário</h2>
              <p className='text-sm leading-relaxed font-light'>
                Para utilizar a plataforma, é necessário realizar um cadastro com dados válidos, incluindo nome, e-mail,
                telefone e senha. O usuário é responsável por manter esses dados atualizados e seguros.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>4. Acesso e Assinatura</h2>
              <ul className='list-disc space-y-2 pl-5 text-sm font-light'>
                <li>O acesso à plataforma está condicionado à assinatura de um plano mensal.</li>
                <li>
                  Oferecemos um período de teste gratuito de 3 dias, com cobrança automática após esse período, caso não
                  haja cancelamento.
                </li>
                <li>
                  O usuário pode cancelar a assinatura a qualquer momento, com acesso até o final do ciclo vigente.
                </li>
              </ul>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>5. Obrigações e Responsabilidades do Usuário</h2>
              <ul className='list-disc space-y-2 pl-5 text-sm font-light'>
                <li>Utilizar a plataforma apenas para fins lícitos e respeitando a legislação vigente.</li>
                <li>Garantir a veracidade das informações cadastradas.</li>
                <li>Não utilizar o Credzzu para práticas abusivas ou ilegais de cobrança.</li>
                <li>Manter a confidencialidade dos dados de acesso à conta.</li>
              </ul>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>6. Limitações do Serviço</h2>
              <p className='text-sm leading-relaxed font-light'>O Credzzu não realiza:</p>
              <ul className='list-disc space-y-2 pl-5 text-sm font-light'>
                <li>Cobrança ativa junto aos devedores.</li>
                <li>Intermediação de pagamentos entre credores e devedores.</li>
                <li>Garantia de recebimento de valores cadastrados.</li>
              </ul>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>7. Notificações e Alertas</h2>
              <p className='text-sm leading-relaxed font-light'>
                As notificações de vencimento, atraso ou lembrete de parcelas são enviadas apenas ao{' '}
                <strong className='font-medium'>usuário credor</strong>. Não há comunicação automatizada com os
                devedores.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>8. Cancelamento e Suspensão</h2>
              <ul className='list-disc space-y-2 pl-5 text-sm font-light'>
                <li>O usuário pode cancelar sua conta a qualquer momento.</li>
                <li>
                  A plataforma poderá suspender o acesso em caso de inadimplência, uso indevido ou violação destes
                  termos.
                </li>
              </ul>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>9. Propriedade Intelectual</h2>
              <p className='text-sm leading-relaxed font-light'>
                Todo o conteúdo, estrutura e funcionalidades da plataforma Credzzu são de propriedade exclusiva da
                empresa, sendo vedada sua reprodução, distribuição ou modificação sem autorização expressa.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>10. Privacidade</h2>
              <p className='text-sm leading-relaxed font-light'>
                Os dados dos usuários são tratados com segurança e conforme as diretrizes da nossa{' '}
                <Link href='/privacy' className='text-white underline hover:text-white/80'>
                  Política de Privacidade
                </Link>
                .
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>11. Modificações nos Termos</h2>
              <p className='text-sm leading-relaxed font-light'>
                O Credzzu reserva-se o direito de alterar estes Termos de Uso a qualquer momento. As alterações serão
                informadas por e-mail ou dentro da própria plataforma.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>12. Foro e Legislação</h2>
              <p className='text-sm leading-relaxed font-light'>
                Estes termos são regidos pelas leis brasileiras. Fica eleito o foro da comarca de [cidade/estado da
                empresa] para dirimir eventuais conflitos.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>13. Contato</h2>
              <p className='text-sm leading-relaxed font-light'>
                Em caso de dúvidas, entre em contato com: <strong className='font-medium'>contato@credzzu.com</strong>
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
