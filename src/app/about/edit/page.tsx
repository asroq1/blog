'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import TiptapEditor from '@/components/ui/TiptapEditor'
import { Button } from '@/components/ui/button'
import BackButton from '@/components/ui/BackButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import MainImageUpload from '@/components/ui/MainImageUpload'
import AlertMessage from '@/components/ui/AlertMessage'
import { useAbout, useUpdateAbout } from '@/app/hooks/useAbout'

interface About {
  content: string
  aboutUrl: string | null
}

export default function EditAbout() {
  const router = useRouter()
  const [showAlert, setShowAlert] = useState(false)
  const { data: about, isLoading } = useAbout()
  const updateMutation = useUpdateAbout()
  const [updatedContent, setUpdatedContent] = useState<About | null>(null)
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isImageChanged, setIsImageChanged] = useState(false)

  // 어바웃 이미지 삭제 핸들러
  const handleMainImageDelete = () => {
    setImageFile(null)
  }

  // 어바웃 이미지 업로드 핸들러
  const handleMainImageUpload = (file: File) => {
    setImageFile(file)
    setIsImageChanged(true)
  }

  // 어바웃 컨텐츠 수정 핸들러
  const handleEditorChange = (newContent: string) => {
    setUpdatedContent({ content: newContent, aboutUrl: about?.aboutUrl ?? null })
  }

  const handleUpdate = async () => {
    if (!updatedContent) return

    // 이미지 검증 로직 수정
    if (!imageFile && !about?.aboutUrl && isImageChanged) {
      setShowAlert(true)
      return
    }

    try {
      setLoading(true)
      await updateMutation.mutateAsync({
        content: updatedContent.content,
        imageFile: isImageChanged ? imageFile : undefined,
        existingImageUrl: !isImageChanged ? about?.aboutUrl : undefined,
      })
      router.push('/about')
    } catch (error) {
      console.error('Update failed:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (about?.content) {
      setUpdatedContent({ content: about.content, aboutUrl: about?.aboutUrl ?? null })
    }
    if (about?.aboutUrl) {
      setImageFile(about?.aboutUrl)
    }
  }, [about])

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <AlertMessage
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        title="이미지 필요"
        message="프로필 이미지를 넣어주세요."
      />
      <div className="bg-background container mx-auto min-h-screen">
        <div className="flex items-center justify-between p-4">
          <BackButton />
        </div>
        <div className="mx-auto max-w-4xl space-y-8 p-4">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h2 className="mb-2 text-xl font-semibold">프로필 이미지</h2>
              <MainImageUpload
                onImageUpload={handleMainImageUpload}
                onImageDelete={handleMainImageDelete}
                initialImage={about?.aboutUrl}
              />
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-4xl space-y-6 p-4">
          <Card>
            <CardHeader>
              <CardTitle>내용 수정</CardTitle>
            </CardHeader>
            <CardContent>
              <TiptapEditor content={updatedContent?.content || ''} onChange={handleEditorChange} />
            </CardContent>
          </Card>
          <Button className="w-full" disabled={loading} onClick={handleUpdate}>
            {loading ? '저장 중...' : '저장하기'}
          </Button>
        </div>
      </div>
    </>
  )
}
