'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function PostingButton() {
  const router = useRouter()

  const handleLPosting = () => {
    router.push('/admin/posting')
  }
  return (
    <Button onClick={handleLPosting} className="text-sm">
      작성하기
    </Button>
  )
}
