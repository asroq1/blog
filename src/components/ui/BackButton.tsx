import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  classNmae?: string
  location?: string
}
const BackButton = ({ classNmae, location }: BackButtonProps) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(location ? `/${location}` : '/')
  }

  return (
    <>
      <div className={`${classNmae} flex items-center justify-between p-4`}>
        <Button variant="ghost" className="pl-0" onClick={handleClick}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          뒤로가기
        </Button>
      </div>
    </>
  )
}

export default BackButton
