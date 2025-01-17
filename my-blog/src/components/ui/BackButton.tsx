import { useRouter } from 'next/navigation'
import React from 'react'
import BackIcon from '../../../public/icon-back.svg'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
const BackButton = () => {
  const router = useRouter()
  const handleClick = () => {
    router.back()
  }
  return (
    <Button variant="ghost" className="pl-0" onClick={handleClick}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      뒤로가기
    </Button>
  )
}

export default BackButton
