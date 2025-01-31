/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/app/firebase/firebase'
// import EmblaCarousel from '@/components/ui/EmblaCarousel'
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
  const [currentSlide, setCurrentSlide] = useState(0)

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
    <main className="laptop:w-full mx-auto flex h-screen w-[90%]">
      <div className="laptop:container laptop:mx-auto laptop:px-4 flex w-full items-center">
        <div className="laptop:h-[600px] flex h-[400px] w-full flex-col gap-4">
          <EmblaCarousel className="h-full w-full" slides={posts} onSlideChange={setCurrentSlide} />
          <div className="flex h-16 items-start">
            <h3 className="text-center text-lg">{posts[currentSlide]?.title}</h3>
          </div>
        </div>
      </div>
    </main>
  )
}
