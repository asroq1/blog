'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface MultipleImageUploadProps {
  onImagesUpload: (files: File[]) => void
}

export default function MultipleImageUpload({ onImagesUpload }: MultipleImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onImagesUpload(acceptedFiles)
      const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file))
      setPreviews((prev) => [...prev, ...newPreviews])
    },
    [onImagesUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  })

  const removeImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index))
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
        <p>이미지를 드래그하여 놓거나 클릭하여 선택하세요 (여러 개 가능)</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative">
            <Image
              src={preview || '/placeholder.svg'}
              alt={`Uploaded image ${index + 1}`}
              width={200}
              height={150}
              className="h-auto w-full rounded-lg"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => removeImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
