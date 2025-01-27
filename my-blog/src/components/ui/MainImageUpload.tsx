'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface MainImageUploadProps {
  onImageUpload: (file: File) => void
  onImageDelete: () => void
  initialImage?: string
}

export default function MainImageUpload({
  onImageUpload,
  onImageDelete,
  initialImage,
}: MainImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialImage || null)
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      onImageUpload(file)
      setPreview(URL.createObjectURL(file))
    },
    [onImageUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  })

  const removeImage = () => {
    setPreview(null)
    onImageDelete() // 삭제 이벤트 전달
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-4 text-center ${
          isDragActive ? 'border-primary' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative">
            <Image
              src={preview || '/placeholder.svg'}
              alt="Uploaded image"
              width={400}
              height={300}
              className="h-auto w-full rounded-lg"
              unoptimized
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2"
              onClick={(e) => {
                e.stopPropagation()
                removeImage()
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <p>대표 이미지를 드래그하여 놓거나 클릭하여 선택하세요</p>
        )}
      </div>
    </div>
  )
}
