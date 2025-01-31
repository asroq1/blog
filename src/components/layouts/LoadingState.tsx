// components/ui/states/LoadingState.tsx
import { Skeleton } from '@/components/ui/skeleton'

export const LoadingState = () => {
  return (
    <div className="space-y-8 p-4">
      <div className="aspect-[4/3] w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  )
}

// components/ui/states/ErrorState.tsx
import { AlertCircle } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

export const ErrorState = ({ message }: { message: string }) => {
  return (
    <div className="p-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          관리자에게 문의해주세요.
          <br />
          {message}
        </AlertDescription>
      </Alert>
    </div>
  )
}

// components/ui/states/EmptyState.tsx
import { FileQuestion } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const EmptyState = () => {
  return (
    <Card className="mx-auto my-8 max-w-md">
      <CardContent className="flex flex-col items-center gap-4 p-6">
        <FileQuestion className="text-muted-foreground h-12 w-12" />
        <h3 className="text-lg font-semibold">데이터를 찾을 수 없습니다</h3>
        <p className="text-muted-foreground text-sm">요청하신 데이터가 존재하지 않습니다.</p>
      </CardContent>
    </Card>
  )
}
