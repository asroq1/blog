import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CarouselProps {
  slides: {
    id: number
    image: string
    title: string
  }[]
  autoplay?: boolean
  showDots?: boolean
}

export default function EmblaCarousel({
  slides,
  autoplay = true,
  showDots = false,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    ...(autoplay && { autoplay: { delay: 1000 } }),
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return

    // 현재 슬라이드 인덱스 추적
    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    })
  }, [emblaApi])

  return (
    <div className="laptop:h-[300px] relative mx-auto w-full max-w-[800px] bg-black">
      {/* 캐러셀 기본 구조 */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.id} className="relative min-w-0 flex-[0_0_100%]">
              <Link href={`/post/${slide.id}`}>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  key={slide.title}
                  width={500}
                  height={50}
                  className="h-[400px] w-full object-cover"
                />
              </Link>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
                <h3 className="text-lg text-white">{slide.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 도트 네비게이션 - z-index 추가 및 위치 조정 */}
      {showDots && (
        <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-2 ">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full transition-colors ${
                index === selectedIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
