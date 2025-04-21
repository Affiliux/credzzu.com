'use client'

import React, { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

import type { DebtorProps, DeleteDebtorPayloadProps } from '@/interfaces/dashboard'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { SuccessAnimation } from '@/components/ui/success-animation'

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
      <DialogContent className='rounded-xl border border-emerald-500/20 bg-black/80 shadow-xl backdrop-blur-sm sm:max-w-[400px]'>
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
                <Button variant='outline' className='h-10' onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
                <Button
                  className='h-10 bg-red-500 text-white hover:bg-red-600'
                  onClick={handleDelete}
                  disabled={is_loading}
                >
                  {is_loading ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Excluindo...
                    </>
                  ) : (
                    'Confirmar'
                  )}
                </Button>
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
