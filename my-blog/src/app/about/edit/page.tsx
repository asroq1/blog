'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import TiptapEditor from '@/components/ui/TiptapEditor'
import { Button } from '@/components/ui/button'
import BackButton from '@/components/ui/BackButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { updatePost } from '@/app/firebase/post'
import MultipleImageUpload from '@/components/ui/MultipleImageUpload'
import MainImageUpload from '@/components/ui/MainImageUpload'

interface EditAboutProps {
  params: {
    id: string
  }
}

export default function EditAbout({ params }: EditAboutProps) {
  const router = useRouter()
  const [post, setPost] = useState({
    title: '',
    content: '',
    images: [],
  })

  // 기존 데이터 불러오기
  //   useEffect(() => {
  //     // Firebase에서 데이터 불러오기 (임시로 더미데이터 사용)
  //     setPost({
  //       title: dummyData.title,
  //       content: dummyData.description,
  //       images: dummyData.images,
  //     })
  //   }, [params.id])

  const handleMainImageUpload = (file: File) => {
    console.log('Main image uploaded:', file)
    // 여기에서 파일을 서버로 업로드하거나 상태를 업데이트할 수 있습니다.
  }

  const handleUpdate = async () => {
    try {
      await updatePost(params.id, {
        title: post.title,
        content: post.content,
        images: post.images,
      })
      router.push(`/posts/${params.id}`)
    } catch (error) {
      console.error('Update failed:', error)
    }
  }
  return (
    <div className="bg-background min-h-screen">
      <div className="flex items-center justify-between p-4">
        <BackButton location="post" isHidden={true} />
        <Button onClick={handleUpdate}>저장하기</Button>
      </div>
      <div className="mx-auto max-w-4xl space-y-8 p-4">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="mb-2 text-xl font-semibold">이미지</h2>
            <MainImageUpload onImageUpload={handleMainImageUpload} />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-4xl space-y-6 p-4">
        <Card>
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
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>내용 수정</CardTitle>
          </CardHeader>
          <CardContent>
            <TiptapEditor
              content={post.content}
              onChange={(newContent) => setPost({ ...post, content: newContent })}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
