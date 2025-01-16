import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const About = () => {
  return (
    <div>
      <Image
        src="/path-to-your-image.jpg" // 이미지 경로 지정
        alt="About image" // alt 속성 추가
        width={500} // 너비 지정
        height={300}
      />
      <div>
        <h2>자기 소개 등등</h2>
        <p>lorem ipsum</p>
      </div>
      <section>
        <h2>ABOUT</h2>
        <p>lorem ipsum</p>
      </section>

      <section>
        <p>작품 문의나 협업 제안을 환영합니다.</p>
        <Link href="/">인스타</Link>
        <Link href="/">이메일</Link>
      </section>
    </div>
  )
}

export default About
