import { Loader2, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'

import type { SubscriptionProps } from '@/interfaces/subscription'

import { SubscriptionStatusEnum } from '@/lib/enums'

import { Button } from '../ui/button'

interface LockedScreenProps {
  children: React.ReactNode
  subscription: SubscriptionProps
}

export function LockedScreen({ children, subscription }: LockedScreenProps) {
  // hooks
  const router = useRouter()

  if (
    subscription?.status === SubscriptionStatusEnum.ACTIVE ||
    subscription?.status === SubscriptionStatusEnum.PENDING_CANCELLATION
  )
    return children

  return (
    <div className='relative'>
      {children}

      <div className='absolute inset-0 flex h-full w-full items-center justify-center bg-black/90'>
        {subscription?.status ? (
          <div className='flex flex-col items-center gap-4'>
            <Lock className='h-12 w-12 text-emerald-500' />
            <p className='text-center text-white/80'>
              Esta funcionalidade está bloqueada. <br />
              {!subscription?.status
                ? 'Ative sua assinatura, comece o teste grátis agora.'
                : subscription?.status === SubscriptionStatusEnum.CANCELED
                  ? 'Ative sua assinatura para desbloquear.'
                  : subscription?.status === SubscriptionStatusEnum.EXPIRED
                    ? 'Renove sua assinatura para desbloquear.'
                    : 'Ative sua assinatura para desbloquear.'}
            </p>

            {subscription?.status === SubscriptionStatusEnum.CANCELED && (
              <Button variant='outline' className='mt-6 h-10 w-full' onClick={() => router.push('/dashboard/settings')}>
                Ativar assinatura
              </Button>
            )}

            {subscription?.status === SubscriptionStatusEnum.EXPIRED && (
              <Button variant='outline' className='mt-6 h-10 w-full' onClick={() => router.push('/dashboard/settings')}>
                Renovar assinatura
              </Button>
            )}

            {subscription?.status === SubscriptionStatusEnum.NO_EXIST && (
              <Button variant='outline' className='mt-6 h-10 w-full' onClick={() => router.push('/dashboard/settings')}>
                Testar 3 dias grátis
              </Button>
            )}
          </div>
        ) : (
          <Loader2 className='h-12 w-12 animate-spin text-emerald-500' />
        )}
      </div>
    </div>
  )
}
