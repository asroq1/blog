import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface CarouselProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slides: any[]
  onSlideChange?: (index: number) => void
  autoplay?: boolean
  showDots?: boolean
}

export default function DetailCarousel({
  slides,
  autoplay = true,
  showDots = false,
  onSlideChange,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    ...(autoplay && { autoplay: { delay: 1000 } }),
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', () => {
      const index = emblaApi.selectedScrollSnap()
      setSelectedIndex(index)
      onSlideChange?.(index) // 부모에게 인덱스 전달
    })
  }, [emblaApi, onSlideChange])

  return (
    <div className="relative w-full">
      {/* max-height 추가하고 aspect ratio 제거 */}
      <div className="relative mx-auto w-full max-w-[1200px] overflow-hidden">
        {' '}
        {/* max-width 증가 */}
        <div className="h-full" ref={emblaRef}>
          <div className="flex">
            {slides.map((item, index) => (
              <div key={index} className="relative min-w-0 flex-[0_0_100%]">
                <div className="laptop:h-[600px] relative h-[400px]">
                  {/* 고정 높이 설정 */}
                  <Image
                    src={item}
                    alt={`slide-${index + 1}`}
                    className="object-contain"
                    fill
                    sizes="(max-width: 768px) 90vw, 1200px"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
