import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '@/components/ui/button'
import EditIcon from '../../../public/icons/icon-edit.svg'
import RemoveIcon from '../../../public/icons/icon-remove.svg'
import { ArrowLeft } from 'lucide-react'
import { AuthRequired } from '@/lib/AuthGuard'

type location = 'post' | 'about'
interface EditPostProps {
  location: location
  isHidden?: boolean
  id?: string
}

const BackButton = ({ location, id, isHidden }: EditPostProps) => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/')
  }

  const handleEdit = () => {
    if (id) {
      router.push(`/${location}/${id}/edit`)
    } else {
      router.push(`/${location}/edit`)
    }
  }
  return (
    <div className="flex items-center justify-between p-4">
      <Button variant="ghost" className="pl-0" onClick={handleClick}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        뒤로가기
      </Button>
      {isHidden ? (
        <></>
      ) : (
        <AuthRequired>
          <div className="flex gap-4">
            <EditIcon className="h-6 w-6 cursor-pointer" onClick={handleEdit} />
            <RemoveIcon className="h-6 w-6 cursor-pointer" />
          </div>
        </AuthRequired>
      )}
    </div>
  )
}

export default BackButton
