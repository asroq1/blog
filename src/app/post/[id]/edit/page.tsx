'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import TiptapEditor from '@/components/ui/TiptapEditor'
import { Button } from '@/components/ui/button'
import BackButton from '@/components/ui/BackButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { updatePost } from '@/app/firebase/post'
import MultipleImageUpload from '@/components/ui/MultipleImageUpload'
import MainImageUpload from '@/components/ui/MainImageUpload'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { storage } from '@/app/firebase/firebase'
import { useUpdate } from '@/app/hooks/usePost'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import AlertMessage from '@/components/ui/AlertMessage'

interface Post {
  docId: string
  title: string
  content: string
  thumbnailUrl: string | null
  detailImageUrls: string[]
}
const queryClient = new QueryClient()

const uploadImage = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `images/${Date.now()}-${file.name}`)
  const snapshot = await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(snapshot.ref)
  return downloadURL
}

export default function EditPost() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const { data: post, isLoading } = useUpdate(params.id)
  const [updatedPost, setUpdatedPost] = useState<Post | null>(post?.content)
  const [imageFiles, setImageFiles] = useState<{ main: File | null; details: File[] }>({
    main: null,
    details: [],
  })

  console.log('updatedPost', updatedPost)
  // 게시물 수정 뮤테이션
  const postMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Post }) => updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', params.id] })
      router.push(`/post/${params.id}`)
    },
  })

  // 썸네일 이미지 삭제 핸들러
  const handleMainImageDelete = () => {
    setUpdatedPost((prev) => ({
      ...prev,
      thumbnailUrl: null,
    }))
  }

  // 썸네일 이미지 업로드 핸들러
  const handleMainImageUpload = (file: File) => {
    setImageFiles((prev) => ({ ...prev, main: file }))
    setUpdatedPost((prev) => ({
      ...prev,
      thumbnailUrl: URL.createObjectURL(file),
    }))
  }

  // 디테일 이미지 다중 삭제 핸들러
  const handleDetailImagesDelete = (deletedUrls: string[]) => {
    setUpdatedPost((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        detailImageUrls: prev.detailImageUrls.filter((url) => !deletedUrls.includes(url)),
      }
    })
  }

  // 디테일 이미지 업로드 핸들러
  const handleMultipleImagesUpload = (files: File[]) => {
    setImageFiles((prev) => ({
      ...prev,
      details: [...prev.details, ...files],
    }))
    setUpdatedPost((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        detailImageUrls: [
          ...(prev.detailImageUrls || []),
          ...files.map((f) => URL.createObjectURL(f)),
        ],
      }
    })
  }

  // 에디터 변경 핸들러
  const handleEditorChange = (newContent: string) => {
    setUpdatedPost((prev) => ({
      ...prev,
      content: newContent,
    }))
  }

  // 게시물 업데이트 핸들러
  const handleUpdate = async () => {
    if (!imageFiles.main && !updatedPost?.thumbnailUrl) {
      setShowAlert(true)
      return
    }

    try {
      setLoading(true)
      const updatedData = { ...updatedPost }
      delete updatedData.docId

      if (imageFiles.main) {
        updatedData.thumbnailUrl = await uploadImage(imageFiles.main)
      }

      const newDetailImages = await Promise.all(imageFiles.details.map(uploadImage))
      updatedData.detailImageUrls = [
        ...updatedPost.detailImageUrls.filter((url) => !url.startsWith('blob:')),
        ...newDetailImages,
      ]

      await postMutation.mutateAsync({
        // mutateAsync 사용
        id: post.docId,
        data: updatedData,
      })

      await queryClient.invalidateQueries(['post', params.id])
      router.push(`/post/${params.id}`)
    } catch (error) {
      console.error('Update failed:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (post) {
      setUpdatedPost(post)
    }
  }, [post])
  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <AlertMessage
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        title="이미지 필요"
        message="썸네일 이미지를 넣어주세요."
      />
      <div className="bg-background min-h-screen">
        <div className="flex items-center justify-between p-4">
          <BackButton location="post" />
        </div>
        <div className="mx-auto max-w-4xl space-y-8 p-4">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h2 className="mb-2 text-xl font-semibold">썸네일 이미지</h2>
              <MainImageUpload
                onImageUpload={handleMainImageUpload}
                onImageDelete={handleMainImageDelete}
                initialImage={post?.thumbnailUrl}
              />
            </div>
            <div>
              <h2 className="mb-2 text-xl font-semibold">상세 이미지</h2>
              <MultipleImageUpload
                onImagesUpload={handleMultipleImagesUpload}
                onImagesDelete={handleDetailImagesDelete} // 추가
                initialImages={post?.detailImageUrls}
              />
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-4xl space-y-6 p-4">
          {/* <Card>
          <CardHeader>
            <CardTitle>제목 수정</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              placeholder="제목을 입력하세요"
            />
          </CardContent>
        </Card> */}

          <Card>
            <CardHeader>
              <CardTitle>내용 수정</CardTitle>
            </CardHeader>
            <CardContent>
              <TiptapEditor content={updatedPost?.content} onChange={handleEditorChange} />
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
