// components/Login.tsx
'use client'

import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '@/app/firebase/firebase'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      const result = await signInWithPopup(auth, googleProvider)

      // Firebase Console에서 설정한 관리자 이메일과 비교
      const adminEmails = ['asroq7434@email.com'] // 관리자 이메일 목록
      if (adminEmails.includes(result.user.email || '')) {
        router.push('/admin')
      } else {
        alert('관리자 권한이 없습니다.')
        await auth.signOut()
      }
    } catch (error) {
      console.error('Login failed:', error)
      alert('로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Button onClick={handleGoogleLogin} disabled={loading}>
        {loading ? '로그인 중...' : 'Google로 관리자 로그인'}
      </Button>
    </div>
  )
}
