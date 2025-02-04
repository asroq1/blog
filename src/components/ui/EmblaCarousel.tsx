import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

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
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    ...(autoplay && { autoplay: { delay: 1000 } }),
  })

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
    </div>
  )
}
