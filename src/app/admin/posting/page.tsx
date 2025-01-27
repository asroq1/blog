// app/admin/write/page.tsx
'use client'

import { useCallback, useEffect, useState } from 'react'
import { createPost } from '@/app/firebase/posting'
import { useRouter } from 'next/navigation'
import BackButton from '@/components/ui/BackButton'
import MainImageUpload from '@/components/ui/MainImageUpload'
import MultipleImageUpload from '@/components/ui/MultipleImageUpload'
import TiptapEditor from '@/components/ui/TiptapEditor'
import { Button } from '@/components/ui/button'
import AlertMessage from '@/components/ui/AlertMessage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function PostingPage() {
  const router = useRouter()
  const [editorContent, setEditorContent] = useState('')
  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [detailImages, setDetailImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [title, setTitle] = useState('')

  // 썸네일 이미지 업로드 핸들러
  const handleMainImageUpload = (file: File) => {
    setThumbnailImage(file)
  }

  // 썸네일 이미지 삭제 핸들러
  const handleMainImageDelete = () => {
    setThumbnailImage(null)
  }

  const handleMultipleImagesUpload = useCallback((files: File[]) => {
    setDetailImages((prev) => [...prev, ...files])
    const newUrls = files.map((file) => URL.createObjectURL(file))
    setPreviewUrls((prev) => [...prev, ...newUrls])
  }, [])

  const handleDetailImagesDelete = useCallback(
    (deletedUrls: string[]) => {
      const indicesToDelete = deletedUrls.map((url) => previewUrls.indexOf(url))
      const updatedImages = detailImages.filter((_, index) => !indicesToDelete.includes(index))
      const updatedUrls = previewUrls.filter((_, index) => !indicesToDelete.includes(index))
      setDetailImages(updatedImages)
      setPreviewUrls(updatedUrls)
    },
    [previewUrls, detailImages]
  )

  const handleSubmit = async () => {
    if (!thumbnailImage) {
      setShowAlert(true)
      return
    }

    try {
      setLoading(true)
      await createPost({
        title,
        thumbnailImage,
        detailImages, // 직접 File[] 전달
        content: editorContent,
      })
      router.push('/')
    } catch (error) {
      console.error('Error:', error)
      alert('포스트 생성에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log('디테일 이미지 상태 변경:', detailImages)
  }, [detailImages])
  return (
    <>
      <AlertMessage
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        title="이미지 필요"
        message="썸네일 이미지를 넣어주세요."
      />
      <div className="mx-auto max-w-4xl space-y-8 p-4">
        <BackButton location="post" isHidden={true} />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="mb-2 text-xl font-semibold">썸네일 이미지</h2>
            <MainImageUpload
              onImageUpload={handleMainImageUpload}
              onImageDelete={handleMainImageDelete}
            />
            {thumbnailImage && (
              <p className="mt-2 text-sm text-gray-600">선택됨: {thumbnailImage.name}</p>
            )}
          </div>
          <div>
            <h2 className="mb-2 text-xl font-semibold">상세 이미지</h2>
            <MultipleImageUpload
              onImagesUpload={handleMultipleImagesUpload}
              onImagesDelete={handleDetailImagesDelete}
              initialImages={previewUrls}
            />
            {detailImages?.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">{detailImages.length}개의 이미지 선택됨</p>
            )}
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>제목</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </CardContent>
        </Card>
        <TiptapEditor content={editorContent} onChange={setEditorContent} />
        <Button onClick={handleSubmit} className="w-full" disabled={loading}>
          {loading ? '저장 중...' : '저장하기'}
        </Button>
      </div>
    </>
  )
}
