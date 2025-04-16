'use client'

import React, { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import type { DebtorProps, DeleteDebtorPayloadProps } from '@/application/interfaces/dashboard'

import { Button } from '@/presentation/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/presentation/components/ui/dialog'
import { SuccessAnimation } from '@/presentation/components/ui/success-animation'

interface DeleteDialogProps {
  children: React.ReactNode
  open: boolean
  debtor: DebtorProps
  onDelete: (data: DeleteDebtorPayloadProps) => Promise<void>
  onOpenChange: (open: boolean) => void
}

export function DeleteDialog({ debtor, onDelete, children, open, onOpenChange }: DeleteDialogProps) {
  // states
  const [is_loading, set_is_loading] = useState<boolean>(false)
  const [is_success, set_is_success] = useState<boolean>(false)

  // handlers
  async function handleDelete() {
    set_is_loading(true)

    try {
      await onDelete({ id: debtor.id })
      set_is_success(true)

      setTimeout(() => {
        onOpenChange(false)
        set_is_success(false)
      }, 2000)
    } catch (error) {
      console.error(error)
    } finally {
      set_is_loading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <AnimatePresence mode='wait'>
          {is_success ? (
            <SuccessAnimation message='Devedor excluído com sucesso!' />
          ) : (
            <motion.div
              key='delete-content'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle>Deletar Devedor</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja deletar o devedor {debtor.name}? Esta ação não pode ser desfeita.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className='mt-8 flex gap-2'>
                <Button variant='outline' onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
                <Button variant='destructive' onClick={handleDelete} disabled={is_loading}>
                  {is_loading ? 'Excluindo...' : 'Confirmar'}
                </Button>
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
