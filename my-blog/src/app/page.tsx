'use client'

import EmblaCarousel from '@/components/ui/EmblaCarousel'
import { Slide } from '@/types/slide'

export default function Home() {
  const slides: Slide[] = [
    {
      id: 1,
      image: '/thumb1.jpeg',
      title: '첫 번째 슬라이드',
    },
    {
      id: 2,
      image: '/thumb1.jpeg',
      title: '2 번째 슬라이드',
    },
    {
      id: 3,
      image: '/thumb3.jpeg',
      title: '3 번째 슬라이드',
    },
    {
      id: 4,
      image: '/thumb4.jpeg',
      title: '4 번째 슬라이드',
    },
  ]

  return (
    <main className="h-full w-full ">
      <div className="mx-auto my-0 flex h-screen w-4/5 items-center justify-center bg-white">
        <EmblaCarousel slides={slides} showDots={true} />
      </div>
    </main>
  )
}
