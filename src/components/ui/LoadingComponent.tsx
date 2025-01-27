'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

const loadingVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      default: 'h-8 w-8',
      sm: 'h-6 w-6',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    },
    variant: {
      default: 'opacity-100',
      pulse: 'animate-pulse',
      dots: '',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
})

interface LoadingProps extends VariantProps<typeof loadingVariants> {
  text?: string
  className?: string
}

function Loading({ text, size, variant, className }: LoadingProps) {
  const [dots, setDots] = useState('')

  useEffect(() => {
    if (variant === 'dots') {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? '' : prev + '.'))
      }, 500)
      return () => clearInterval(interval)
    }
  }, [variant])

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {variant !== 'dots' && (
        <Loader2 className={cn(loadingVariants({ size, variant }), className)} />
      )}
      {text && (
        <p className="text-primary text-lg font-medium">
          {text}
          {variant === 'dots' && dots}
        </p>
      )}
    </div>
  )
}

interface FullScreenLoadingProps extends LoadingProps {
  isLoading: boolean
  blur?: 'sm' | 'md' | 'lg'
  backgroundColor?: string
}

export default function LoadingComponent({
  isLoading,
  blur = 'md',
  backgroundColor = 'bg-black/50',
  ...props
}: FullScreenLoadingProps) {
  if (!isLoading) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        backgroundColor,
        `backdrop-blur-${blur}`
      )}
    >
      <Loading {...props} />
    </div>
  )
}
