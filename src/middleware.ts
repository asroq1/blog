// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const sessionCookie = request.cookies.get('session')

  // 보호할 경로 패턴 체크
  const isPostingPath = pathname === '/admin/posting'
  const isEditPath = pathname.endsWith('/edit') // 동적 경로를 포함한 모든 edit 패턴 체크

  // 보호된 경로에 대한 접근 체크
  if ((isPostingPath || isEditPath) && !sessionCookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/posting',
    // 동적 경로를 포함한 모든 edit 경로 매칭
    '/(.*)/edit', // 모든 edit로 끝나는 경로
    '/about/edit', // about/edit 경로
  ],
}
