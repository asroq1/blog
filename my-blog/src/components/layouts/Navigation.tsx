import Link from 'next/link'
import React from 'react'

const Navigation = () => {
  return (
    <nav className="flex justify-between">
      <h2>로고</h2>
      <Link href="post">Post</Link>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  )
}

export default Navigation
