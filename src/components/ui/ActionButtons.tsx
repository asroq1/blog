import { AuthRequired } from '@/lib/AuthGuard'
import AlertMessage from './AlertMessage'
import EditIcon from '../../../public/icons/icon-edit.svg'
import RemoveIcon from '../../../public/icons/icon-remove.svg'
import { useRouter } from 'next/navigation'
import { deletePost } from '@/app/hooks/usePost'
import { useState } from 'react'

interface ActionsProps {
  id?: string | string[]
  location: 'post' | 'about'
  onlyEdit?: boolean
  onlyDelete?: boolean
}

export const ActionButtons = ({ id, location }: ActionsProps) => {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  const handleEdit = () => {
    if (id) {
      router.push(`/${location}/${id}/edit`)
    } else {
      router.push(`/${location}/edit`)
    }
  }

  const handleDelete = async () => {
    try {
      await deletePost(id)
      router.push('/')
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  return (
    <>
      <AlertMessage
        isOpen={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        title="포스트 삭제"
        message="정말로 삭제하시겠습니까?"
        onConfirm={handleDelete}
        showCancel
      />
      <AuthRequired>
        <div className="flex gap-4">
          <EditIcon className="h-6 w-6 cursor-pointer" onClick={handleEdit} />
          <RemoveIcon className="h-6 w-6 cursor-pointer" onClick={() => setShowDeleteAlert(true)} />
        </div>
      </AuthRequired>
    </>
  )
}
