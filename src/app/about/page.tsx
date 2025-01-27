'use client'

import Image from 'next/image'
import BackButton from '@/components/ui/BackButton'
import { useAbout } from '../hooks/useAbout'
import TiptapViewer from '@/components/ui/TiptapViewer'
import { ActionButtons } from '@/components/ui/ActionButtons'

export default function ProfilePage() {
  const { data: about, isLoading, error } = useAbout()
  console.log('Query State:', { data: about, isLoading, error })
  if (isLoading) return <div>Loading...</div>
  if (!about) return <div>No data found</div>

  return (
    <div className="bg-background min-h-screen">
      {/* Main Content */}
      <div className="bg-background flex items-center justify-between gap-4 p-2">
        <BackButton />
        <ActionButtons location="about" />
      </div>
      <main className="container mx-auto flex  w-[90%] flex-col gap-4 bg-white px-4 py-4">
        {/* Back Button */}
        {/* introduction Section */}
        <section className="laptop:flex-row laptop:space-x-8 flex w-full flex-col space-y-8">
          {/* Profile Image */}
          <div className="">
            <Image
              src={about.aboutUrl}
              alt="Profile"
              width={800}
              height={600}
              className="h-auto w-full" // 컨테이너 너비에 맞춰 조정, 높이 자동
              sizes="(max-width: 768px) 100vw, 700px" // 브라우저에 최적화된 이미지 크기 제공
              priority
              // unoptimized
            />
          </div>
        </section>
        {/* description Section*/}
        <section className=" mx-auto my-0 w-full">
          <TiptapViewer content={about.content} />
        </section>
      </main>
    </div>
  )
}
