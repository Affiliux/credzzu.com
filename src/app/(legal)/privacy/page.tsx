import { ChevronLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Credzzu',
  description: 'Política de privacidade da Credzzu. Saiba como tratamos seus dados e informações pessoais.',
}

export default function PrivacyPage() {
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
          <h1 className='mb-8 text-center text-3xl font-medium tracking-tight md:text-4xl'>Política de Privacidade</h1>
          <div className='space-y-6 text-white/80'>
            <p className='text-sm font-light'>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>1. Introdução</h2>
              <p className='text-sm leading-relaxed font-light'>
                Esta Política de Privacidade descreve como o Credzzu coleta, usa, armazena e protege as informações
                pessoais dos usuários que acessam e utilizam a plataforma. O uso da plataforma implica na aceitação
                integral desta política.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>2. Dados que Coletamos</h2>
              <p className='text-sm leading-relaxed font-light'>
                Podemos coletar os seguintes dados pessoais e operacionais:
              </p>
              <ul className='list-disc space-y-2 pl-5 text-sm font-light'>
                <li>Dados de cadastro: nome completo, e-mail, telefone e senha.</li>
                <li>
                  Informações financeiras: plano contratado, histórico de pagamento e dados transacionais (via gateway).
                </li>
                <li>Dados inseridos na plataforma: devedores, valores, descrições, garantias, parcelas.</li>
                <li>Dados de navegação: logs de acesso, IP, tipo de dispositivo, navegador.</li>
              </ul>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>3. Finalidade do Tratamento</h2>
              <p className='text-sm leading-relaxed font-light'>Os dados coletados são utilizados para:</p>
              <ul className='list-disc space-y-2 pl-5 text-sm font-light'>
                <li>Permitir o funcionamento correto da plataforma.</li>
                <li>
                  Enviar e-mails e alertas ao <strong className='font-medium'>credor</strong> sobre vencimentos, atrasos
                  ou relatórios.
                </li>
                <li>Processar pagamentos de assinatura via parceiros externos.</li>
                <li>Melhorar a experiência do usuário e o desempenho do sistema.</li>
              </ul>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>4. Compartilhamento de Dados</h2>
              <p className='text-sm leading-relaxed font-light'>
                O Credzzu não vende, aluga ou repassa seus dados para terceiros. O compartilhamento é limitado a:
              </p>
              <ul className='list-disc space-y-2 pl-5 text-sm font-light'>
                <li>Processadores de pagamento (como gateways de pagamento).</li>
                <li>Parceiros estritamente necessários para operação técnica.</li>
                <li>Exigências legais de autoridades competentes.</li>
              </ul>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>5. Armazenamento e Segurança</h2>
              <p className='text-sm leading-relaxed font-light'>
                Adotamos boas práticas de segurança, incluindo criptografia de senhas, acesso restrito aos dados,
                firewalls e monitoração de acessos. Os dados são armazenados em servidores seguros localizados no Brasil
                ou exterior, conforme necessidade operacional.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>6. Retenção dos Dados</h2>
              <p className='text-sm leading-relaxed font-light'>
                Os dados serão mantidos enquanto o usuário tiver conta ativa. Após o encerramento, poderão ser
                armazenados por prazo legal ou regulatório, conforme aplicável.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>7. Direitos do Usuário</h2>
              <p className='text-sm leading-relaxed font-light'>O usuário tem direito a:</p>
              <ul className='list-disc space-y-2 pl-5 text-sm font-light'>
                <li>Solicitar acesso aos seus dados.</li>
                <li>Corrigir dados incorretos.</li>
                <li>Solicitar a exclusão ou anonimização dos dados, quando cabível.</li>
                <li>Revogar consentimento, quando aplicável.</li>
              </ul>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>8. Cookies e Tecnologias</h2>
              <p className='text-sm leading-relaxed font-light'>
                Utilizamos cookies para autenticação, manutenção de sessão e coleta de dados de uso da plataforma. Você
                pode configurar seu navegador para recusar cookies, mas isso pode limitar funcionalidades.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>9. Alterações na Política</h2>
              <p className='text-sm leading-relaxed font-light'>
                Esta política pode ser atualizada a qualquer momento. As alterações entrarão em vigor imediatamente após
                publicadas nesta página.
              </p>
            </section>

            <section className='space-y-4'>
              <h2 className='text-xl font-medium text-emerald-400'>10. Contato</h2>
              <p className='text-sm leading-relaxed font-light'>
                Para dúvidas ou solicitações relacionadas à privacidade, entre em contato com:{' '}
                <strong className='font-medium'>privacidade@credzzu.com</strong>
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
