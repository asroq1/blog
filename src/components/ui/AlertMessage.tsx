// components/ui/AlertMessage.tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface AlertMessageProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  showCancel?: boolean
  title?: string
  message: string
}

export default function AlertMessage({
  isOpen,
  onClose,
  title = '알림',
  message,
  onConfirm,
  showCancel,
}: AlertMessageProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {showCancel && (
            <Button variant="outline" onClick={onClose}>
              취소
            </Button>
          )}
          <AlertDialogAction asChild>
            <Button onClick={onConfirm || onClose}>확인</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
