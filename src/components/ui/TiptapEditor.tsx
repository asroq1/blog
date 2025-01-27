// components/TiptapEditor.tsx
'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Card, CardContent } from '@/components/ui/card'
import Image from '@tiptap/extension-image'
import Highlight from '@tiptap/extension-highlight'
import { useEffect } from 'react'
import {
  H1,
  H2,
  H3,
  Bold,
  Italic,
  Strikethrough,
  Quote,
  // AddPhoto,
} from '@/components/ui/toolbarIcons'

interface ToolBarProps {
  editor: Editor | null
}
function ToolBar({ editor }: ToolBarProps) {
  if (!editor) return null

  return (
    <div className="flex items-center justify-center gap-2 border-b-2 p-6 py-3 sm:gap-8">
      <div className="flex items-center justify-center gap-2">
        <H1 editor={editor} />
        <H2 editor={editor} />
        <H3 editor={editor} />
      </div>
      <div className="flex items-center justify-center gap-2">
        <Bold editor={editor} />
        <Italic editor={editor} />
        <Strikethrough editor={editor} />
      </div>

      <div className="flex items-center justify-center gap-2">
        <Quote editor={editor} />
        {/* <AddPhoto editor={editor} /> */}
      </div>
    </div>
  )
}

interface EditorProps {
  content: string // 초기값을 필수로 변경
  onChange: (content: string) => void
}

const TiptapEditor = ({ content, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Image.configure({
        inline: true,
        allowBase64: true, // 이미지 삽입을 위한 설정, allowBase64 추가
        HTMLAttributes: {
          class: 'rounded-md max-w-full',
        },
      }),
    ],
    content: content, // 초기값 설정
    immediatelyRender: false, // Mismatch 설정
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (content) {
      editor?.commands.setContent(content)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])
  if (!editor) return null

  return (
    <Card>
      <CardContent>
        <ToolBar editor={editor} />
        <EditorContent editor={editor} />
      </CardContent>
    </Card>
  )
}

export default TiptapEditor
