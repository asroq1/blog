'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BackButton from '@/components/ui/BackButton'

// profileImage 이미지
// introduction 텍스트
// description 텍스트
export default function ProfilePage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto gap-4 px-4 py-4">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton location="about" />
        </div>
        {/* introduction Section */}
        <section className="laptop:flex-row laptop:space-x-8 flex w-full flex-col space-y-8">
          {/* Profile Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="/profile.png"
              alt="Profile"
              width={800}
              height={600}
              className="object-cover"
              priority
            />
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">안녕하세요, 여주용입니다</h1>
              <p className="text-muted-foreground">인테리어 디자이너</p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold">자기소개</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                10년차의 인테리어 디자인 경력을 가진 디자이너입니다. 디자인학과 미니멀리즘 디자인을
                공부하며, 각 공간의 특성을 살린 맞춤형 디자인을 제공합니다. 새롭고 현대적인 공간과
                클래식한 공간의 부분과 전체적인 균형을 맞추고 효과적으로 프로젝트를 성공적으로
                완수하였습니다.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold">학력</h2>
              <ul className="space-y-2 text-sm">
                <li>서울대학교 실내건축학과</li>
                <li>한 홍보과</li>
              </ul>
            </div>

            {/* Experience */}
            <div>
              <h2 className="mb-2 text-lg font-semibold">경력</h2>
              <ul className="space-y-2 text-sm">
                <li>현대인테리어 소속디자이너 (2020-현재)</li>
                <li>스페이스디자인 팀장 (2015-2020)</li>
                <li>디자인인테리어 디자이너 (2013-2015)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* description Section*/}
        <section className="space-y-8">
          <div>
            <h2 className="mb-2 text-lg font-semibold">Ipsum</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold">Ipsum</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold">typesetting</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
