import Link from 'next/link'
import React from 'react'
import LogoutButton from '../ui/LogoutButton'
import { AuthRequired } from '@/lib/AuthGuard'

const Navigation = () => {
  return (
    <header className="flex h-[62px] justify-between bg-white p-2">
      <Link href="/" className="text-xl font-semibold">
        logo
      </Link>
      <nav className="flex items-center gap-4">
        <AuthRequired>
          <LogoutButton />
          <Link href="/admin/posting" className="text-sm">
            Post
          </Link>
        </AuthRequired>
        <Link href="/" className="text-sm">
          Work
        </Link>
        <Link href="/about" className="text-sm">
          About
        </Link>
      </nav>
    </header>
  )
}

export default Navigation
