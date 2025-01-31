/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { usePost } from '@/app/hooks/usePost'
import { EmptyState, ErrorState, LoadingState } from '@/components/layouts/LoadingState'
import { ActionButtons } from '@/components/ui/ActionButtons'
import BackButton from '@/components/ui/BackButton'
import DetailCarousel from '@/components/ui/DetailCarousel'
import TiptapViewer from '@/components/ui/TiptapViewer'
import { useParams } from 'next/navigation'
import React from 'react'

const PostDetail = () => {
  const params = useParams()
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

  // console.log('post', post)
  // thumbnailUrl을 포함한 새로운 이미지 배열 생성
  const allImages = [post?.thumbnailUrl, ...post?.detailImageUrls]
  // console.log('allImages', allImages)
  return (
    <>
      <div className="bg-background mx-auto my-0 flex  w-[90%] items-center justify-between p-2">
        <BackButton classNmae="bg-background" />
        <ActionButtons id={params.id} location="post" />
      </div>
      <div className="laptop:items-center mx-auto  my-0 flex min-h-screen  w-[90%] items-start justify-center gap-6 bg-white p-4">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <section className="w-full">
            <DetailCarousel slides={allImages} title={post?.title} />
          </section>
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
