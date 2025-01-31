'use client'

import { signOut } from 'firebase/auth'
import { auth } from '@/app/firebase/firebase'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      // 세션 쿠키 삭제
      await fetch('/api/session/logout', {
        method: 'POST',
      })
      router.push('/')
      // console.log('Logout successful')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return <Button onClick={handleLogout}>로그아웃</Button>
}
