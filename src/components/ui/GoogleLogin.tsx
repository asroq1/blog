// components/GoogleLoginButton.tsx
'use client'

import { signInWithRedirect, getRedirectResult } from 'firebase/auth'
import { auth, googleProvider } from '@/app/firebase/firebase'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function GoogleLoginButton() {
  const router = useRouter()

  useEffect(() => {
    // 리다이렉트 결과 처리
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          router.push('/')
        }
      })
      .catch((error) => {
        console.error('로그인 실패:', error)
      })
  }, [router])

  const handleGoogleLogin = async () => {
    try {
      await signInWithRedirect(auth, googleProvider)
    } catch (error) {
      console.error('로그인 실패:', error)
    }
  }

  return <Button onClick={handleGoogleLogin}>Google로 로그인</Button>
}
