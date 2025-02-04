import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'

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

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('select', () => {
      onSlideChange?.(emblaApi.selectedScrollSnap())
    })
  }, [emblaApi, onSlideChange])

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
    </div>
  )
}
