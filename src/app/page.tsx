/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/app/firebase/firebase'
// import EmblaCarousel from '@/components/ui/EmblaCarousel'
import LoadingComponent from '@/components/ui/LoadingComponent'
import dynamic from 'next/dynamic'
import { LoadingState } from '@/components/layouts/LoadingState'

// \동적 임포트로 클라이언트 사이드에서만 로드
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
        console.log('Posts:', postsData)
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
    <main className="laptop:h-screen laptop:w-full mx-auto  flex h-screen w-[90%] items-center">
      <div className="laptop:container laptop:mx-auto laptop:px-4 w-full">
        <EmblaCarousel
          className="laptop:h-screen h-[400px] w-full object-cover"
          imageClassName="h-screen laptop:h-[600px] object-cover"
          slides={posts}
        />
      </div>
    </main>
  )
}
