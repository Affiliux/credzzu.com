'use client'

import React, { useState } from 'react'

import { AlertTriangle } from 'lucide-react'

import { Button } from '@/presentation/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/presentation/components/ui/dialog'

export function CancellationModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
}) {
  const [loading, set_loading] = useState(false)

  async function handleConfirm() {
    set_loading(true)

    try {
      await onConfirm()
      onClose()
    } catch (error) {
      console.error('Failed to cancel subscription:', error)
    } finally {
      set_loading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className='rounded-xl border border-emerald-500/20 bg-black/80 p-0 shadow-xl backdrop-blur-sm sm:max-w-[400px]'>
        <DialogHeader className='p-6 pb-2'>
          <DialogTitle className='text-xl font-medium text-white'>Cancelar assinatura</DialogTitle>
          <DialogDescription className='text-sm text-white/60'>
            Tem certeza que deseja cancelar sua assinatura?
          </DialogDescription>
        </DialogHeader>

        <div className='px-6 py-4'>
          <div className='flex items-start rounded-lg bg-amber-900/20 p-4'>
            <AlertTriangle className='mr-3 h-5 w-5 shrink-0 text-amber-400' />
            <div className='text-sm text-white/80'>
              <p>Ao cancelar:</p>
              <ul className='mt-2 ml-5 list-disc space-y-1'>
                <li>Você perderá acesso aos recursos premium após o término do período atual</li>
                <li>Você não será cobrado novamente</li>
                <li>Você pode reativar a qualquer momento</li>
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter className='flex flex-row gap-2 p-6 pt-2'>
          <Button
            variant='outline'
            className='h-10 flex-1 border-emerald-500/30 bg-black/40 text-white hover:bg-emerald-500/10 hover:text-emerald-400'
            onClick={onClose}
            disabled={loading}
          >
            Voltar
          </Button>
          <Button
            className='h-10 flex-1 bg-red-600 text-white hover:bg-red-700'
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Confirmar cancelamento'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
