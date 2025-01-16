import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = () => {
  const router = useRouter()
  const handleClick = () => {
    router.back()
  }
  return <button onClick={handleClick}>뒤로가기</button>
}

export default BackButton
