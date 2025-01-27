// app/api/session/route.ts
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { adminAuth } from '@/app/firebase/firebaseAdmin'

export async function POST(request: Request) {
  const { token } = await request.json()

  if (!token) {
    return new NextResponse('No token found', { status: 401 })
  }

  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(token, { expiresIn })

    ;(await cookies()).set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })

    return new NextResponse(JSON.stringify({ status: 'success' }), { status: 200 })
  } catch (error) {
    console.error('Session creation error:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
