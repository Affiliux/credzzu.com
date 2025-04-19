'use client'

import React, { useState } from 'react'

import axios from 'axios'
import { CheckCircle2, XCircle } from 'lucide-react'

import { creditCardMask, cvvMask, expiryDateMask } from '@/application/lib/masks'

import { Button } from '@/presentation/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/presentation/components/ui/dialog'
import { Input } from '@/presentation/components/ui/input'
import { Label } from '@/presentation/components/ui/label'

// utility for removing masks from input
function removeMask(value: string) {
  return value.replace(/\D/g, '')
}

// Luhn algorithm for credit card validation
function validateCreditCard(value: string) {
  if (!value) return false

  // Remove all non digit characters
  const cardNumber = value.replace(/\D/g, '')
  if (cardNumber.length < 13 || cardNumber.length > 19) return false

  let sum = 0
  let shouldDouble = false

  // Loop from right to left
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i))

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}

// Validate expiry date
function validateExpiry(value: string) {
  if (!value || value.length !== 5) return false

  const [month, year] = value.split('/').map(v => parseInt(v))
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() % 100
  const currentMonth = currentDate.getMonth() + 1

  // Check if month is valid
  if (month < 1 || month > 12) return false

  // Check if date is in the past
  if (year < currentYear || (year === currentYear && month < currentMonth)) return false

  return true
}

// Validate CVV
function validateCVV(value: string) {
  const cvv = value.replace(/\D/g, '')
  return cvv.length >= 3 && cvv.length <= 4
}

// Validate name
function validateName(value: string) {
  return value.trim().length >= 3 && /^[a-zA-Z\s]+$/.test(value)
}

export interface CardFormData {
  number: string
  name: string
  expiry: string
  cvv: string
}

export interface CardFormErrors {
  number?: string
  name?: string
  expiry?: string
  cvv?: string
}

export interface CardFormResult {
  cardToken: string
  idPlan?: string
}

interface CardPaymentModalProps {
  is_open: boolean
  title: string
  description: string
  button_text: string
  plan_id?: string
  onClose: () => void
  onSubmit: (result: CardFormResult) => Promise<void>
}

