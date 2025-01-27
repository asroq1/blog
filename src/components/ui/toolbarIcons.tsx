// components/editor/toolbar-icons.tsx
import { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRef } from 'react'
import { storage } from '@/app/firebase/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

interface IconButtonProps {
  editor: Editor
}

export function H1({ editor }: IconButtonProps) {
  return (
    <Button
      variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'}
      size="sm"
      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
    >
      <Image src="/icons/icon-h1.svg" alt="H1" width={24} height={24} />
    </Button>
  )
}

export function H2({ editor }: IconButtonProps) {
  return (
    <Button
      variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'}
      size="sm"
      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
    >
      <Image src="/icons/icon-h2.svg" alt="H2" width={24} height={24} />
    </Button>
  )
}

export function H3({ editor }: IconButtonProps) {
  return (
    <Button
      variant={editor.isActive('heading', { level: 3 }) ? 'secondary' : 'ghost'}
      size="sm"
      onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
    >
      <Image src="/icons/icon-h3.svg" alt="H3" width={24} height={24} />
    </Button>
  )
}

export function Bold({ editor }: IconButtonProps) {
  return (
    <Button
      variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
      size="sm"
      onClick={() => editor.chain().focus().toggleBold().run()}
    >
      <Image src="/icons/icon-bold.svg" alt="Bold" width={24} height={24} />
    </Button>
  )
}

export function Italic({ editor }: IconButtonProps) {
  return (
    <Button
      variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
      size="sm"
      onClick={() => editor.chain().focus().toggleItalic().run()}
    >
      <Image src="/icons/icon-italic.svg" alt="Italic" width={24} height={24} />
    </Button>
  )
}

export function Strikethrough({ editor }: IconButtonProps) {
  return (
    <Button
      variant={editor.isActive('strike') ? 'secondary' : 'ghost'}
      size="sm"
      onClick={() => editor.chain().focus().toggleStrike().run()}
    >
      <Image src="/icons/icon-strike.svg" alt="Strike" width={24} height={24} />
    </Button>
  )
}

export function Quote({ editor }: IconButtonProps) {
  return (
    <Button
      variant={editor.isActive('blockquote') ? 'secondary' : 'ghost'}
      size="sm"
      onClick={() => editor.chain().focus().toggleBlockquote().run()}
    >
      <Image src="/icons/icon-quote.svg" alt="Quote" width={24} height={24} />
    </Button>
  )
}

export function AddPhoto({ editor }: { editor: Editor }) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.includes('image/')) {
      alert('이미지 파일만 업로드 가능합니다.')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('10MB 이하의 이미지만 업로드 가능합니다.')
      return
    }

    // 파일을 Base64로 변환
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64String = e.target?.result as string
      // 에디터에 Base64 이미지 삽입
      editor.chain().focus().setImage({ src: base64String }).run()
    }
    reader.readAsDataURL(file)

    // 입력 필드 초기화
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => inputRef.current?.click()}
        title="이미지 업로드"
      >
        <Image src="/icons/icon-image.svg" alt="Add Image" width={24} height={24} />
      </Button>
    </>
  )
}
