'use client'

import Image from 'next/image'
import BackButton from '@/components/ui/BackButton'
import { useAbout } from '../hooks/useAbout'
import TiptapViewer from '@/components/ui/TiptapViewer'
import { ActionButtons } from '@/components/ui/ActionButtons'
import Link from 'next/link'
import EmailIcon from '/public/icons/icon-email.svg'
import InstaIcon from '/public/icons/icon-insta.svg'
import { EmptyState, ErrorState, LoadingState } from '@/components/layouts/LoadingState'

export default function ProfilePage() {
  const { data: about, isLoading, error } = useAbout()
  if (isLoading) return <LoadingState />
  if (!about) return <EmptyState />
  if (error) return <ErrorState message={`관리자에게 문의해주세요. ${error.message}`} />

  return (
    <>
      <div className="bg-background mx-auto my-0 flex w-[90%] items-center justify-between gap-4 p-2">
        <BackButton />
        <ActionButtons location="about" />
      </div>
      <div className="bg-background min-h-screen">
        {/* Main Content */}
        <main className="mx-auto flex  w-[90%] flex-col gap-4 bg-white px-4 py-4">
          {/* Back Button */}
          {/* introduction Section */}
          <section className="laptop:flex-row laptop:space-x-8 flex w-full flex-col items-center justify-center space-y-8">
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
        <article className="flex h-60 w-full flex-col items-center justify-center  gap-4 p-4">
          작품 문의나 협업 제안을 환영합니다.
          <div className="flex gap-4">
            <Link href="mailto:yeozuyong@gmail.com" target="_blank" rel="noopener noreferrer">
              <EmailIcon />
            </Link>
            <Link
              href="https://www.instagram.com/yeo.juyong"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstaIcon />
            </Link>
          </div>
        </article>
      </div>
    </>
  )
}