export function CardPaymentModal({
  is_open,
  title,
  description,
  button_text,
  plan_id,
  onClose,
  onSubmit,
}: CardPaymentModalProps) {
  // states
  const [is_loading, set_is_loading] = useState(false)
  const [values, set_values] = useState<CardFormData>({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  })
  const [errors, set_errors] = useState<CardFormErrors>({})
  const [touched, set_touched] = useState<Record<string, boolean>>({})
  const [status, set_status] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Apply masks based on field name
    let maskedValue = value
    if (name === 'number') {
      maskedValue = creditCardMask(value)
    } else if (name === 'expiry') {
      maskedValue = expiryDateMask(value)
    } else if (name === 'cvv') {
      maskedValue = cvvMask(value)
    }

    set_values(prev => ({ ...prev, [name]: maskedValue }))

    // Validate field on change
    validateField(name, maskedValue)

    if (status !== 'idle') set_status('idle')
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    set_touched(prev => ({ ...prev, [name]: true }))
    validateField(name, values[name as keyof CardFormData])
  }

  const validateField = (name: string, value: string) => {
    let error = ''

    switch (name) {
      case 'number':
        if (!value) {
          error = 'Número do cartão é obrigatório'
        } else if (!validateCreditCard(value)) {
          error = 'Número de cartão inválido'
        }
        break
      case 'name':
        if (!value) {
          error = 'Nome no cartão é obrigatório'
        } else if (!validateName(value)) {
          error = 'Insira o nome completo como está no cartão'
        }
        break
      case 'expiry':
        if (!value) {
          error = 'Data de validade é obrigatória'
        } else if (!validateExpiry(value)) {
          error = 'Data de validade inválida'
        }
        break
      case 'cvv':
        if (!value) {
          error = 'CVV é obrigatório'
        } else if (!validateCVV(value)) {
          error = 'CVV inválido'
        }
        break
    }

    set_errors(prev => ({ ...prev, [name]: error }))
    return !error
  }

  const validateForm = () => {
    const newErrors: CardFormErrors = {}
    let isValid = true

    // Validate all fields
    if (!validateField('number', values.number)) {
      newErrors.number = errors.number || 'Número do cartão é obrigatório'
      isValid = false
    }

    if (!validateField('name', values.name)) {
      newErrors.name = errors.name || 'Nome no cartão é obrigatório'
      isValid = false
    }

    if (!validateField('expiry', values.expiry)) {
      newErrors.expiry = errors.expiry || 'Data de validade é obrigatória'
      isValid = false
    }

    if (!validateField('cvv', values.cvv)) {
      newErrors.cvv = errors.cvv || 'CVV é obrigatório'
      isValid = false
    }

    // Mark all fields as touched
    set_touched({
      number: true,
      name: true,
      expiry: true,
      cvv: true,
    })

    set_errors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form before submission
    const isValid = validateForm()
    if (!isValid) return

    set_is_loading(true)
    set_status('idle')

    try {
      // Generate card token
      const { data: response } = await axios.post(
        `https://api.pagar.me/core/v5/tokens?appId=${process.env.NEXT_PUBLIC_STONE_APP_ID}`,
        {
          type: 'card',
          card: {
            number: removeMask(values.number),
            holder_name: values.name,
            exp_month: Number(values.expiry.split('/')[0]),
            exp_year: Number(values.expiry.split('/')[1]),
            cvv: values.cvv,
          },
        },
      )

      if (response.id) {
        await onSubmit({
          cardToken: response.id,
          idPlan: plan_id,
        })

        set_status('success')

        setTimeout(() => {
          onClose()
        }, 3000)
      }
    } catch (error) {
      console.error('Error processing payment:', error)
      set_status('error')
    } finally {
      set_is_loading(false)
    }
  }

  return (
    <Dialog open={is_open} onOpenChange={open => !open && onClose()}>
      <DialogContent className='rounded-xl border border-emerald-500/20 bg-black/80 p-0 shadow-xl backdrop-blur-sm sm:max-w-[400px]'>
        <DialogHeader className='p-6 pb-0'>
          <DialogTitle className='text-xl font-medium text-white'>{title}</DialogTitle>
          <DialogDescription className='-mt-1 text-sm text-white/60'>{description}</DialogDescription>
        </DialogHeader>

        {status === 'success' && (
          <div className='animate-fade-in flex flex-col items-center justify-center p-8'>
            <div className='animate-scale-in mb-4 rounded-full bg-green-900/20 p-4'>
              <CheckCircle2 className='h-12 w-12 text-green-500' />
            </div>
            <p className='text-center font-medium text-green-400'>Pagamento processado com sucesso!</p>
          </div>
        )}

        {status === 'error' && (
          <div className='animate-fade-in flex flex-col items-center justify-center p-4'>
            <div className='animate-scale-in mb-4 rounded-full bg-red-900/20 p-4'>
              <XCircle className='h-10 w-10 text-red-500' />
            </div>
            <p className='mb-2 text-center font-medium text-red-400'>Falha ao processar o pagamento</p>
            <p className='text-center text-sm text-red-400/70'>Verifique os dados do cartão e tente novamente</p>
          </div>
        )}

        {status === 'idle' && (
          <form onSubmit={handleSubmit} className='space-y-4 p-6 pt-4'>
            <div className='space-y-1'>
              <Label htmlFor='name' className='text-sm font-normal text-white/60'>
                Nome no cartão
              </Label>
              <Input
                id='name'
                name='name'
                placeholder='Nome como está no cartão'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`h-10 border-emerald-500/20 bg-black/40 text-white focus:border-emerald-500/30 focus:ring-0 ${
                  touched.name && errors.name ? 'border-red-500' : ''
                }`}
              />
              {touched.name && errors.name && <p className='mt-1 text-xs text-red-500'>{errors.name}</p>}
            </div>
            <div className='space-y-1'>
              <Label htmlFor='number' className='text-sm font-normal text-white/60'>
                Número do cartão
              </Label>
              <Input
                id='number'
                name='number'
                placeholder='0000 0000 0000 0000'
                value={values.number}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`h-10 border-emerald-500/20 bg-black/40 text-white focus:border-emerald-500/30 focus:ring-0 ${
                  touched.number && errors.number ? 'border-red-500' : ''
                }`}
              />
              {touched.number && errors.number && <p className='mt-1 text-xs text-red-500'>{errors.number}</p>}
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <Label htmlFor='expiry' className='text-sm font-normal text-white/60'>
                  Validade
                </Label>
                <Input
                  id='expiry'
                  name='expiry'
                  placeholder='MM/YY'
                  value={values.expiry}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`h-10 border-emerald-500/20 bg-black/40 text-white focus:border-emerald-500/30 focus:ring-0 ${
                    touched.expiry && errors.expiry ? 'border-red-500' : ''
                  }`}
                />
                {touched.expiry && errors.expiry && <p className='mt-1 text-xs text-red-500'>{errors.expiry}</p>}
              </div>
              <div className='space-y-1'>
                <Label htmlFor='cvv' className='text-sm font-normal text-white/60'>
                  CVV
                </Label>
                <Input
                  id='cvv'
                  name='cvv'
                  placeholder='123'
                  value={values.cvv}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`h-10 border-emerald-500/20 bg-black/40 text-white focus:border-emerald-500/30 focus:ring-0 ${
                    touched.cvv && errors.cvv ? 'border-red-500' : ''
                  }`}
                />
                {touched.cvv && errors.cvv && <p className='mt-1 text-xs text-red-500'>{errors.cvv}</p>}
              </div>
            </div>

            <Button
              type='submit'
              className='mt-6 h-10 w-full bg-emerald-500 font-medium text-white hover:bg-emerald-600'
              disabled={is_loading}
            >
              {is_loading ? 'Processando...' : button_text}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
