'use client'

import { useAuth } from '@/app/hooks/useAuth'
import { ReactNode } from 'react'

interface AuthGuardProps {
  children: ReactNode
  fallback?: ReactNode
}

// 로그인한 사용자만 볼 수 있는 컴포넌트
export function AuthRequired({ children, fallback = null }: AuthGuardProps) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <></>
  if (!isAuthenticated) return fallback

  return <>{children}</>
}

// 로그인하지 않은 사용자만 볼 수 있는 컴포넌트
export function AuthNotRequired({ children, fallback = null }: AuthGuardProps) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <></>
  if (isAuthenticated) return fallback

  return <>{children}</>
}
