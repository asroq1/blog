// app/admin/write/page.tsx
'use client'

import { useState } from 'react'
import TiptapEditor from '@/components/ui/TiptapEditor'
import { Button } from '@/components/ui/button'
import MultipleImageUpload from '@/components/ui/MultipleImageUpload'
import MainImageUpload from '@/components/ui/MainImageUpload'
import BackButton from '@/components/ui/BackButton'

export default function PostingPage() {
  const [editorContent, setEditorContent] = useState('')

  const handleSubmit = async () => {
    console.log('저장된 내용:', editorContent)
  }

  const handleChange = (newContent: string) => {
    setEditorContent(newContent)
  }

  const handleMainImageUpload = (file: File) => {
    console.log('Main image uploaded:', file)
    // 여기에서 파일을 서버로 업로드하거나 상태를 업데이트할 수 있습니다.
  }

  const handleMultipleImagesUpload = (files: File[]) => {
    console.log('Multiple images uploaded:', files)
    // 여기에서 파일들을 서버로 업로드하거나 상태를 업데이트할 수 있습니다.
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4">
      <BackButton location="post" isHidden={true} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">썸네일 이미지</h2>
          <MainImageUpload onImageUpload={handleMainImageUpload} />
        </div>
        <div>
          <h2 className="mb-2 text-xl font-semibold">상세 이미지</h2>
          <MultipleImageUpload onImagesUpload={handleMultipleImagesUpload} />
        </div>
      </div>
      <TiptapEditor content={editorContent} onChange={handleChange} />
      <Button onClick={handleSubmit} className="w-full">
        저장하기
      </Button>
    </div>
  )
}
