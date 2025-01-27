'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/app/firebase/firebase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('user:', user)
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { user, loading, isAuthenticated: !!user }
}
