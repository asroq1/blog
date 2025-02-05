import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'

interface CarouselProps {
  currentSlide?: number // 현재 슬라이드 인덱스 추가
  onSlideChange?: (index: number) => void // 슬라이드 변경 핸들러 추가
  slides: {
    id: number
    thumbnail: string
    title: string
  }[]
  className?: string
  imageClassName?: string
  autoplay?: boolean
  showDots?: boolean
}

export default function WorkCarousel({
  slides,
  autoplay = true,
  className,
  onSlideChange,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    ...(autoplay && { autoplay: { delay: 1000 } }),
  })
  const [isFirstSlide, setIsFirstSlide] = useState(false)

  // 현재 슬라이드가 첫번째인지 확인하는 함수
  const updateIsFirstSlide = useCallback(() => {
    if (!emblaApi) return
    setIsFirstSlide(emblaApi.selectedScrollSnap() === 0)
  }, [emblaApi])

  // 다음 슬라이드로 이동하는 함수
  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    // 슬라이드 변경 시 현재 인덱스를 부모에게 전달
    const handleSelect = () => {
      const currentIndex = emblaApi.selectedScrollSnap()
      onSlideChange?.(currentIndex)
    }
    emblaApi.on('select', updateIsFirstSlide)
    updateIsFirstSlide()
    emblaApi.on('select', handleSelect)
    handleSelect()
    // 초기 인덱스 전달

    return () => {
      emblaApi.off('select', handleSelect)
    }
  }, [emblaApi, onSlideChange])

  // ... 나머지 코드

  return (
    <div className={`${className} relative h-full w-full`}>
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <div key={slide.id} className="relative h-full min-w-0 flex-[0_0_100%]">
              <Link href={`/post/${slide.id}`} className="block h-full">
                <div className="relative h-full w-full">
                  <Image
                    src={slide.thumbnail}
                    alt={slide.title}
                    className="object-cover"
                    fill
                    sizes="100vw"
                    priority
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* 첫 번째 슬라이드에서만 표시되는 화살표 */}
      {isFirstSlide && (
        <button
          onClick={scrollNext}
          className="laptop:bottom-4 laptop:translate-y-0 absolute bottom-1/2 right-4 translate-y-1/2 rounded-full bg-white/50 p-2 backdrop-blur-sm transition-all hover:bg-white/80"
          aria-label="다음 슬라이드"
        >
          <ChevronRight className="h-5 w-5 text-black" />
        </button>
      )}
    </div>
  )
}
