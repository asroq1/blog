/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { usePost } from '@/app/hooks/usePost'
import { EmptyState, ErrorState, LoadingState } from '@/components/layouts/LoadingState'
import { ActionButtons } from '@/components/ui/ActionButtons'
import BackButton from '@/components/ui/BackButton'
import LoadingComponent from '@/components/ui/LoadingComponent'
import TiptapViewer from '@/components/ui/TiptapViewer'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

// 동적 임포트로 클라이언트 사이드에서만 로드
const DetailCarousel = dynamic(() => import('@/components/ui/DetailCarousel'), {
  ssr: false,
  loading: () => <LoadingComponent isLoading={true} text="" size="lg" />,
})

const PostDetail = () => {
  const params = useParams()
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  interface Post {
    id: string
    title: string
    content: string
    thumbnailUrl: string
    detailImageUrls: string[]
  }

  const {
    data: post,
    isLoading,
    error,
  } = usePost(Array.isArray(params.id) ? params.id[0] : params.id) as {
    data: Post | null
    isLoading: boolean
    error: any
  }

  if (isLoading) return <LoadingState />
  if (!post) return <EmptyState />
  if (error) return <ErrorState message={`관리자에게 문의해주세요. ${error.message}`} />
  const allImages = [post?.thumbnailUrl, ...post?.detailImageUrls]

  return (
    <>
      <div className="bg-background mx-auto my-0 flex  w-[90%] items-center justify-between p-2">
        <BackButton classNmae="bg-background" />
        <ActionButtons id={params.id} location="post" />
      </div>
      <div className="bg-background">
        {/* 외부 div: 패딩 영역의 배경색 */}
        <div className="laptop:items-center mx-auto my-0 flex w-[90%] items-start justify-center gap-6 bg-white p-4">
          <div className="mx-auto flex w-full flex-col gap-6">
            <section className="flex w-full flex-col gap-4">
              <DetailCarousel slides={allImages} onSlideChange={setCurrentSlideIndex} />
              <div className="flex h-16 items-start">
                <h3 className="text-lg">
                  {post?.title} {currentSlideIndex + 1} / {allImages.length}
                </h3>
              </div>
            </section>
          </div>
        </div>
      </div>
      <section className="mx-auto my-0 flex w-[90%]  items-center justify-center bg-white p-4">
        <div className="w-full">
          <TiptapViewer content={post.content} />
        </div>
      </section>
    </>
  )
}

export default PostDetail
