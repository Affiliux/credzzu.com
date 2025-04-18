import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { DeleteDebtPayloadProps } from '@/application/interfaces/dashboard'
import { Button } from '@/presentation/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/presentation/components/ui/dialog'
import { SuccessAnimation } from '@/presentation/components/ui/success-animation'

interface DeleteDebtDialogProps {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  onDelete: (data: DeleteDebtPayloadProps) => Promise<void>
  debtId: string
}

export function DeleteDebtDialog({ children, open, onOpenChange, onDelete, debtId }: DeleteDebtDialogProps) {
  const [is_loading, set_is_loading] = useState<boolean>(false)
  const [is_success, set_is_success] = useState<boolean>(false)
  const [error, set_error] = useState<string | null>(null)

  async function handleDelete() {
    set_is_loading(true)
    set_error(null)

    try {
      await onDelete({ id: debtId })
      set_is_success(true)

      setTimeout(() => {
        onOpenChange(false)
        set_is_success(false)
      }, 2000)
    } catch (err) {
      set_error('Erro ao excluir dívida')
      setTimeout(() => {
        set_error(null)
      }, 1500)
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
            <SuccessAnimation message='Dívida excluída com sucesso!' />
          ) : (
            <motion.div
              key='dialog-content'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle>Excluir Dívida</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja excluir esta dívida? Esta ação não pode ser desfeita.
                </DialogDescription>
              </DialogHeader>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className='mt-4 rounded-md bg-red-50 p-4 text-red-600'
                  >
                    <div className='flex items-center'>
                      <X className='mr-2 h-4 w-4' />
                      <p>{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className='mt-6 flex justify-end gap-2'>
                <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
                <Button type='button' variant='destructive' onClick={handleDelete} disabled={is_loading}>
                  {is_loading ? 'Excluindo...' : 'Excluir'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
