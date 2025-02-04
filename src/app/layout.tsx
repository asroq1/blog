import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/layouts/Footer'
import Navigation from '@/components/layouts/Navigation'
import { AuthProvider } from '@/lib/AuthContext'
import QueryProviders from '@/lib/QueryProvider'
import { AritaDotum } from '@/app/font'

export const metadata: Metadata = {
  title: 'Yeojuyong',
  description: 'Yeojuyong Blog',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={AritaDotum.className}>
      <body>
        <QueryProviders>
          <AuthProvider>
            <Navigation />
            {children}
            <Footer />
          </AuthProvider>
        </QueryProviders>
      </body>
    </html>
  )
}
