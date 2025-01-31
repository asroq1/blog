import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import Image from 'next/image'

interface CarouselProps {
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
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
                <h3 className="text-lg text-white">{slide.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
