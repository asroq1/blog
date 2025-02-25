/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/app/firebase/firebase'
import LoadingComponent from '@/components/ui/LoadingComponent'
import dynamic from 'next/dynamic'
import { LoadingState } from '@/components/layouts/LoadingState'

// 동적 임포트로 클라이언트 사이드에서만 로드
const EmblaCarousel = dynamic(() => import('@/components/ui/EmblaCarousel'), {
  ssr: false,
  loading: () => <LoadingComponent isLoading={true} text="" size="lg" />,
})

export default function Home() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'))
        const postsData = querySnapshot.docs.map((doc) => ({
          id: Number(doc.data().id),
          title: doc.data().title,
          thumbnail: doc.data().thumbnailUrl,
          content: doc.data().content || '',
        }))
        setPosts(postsData)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) return <LoadingState />
  return (
    <main className="laptop:w-full mx-auto flex h-[calc(100vh-62px)] w-[90%]">
      <div className="flex w-full items-center">
        <div className="h-full w-full flex-col gap-4">
          <EmblaCarousel
            // 캐러셀 높이도 헤더 높이만큼 빼기
            className="laptop:h-[calc(100vh-62px)] h-[60vh] w-full"
            slides={posts}
          />
        </div>
      </div>
    </main>
  )
}
