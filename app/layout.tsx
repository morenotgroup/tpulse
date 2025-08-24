import './globals.css'
import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'

const mont = Montserrat({ subsets: ['latin'], variable: '--font-mont' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'T Group Intra',
  description: 'Intranet mobile do T Group',
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 1, userScalable: false }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${mont.variable} ${inter.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#7C3AED" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="max-w-[480px] mx-auto min-h-dvh relative pb-20">{children}</body>
    </html>
  )
}
