import Link from 'next/link'
import React from 'react'
import LogoutButton from '../ui/LogoutButton'
import { AuthRequired } from '@/lib/AuthGuard'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import PostingButton from '../ui/PostingButton'

const Navigation = () => {
  return (
    <header className="relative flex h-[62px] justify-center bg-white p-2">
      {/* 중앙 로고 */}
      <div className="flex h-full items-center justify-center">
        <Link href="/">
          <Image src="/logo.jpeg" alt="logo" width={100} height={40} />
        </Link>
      </div>

      {/* 오른쪽 햄버거 메뉴 */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <Sheet>
          <SheetTrigger asChild className="laptop:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 pt-10">
              <AuthRequired>
                <LogoutButton />
                <PostingButton />
              </AuthRequired>
              <Link href="/" className="text-sm">
                Work
              </Link>
              <Link href="/about" className="text-sm">
                About
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* 데스크톱 네비게이션 */}
      <nav className="laptop:flex absolute right-2 hidden items-center gap-4">
        <AuthRequired>
          <LogoutButton />
          <PostingButton />
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
