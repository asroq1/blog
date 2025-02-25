// components/TiptapViewer.tsx
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

interface ViewerProps {
  content: string
}

const TiptapViewer = ({ content }: ViewerProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-md max-w-full',
        },
      }),
    ],
    content: content, // 내용 전달
    immediatelyRender: false, // Mismatch 설정
    editable: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg max-w-none',
      },
    },
  })

  if (!editor) return null

  return <EditorContent editor={editor} />
}

export default TiptapViewer
