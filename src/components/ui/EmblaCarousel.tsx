import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react' // lucide-react 아이콘 사용

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

export default function EmblaCarousel({ slides, autoplay = true, className }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    ...(autoplay && { autoplay: { delay: 1000 } }),
  })
  const [isLastSlide, setIsLastSlide] = useState(false)

  // 현재 슬라이드가 마지막인지 확인하는 함수
  const updateIsLastSlide = useCallback(() => {
    if (!emblaApi) return
    const lastSlideIndex = emblaApi.scrollSnapList().length - 1
    setIsLastSlide(emblaApi.selectedScrollSnap() === lastSlideIndex)
  }, [emblaApi])

  // 다음 슬라이드로 이동하는 함수
  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    // 슬라이드 변경시마다 체크
    emblaApi.on('select', updateIsLastSlide)
    updateIsLastSlide() // 초기 상태 설정

    return () => {
      emblaApi.off('select', updateIsLastSlide)
    }
  }, [emblaApi, updateIsLastSlide])

  return (
    <div className={`${className} relative h-full w-full`}>
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <div key={slide.id} className="relative h-full min-w-0 flex-[0_0_100%]">
              <div className="relative h-full w-full">
                <Image
                  src={slide.thumbnail}
                  alt={slide.title}
                  className="laptop:object-cover object-contain"
                  fill
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 마지막 슬라이드에서만 표시되는 화살표 */}
      {isLastSlide && (
        <button
          onClick={scrollNext}
          // 모바일에서는 이미지 중간 높이, 데스크탑에서는 하단에 위치
          className="laptop:bottom-4 laptop:translate-y-0 absolute bottom-1/2 right-4 translate-y-1/2 rounded-full bg-white/50 p-2 backdrop-blur-sm transition-all hover:bg-white/80"
          aria-label="다음 슬라이드"
        >
          <ChevronRight className="h-5 w-5 text-black" />
        </button>
      )}
    </div>
  )
}
