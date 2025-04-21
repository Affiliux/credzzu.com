'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface SuccessAnimationProps {
  message: string
  onComplete?: () => void
}

export function SuccessAnimation({ message, onComplete }: SuccessAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className='flex h-full flex-col items-center justify-center space-y-4'
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        className='rounded-full bg-green-500/10 p-4'
      >
        <Check className='h-8 w-8 text-green-500' />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='text-center text-lg font-medium text-neutral-100'
      >
        {message}
      </motion.p>
    </motion.div>
  )
}
