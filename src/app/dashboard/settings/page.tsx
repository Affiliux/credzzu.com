'use client'

import React from 'react'

import { AlertCircle, CreditCard, Shield, User2 } from 'lucide-react'

import { useAccount } from '@/application/contexts/AccountContext'
import { useApplication } from '@/application/contexts/ApplicationContext'
import { useSubscription } from '@/application/contexts/SubscriptionContext'

import { SubscriptionStatusEnum } from '@/application/lib/enums'

import { PlanManager } from '@/presentation/components/dashboard/plan-manager'
import { UpdateAccountForm } from '@/presentation/components/dashboard/update-account-form'
import { UpdatePasswordForm } from '@/presentation/components/dashboard/update-password-form'
import { Alert, AlertDescription, AlertTitle } from '@/presentation/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/presentation/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/presentation/components/ui/tabs'

export const runtime = 'edge'

export default function Page() {
  // contexts
  const { plans } = useApplication()
  const { account, onUpdateAccount, onUpdatePassword } = useAccount()
  const { subscription, onCancelSubscription, onCreateSubscription, onUpdateSubscription } = useSubscription()

  return (
    <div className='w-full space-y-6'>
      <div className='flex flex-col justify-between space-y-2'>
        <h1 className='text-2xl font-bold text-neutral-100'>Configurações</h1>

        <div className='mt-2'>
          <Tabs defaultValue='plan'>
            <TabsList className='bg-neutral-800'>
              <TabsTrigger
                value='plan'
                className='data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-100'
              >
                <CreditCard className='mr-2 h-4 w-4' />
                Plano
              </TabsTrigger>

              <TabsTrigger
                value='account'
                className='data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-100'
              >
                <User2 className='mr-2 h-4 w-4' />
                Conta
              </TabsTrigger>

              <TabsTrigger
                value='security'
                className='data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-100'
              >
                <Shield className='mr-2 h-4 w-4' />
                Segurança
              </TabsTrigger>
            </TabsList>

            <TabsContent value='plan'>
              <Card className='mt-6 flex flex-col border-0 p-0'>
                <CardHeader className='border-b px-0'>
                  <CardTitle className='text-xl font-semibold text-neutral-100'>Plano</CardTitle>
                  <CardDescription className='text-md -mt-1 text-neutral-400'>
                    Gerencie suas configurações do plano.
                  </CardDescription>
                </CardHeader>

                <CardContent className='mt-4 p-0'>
                  <div className='max-w-lg'>
                    <PlanManager
                      plans={plans}
                      subscription={subscription}
                      onCancel={onCancelSubscription}
                      onCreate={onCreateSubscription}
                      onUpdate={onUpdateSubscription}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='account'>
              <Card className='mt-6 flex flex-col border-0 p-0'>
                <CardHeader className='border-b px-0'>
                  <CardTitle className='text-xl font-semibold text-neutral-100'>Dados da conta</CardTitle>
                  <CardDescription className='text-md -mt-1 text-neutral-400'>
                    Gerencie suas configurações da sua conta.
                  </CardDescription>
                </CardHeader>

                <CardContent className='mt-4 p-0'>
                  <div className='max-w-lg rounded-md border border-neutral-700 bg-neutral-800 p-4'>
                    <h3 className='text-sm font-semibold text-neutral-100'>Alterar dados</h3>
                    <p className='mb-6 text-sm text-neutral-400'>Altere os dados da sua conta.</p>

                    <UpdateAccountForm
                      enable={subscription?.status && subscription?.status === SubscriptionStatusEnum.ACTIVE}
                      account={account}
                      onSubmit={onUpdateAccount}
                    />

                    {!subscription ||
                    (subscription?.status && subscription?.status !== SubscriptionStatusEnum.ACTIVE) ? (
                      <Alert variant='destructive' className='mt-6'>
                        <AlertCircle className='h-4 w-4' />
                        <AlertTitle>Atenção</AlertTitle>
                        <AlertDescription>Não é possível atualizar os dados da conta no plano Grátis!</AlertDescription>
                      </Alert>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='security'>
              <Card className='mt-6 flex flex-col border-0 p-0'>
                <CardHeader className='border-b px-0'>
                  <CardTitle className='text-xl font-semibold text-neutral-100'>Segurança</CardTitle>
                  <CardDescription className='text-md -mt-1 text-neutral-400'>
                    Gerencie suas configurações de segurança.
                  </CardDescription>
                </CardHeader>

                <CardContent className='mt-4 p-0'>
                  <div className='max-w-lg rounded-md border border-neutral-700 bg-neutral-800 p-4'>
                    <h3 className='text-sm font-semibold text-neutral-100'>Alterar senha</h3>
                    <p className='mb-6 text-sm text-neutral-400'>Altere sua senha de acesso a conta.</p>

                    <UpdatePasswordForm onSubmit={onUpdatePassword} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
