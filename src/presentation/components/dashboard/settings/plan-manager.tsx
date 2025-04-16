'use client'

import React, { useEffect, useState } from 'react'

import { format } from 'date-fns'
import { AlertTriangle, CheckCircle2, CreditCard, GiftIcon, ShieldCheck, Sparkles, Zap } from 'lucide-react'

import type { PlanProps } from '@/application/interfaces/application'
import type {
  CreateSubscriptionPayloadProps,
  SubscriptionProps,
  UpdateSubscriptionPayloadProps,
} from '@/application/interfaces/subscription'

import { PlanRecurrenceEnum, SubscriptionStatusEnum } from '@/application/lib/enums'
import { formatCurrency } from '@/application/lib/formatters/currency'

import { Button } from '@/presentation/components/ui/button'

import { CardFormResult, CardPaymentModal } from './card-payment'
import { CancellationModal } from './modal-cancel-plan'

function NoSubscriptionVariant({
  onCreate,
  selectedPlan,
}: {
  selectedPlan: PlanProps | null
  onCreate: (payload: CreateSubscriptionPayloadProps) => Promise<void>
}) {
  // states
  const [modal_open, set_modal_open] = useState<boolean>(false)

  async function handleSubmitCardForm(formResult: CardFormResult) {
    try {
      await onCreate({
        idPlan: formResult.idPlan || selectedPlan?.id || 'pro-plan-id',
        cardToken: formResult.cardToken,
      })
    } catch (error) {
      console.error('Failed to create subscription', error)
    }
  }

  return (
    <>
      <div className='overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900'>
        {/* Header banner */}
        <div className='bg-gradient-to-r from-amber-600 to-amber-500 px-6 py-3 text-center'>
          <div className='flex items-center justify-center gap-2'>
            <GiftIcon className='h-5 w-5 text-white' />
            <span className='font-medium text-white'>Teste Grátis por 3 Dias</span>
          </div>
        </div>

        <div className='p-6'>
          {/* Plan title */}
          <div className='flex items-center'>
            <div className='mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-800 p-3'>
              <Sparkles className='h-7 w-7 animate-pulse text-amber-400' />
            </div>
            <div>
              <h3 className='text-xl font-medium text-white'>Plano Premium</h3>
              <p className='text-sm text-neutral-400'>Acesse todos os recursos premium</p>
            </div>
          </div>

          {/* Plan pricing */}
          <div className='mt-6 rounded-lg bg-neutral-800 p-4 text-center'>
            {selectedPlan.recurrence === PlanRecurrenceEnum.MONTHLY ? (
              <div>
                <span className='text-2xl font-bold text-white'>
                  {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(selectedPlan.price)}
                </span>
                <span className='text-sm text-neutral-400'>/mês</span>
              </div>
            ) : (
              <div>
                <div className='flex items-center justify-center gap-2'>
                  <span className='text-2xl font-bold text-white'>{formatCurrency(selectedPlan.price / 12)}</span>
                  <span className='text-sm text-neutral-400'>/mês</span>
                </div>
                <div className='mt-1 text-xs text-neutral-400'>
                  <span className='text-green-400'>16% de desconto</span> • Anual:
                  {formatCurrency(selectedPlan.price)}
                  <span className='ml-1 line-through'>
                    ({formatCurrency(selectedPlan.price + selectedPlan.price * 0.16)})
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Benefits */}
          <div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <div className='rounded-lg bg-neutral-800 p-3'>
              <div className='flex items-center text-sm text-neutral-300'>
                <Zap className='mr-2 h-4 w-4 text-amber-400' /> Devedores ilimitados
              </div>
            </div>
            <div className='rounded-lg bg-neutral-800 p-3'>
              <div className='flex items-center text-sm text-neutral-300'>
                <Zap className='mr-2 h-4 w-4 text-amber-400' /> Dívidas ilimitadas
              </div>
            </div>
            <div className='rounded-lg bg-neutral-800 p-3'>
              <div className='flex items-center text-sm text-neutral-300'>
                <ShieldCheck className='mr-2 h-4 w-4 text-amber-400' /> Relatórios avançados
              </div>
            </div>
            <div className='rounded-lg bg-neutral-800 p-3'>
              <div className='flex items-center text-sm text-neutral-300'>
                <ShieldCheck className='mr-2 h-4 w-4 text-amber-400' /> Exportação de dados
              </div>
            </div>
          </div>

          {/* Trial info */}
          <div className='mt-6 rounded-lg bg-neutral-800 p-4'>
            <div className='flex items-center'>
              <CreditCard className='mr-3 h-5 w-5 text-neutral-400' />
              <p className='text-sm text-neutral-300'>
                É necessário informar um cartão de crédito, mas você não será cobrado durante o período de teste.
              </p>
            </div>
          </div>

          <Button className='mt-6 h-10 w-full' variant='outline' onClick={() => set_modal_open(true)}>
            Começar agora
          </Button>
        </div>
      </div>

      <CardPaymentModal
        is_open={modal_open}
        onClose={() => set_modal_open(false)}
        onSubmit={handleSubmitCardForm}
        title='Começar período de teste'
        description='Insira os dados do cartão para iniciar seu período de teste gratuito de 3 dias'
        button_text='Ativar teste grátis'
        plan_id={selectedPlan?.id || 'pro-plan-id'}
      />
    </>
  )
}

function ActiveSubscriptionVariant({
  subscription,
  onCancel,
  onUpdate,
}: {
  subscription: SubscriptionProps
  onCancel: () => Promise<void>
  onUpdate: (payload: UpdateSubscriptionPayloadProps) => Promise<void>
}) {
  // states
  const [update_payment_modal_open, set_update_payment_modal_open] = useState<boolean>(false)
  const [cancel_modal_open, set_cancel_modal_open] = useState<boolean>(false)

  async function handleSubmitCardForm(formResult: CardFormResult) {
    try {
      await onUpdate({
        cardToken: formResult.cardToken,
      })
    } catch (error) {
      console.error('Failed to update payment method', error)
    }
  }

  return (
    <>
      <div className='overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900'>
        {/* Header banner */}
        <div className='bg-gradient-to-r from-green-900 to-green-700 px-6 py-3 text-center'>
          <div className='flex items-center justify-center gap-2'>
            <CheckCircle2 className='h-5 w-5 text-white' />
            <span className='font-medium text-white'>Sua assinatura está ativa</span>
          </div>
        </div>

        <div className='p-6'>
          {/* Plan title */}
          <div className='flex items-center'>
            <div className='mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-800 p-3'>
              <Sparkles className='h-7 w-7 animate-pulse text-amber-400' />
            </div>
            <div>
              <h3 className='text-xl font-medium text-white'>Plano Premium</h3>
              <p className='text-sm text-neutral-400'>
                Renovação em {format(new Date(subscription?.endDate), 'dd/MM/yyyy')}
              </p>
            </div>
          </div>

          {/* Plan features */}
          <div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <div className='rounded-lg bg-neutral-800 p-3'>
              <div className='flex items-center text-sm text-neutral-300'>
                <CheckCircle2 className='mr-2 h-4 w-4 text-amber-500' /> Devedores ilimitados
              </div>
            </div>
            <div className='rounded-lg bg-neutral-800 p-3'>
              <div className='flex items-center text-sm text-neutral-300'>
                <CheckCircle2 className='mr-2 h-4 w-4 text-amber-500' /> Dívidas ilimitadas
              </div>
            </div>
            <div className='rounded-lg bg-neutral-800 p-3'>
              <div className='flex items-center text-sm text-neutral-300'>
                <CheckCircle2 className='mr-2 h-4 w-4 text-amber-500' /> Relatórios avançados
              </div>
            </div>
            <div className='rounded-lg bg-neutral-800 p-3'>
              <div className='flex items-center text-sm text-neutral-300'>
                <CheckCircle2 className='mr-2 h-4 w-4 text-amber-500' /> Exportação de dados
              </div>
            </div>
          </div>

          <div className='mt-6 flex space-x-2'>
            <Button
              variant='outline'
              className='h-10 border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              onClick={() => set_update_payment_modal_open(true)}
            >
              Atualizar pagamento
            </Button>
            <Button
              variant='outline'
              className='h-10 border-neutral-700 bg-neutral-800 text-red-400 hover:bg-neutral-700 hover:text-red-300'
              onClick={() => set_cancel_modal_open(true)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Update Modal */}
      <CardPaymentModal
        is_open={update_payment_modal_open}
        onClose={() => set_update_payment_modal_open(false)}
        onSubmit={handleSubmitCardForm}
        title='Atualizar forma de pagamento'
        description='Insira os dados do novo cartão para atualizar sua forma de pagamento'
        button_text='Atualizar pagamento'
      />

      {/* Cancellation Confirmation Modal */}
      <CancellationModal isOpen={cancel_modal_open} onClose={() => set_cancel_modal_open(false)} onConfirm={onCancel} />
    </>
  )
}

function CanceledSubscriptionVariant({
  subscription,
  onCreate,
  selectedPlan,
}: {
  subscription: SubscriptionProps
  selectedPlan: PlanProps | null
  onCreate: (payload: CreateSubscriptionPayloadProps) => Promise<void>
}) {
  // states
  const [reactivate_modal_open, set_reactivate_modal_open] = useState<boolean>(false)

  async function handleSubmitCardForm(formResult: CardFormResult) {
    try {
      await onCreate({
        idPlan: formResult.idPlan || selectedPlan?.id || subscription.plan.id,
        cardToken: formResult.cardToken,
      })
    } catch (error) {
      console.error('Failed to reactivate subscription', error)
    }
  }

  return (
    <>
      <div className='overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900'>
        {/* Header banner */}
        <div className='bg-gradient-to-r from-red-900 to-red-700 px-6 py-3 text-center'>
          <div className='flex items-center justify-center gap-2'>
            <AlertTriangle className='h-5 w-5 text-white' />
            <span className='font-medium text-white'>Sua assinatura está cancelada</span>
          </div>
        </div>

        <div className='p-6'>
          {/* Plan title */}
          <div className='flex items-center'>
            <div className='mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-800 p-3'>
              <Sparkles className='h-7 w-7 animate-pulse text-amber-400' />
            </div>
            <div>
              <h3 className='text-xl font-medium text-white'>Plano Premium</h3>
              <p className='text-sm text-neutral-400'>Sua assinatura foi cancelada. Reative para continuar.</p>
            </div>
          </div>

          {/* Plan pricing */}
          <div className='mt-6 rounded-lg bg-neutral-800 p-4 text-center'>
            {selectedPlan.recurrence === PlanRecurrenceEnum.MONTHLY ? (
              <div>
                <span className='text-2xl font-bold text-white'>{formatCurrency(selectedPlan.price)}</span>
                <span className='text-sm text-neutral-400'>/mês</span>
              </div>
            ) : (
              <div>
                <div className='flex items-center justify-center gap-2'>
                  <span className='text-2xl font-bold text-white'>{formatCurrency(selectedPlan.price / 12)}</span>
                  <span className='text-sm text-neutral-400'>/mês</span>
                </div>
                <div className='mt-1 text-xs text-neutral-400'>
                  <span className='text-green-400'>16% de desconto</span> • Anual:
                  {formatCurrency(selectedPlan.price)}
                  <span className='ml-1 line-through'>
                    ({formatCurrency(selectedPlan.price + selectedPlan.price * 0.16)})
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Plan features */}
          <div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <div className='rounded-lg bg-neutral-800 p-3'>
              <div className='flex items-center text-sm text-neutral-300'>
                <CheckCircle2 className='mr-2 h-4 w-4 text-amber-500' /> Devedores ilimitados
              </div>
            </div>
            <div className='rounded-lg bg-neutral-800 p-3'>
              <div className='flex items-center text-sm text-neutral-300'>
                <CheckCircle2 className='mr-2 h-4 w-4 text-amber-500' /> Dívidas ilimitadas
              </div>
            </div>
            <div className='rounded-lg bg-neutral-800 p-3'>
              <div className='flex items-center text-sm text-neutral-300'>
                <CheckCircle2 className='mr-2 h-4 w-4 text-amber-500' /> Relatórios avançados
              </div>
            </div>
            <div className='rounded-lg bg-neutral-800 p-3'>
              <div className='flex items-center text-sm text-neutral-300'>
                <CheckCircle2 className='mr-2 h-4 w-4 text-amber-500' /> Exportação de dados
              </div>
            </div>
          </div>

          <Button className='mt-6 h-10 w-full' variant='outline' onClick={() => set_reactivate_modal_open(true)}>
            Reativar assinatura
          </Button>
        </div>
      </div>

      <CardPaymentModal
        is_open={reactivate_modal_open}
        onClose={() => set_reactivate_modal_open(false)}
        onSubmit={handleSubmitCardForm}
        title='Reativar assinatura'
        description='Insira os dados do cartão para reativar sua assinatura'
        button_text='Reativar agora'
        plan_id={selectedPlan?.id || subscription.plan.id}
      />
    </>
  )
}

function ExpiredSubscriptionVariant({
  subscription,
  selectedPlan,
  onCreate,
}: {
  subscription: SubscriptionProps
  selectedPlan: PlanProps | null
  onCreate: (payload: CreateSubscriptionPayloadProps) => Promise<void>
}) {
  // states
  const [renew_modal_open, set_renew_modal_open] = useState<boolean>(false)

  async function handleSubmitCardForm(formResult: CardFormResult) {
    try {
      await onCreate({
        idPlan: formResult.idPlan || selectedPlan?.id || subscription.plan.id,
        cardToken: formResult.cardToken,
      })
    } catch (error) {
      console.error('Failed to renew subscription', error)
    }
  }

  return (
    <>
      <div className='overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900'>
        {/* Header banner */}
        <div className='bg-gradient-to-r from-red-900 to-red-700 px-6 py-3 text-center'>
          <div className='flex items-center justify-center gap-2'>
            <AlertTriangle className='h-5 w-5 text-white' />
            <span className='font-medium text-white'>Sua assinatura está expirada</span>
          </div>
        </div>

        <div className='p-6'>
          {/* Plan title */}
          <div className='flex items-center'>
            <div className='mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-800 p-3'>
              <Sparkles className='h-7 w-7 animate-pulse text-amber-400' />
            </div>
            <div>
              <h3 className='text-xl font-medium text-white'>Plano Premium</h3>
              <p className='text-sm text-neutral-400'>Sua assinatura expirou. Renove para continuar.</p>
            </div>
          </div>

          {/* Plan pricing */}
          <div className='mt-6 rounded-lg bg-neutral-800 p-4 text-center'>
            {selectedPlan.recurrence === PlanRecurrenceEnum.MONTHLY ? (
              <div>
                <span className='text-2xl font-bold text-white'>{formatCurrency(selectedPlan.price)}</span>
                <span className='text-sm text-neutral-400'>/mês</span>
              </div>
            ) : (
              <div>
                <div className='flex items-center justify-center gap-2'>
                  <span className='text-2xl font-bold text-white'>{formatCurrency(selectedPlan.price / 12)}</span>
                  <span className='text-sm text-neutral-400'>/mês</span>
                </div>
                <div className='mt-1 text-xs text-neutral-400'>
                  <span className='text-green-400'>16% de desconto</span> • Anual:
                  {formatCurrency(selectedPlan.price)}
                  <span className='ml-1 line-through'>
                    ({formatCurrency(selectedPlan.price + selectedPlan.price * 0.16)})
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Plan features */}
          <div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <div className='rounded-lg bg-neutral-800 p-3'>
              <div className='flex items-center text-sm text-neutral-300'>
                <CheckCircle2 className='mr-2 h-4 w-4 text-amber-500' /> Devedores ilimitados
              </div>
            </div>
            <div className='rounded-lg bg-neutral-800 p-3'>
              <div className='flex items-center text-sm text-neutral-300'>
                <CheckCircle2 className='mr-2 h-4 w-4 text-amber-500' /> Dívidas ilimitadas
              </div>
            </div>
            <div className='rounded-lg bg-neutral-800 p-3'>
              <div className='flex items-center text-sm text-neutral-300'>
                <CheckCircle2 className='mr-2 h-4 w-4 text-amber-500' /> Relatórios avançados
              </div>
            </div>
            <div className='rounded-lg bg-neutral-800 p-3'>
              <div className='flex items-center text-sm text-neutral-300'>
                <CheckCircle2 className='mr-2 h-4 w-4 text-amber-500' /> Exportação de dados
              </div>
            </div>
          </div>

          <Button className='mt-6 h-10 w-full' variant='outline' onClick={() => set_renew_modal_open(true)}>
            Renovar assinatura
          </Button>
        </div>
      </div>

      <CardPaymentModal
        is_open={renew_modal_open}
        onClose={() => set_renew_modal_open(false)}
        onSubmit={handleSubmitCardForm}
        title='Renovar assinatura'
        description='Insira os dados do cartão para renovar sua assinatura'
        button_text='Renovar agora'
        plan_id={selectedPlan?.id || subscription.plan.id}
      />
    </>
  )
}

export function PlanManager({
  plans,
  subscription,
  onCancel,
  onCreate,
  onUpdate,
}: {
  plans: PlanProps[]
  subscription?: SubscriptionProps
  onCancel: () => Promise<void>
  onCreate: (payload: CreateSubscriptionPayloadProps) => Promise<void>
  onUpdate: (payload: UpdateSubscriptionPayloadProps) => Promise<void>
}) {
  // states
  const [selected_plan, set_selected_plan] = useState<PlanProps | null>(null)

  // Only show tabs if not on active subscription
  const showPlanTabs =
    !subscription ||
    subscription.status === SubscriptionStatusEnum.CANCELED ||
    subscription.status === SubscriptionStatusEnum.EXPIRED

  useEffect(() => {
    if (!!plans?.length) set_selected_plan(plans[0])
  }, [plans])

  return selected_plan ? (
    <>
      {/* Plan tabs */}
      {showPlanTabs && (
        <div className='mb-6'>
          <div className='flex w-full rounded-lg bg-neutral-800 p-1'>
            {plans.map(plan => {
              return (
                <button
                  key={plan.id}
                  className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                    selected_plan.id === plan.id ? 'bg-neutral-700 text-white' : 'text-neutral-300 hover:bg-neutral-700'
                  }`}
                  onClick={() => set_selected_plan(plan)}
                >
                  {plan.recurrence === PlanRecurrenceEnum.MONTHLY ? 'Mensal' : 'Anual'}
                  {plan.recurrence === PlanRecurrenceEnum.YEARLY && (
                    <span className='ml-1 rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-semibold text-green-400'>
                      -16%
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Plan component */}
      {!subscription ? (
        <NoSubscriptionVariant onCreate={onCreate} selectedPlan={selected_plan} />
      ) : (
        (() => {
          switch (subscription.status) {
            case SubscriptionStatusEnum.ACTIVE:
              return <ActiveSubscriptionVariant subscription={subscription} onCancel={onCancel} onUpdate={onUpdate} />
            case SubscriptionStatusEnum.CANCELED:
              return (
                <CanceledSubscriptionVariant
                  subscription={subscription}
                  onCreate={onCreate}
                  selectedPlan={selected_plan}
                />
              )
            case SubscriptionStatusEnum.EXPIRED:
              return (
                <ExpiredSubscriptionVariant
                  subscription={subscription}
                  onCreate={onCreate}
                  selectedPlan={selected_plan}
                />
              )
            default:
              return <NoSubscriptionVariant onCreate={onCreate} selectedPlan={selected_plan} />
          }
        })()
      )}
    </>
  ) : (
    <></>
  )
}
