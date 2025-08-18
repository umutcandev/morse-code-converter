import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mors Kodu Çevirici',
  description: 'Metin ve Mors kodu arasında hızlı ve kolay çeviri yapın. Sesli oynatma özelliği ile Mors kodunu öğrenin. Fast and easy conversion between text and Morse code with audio playback feature.',
  keywords: ['mors kodu', 'morse code', 'çevirici', 'converter', 'translator', 'audio', 'sesli', 'öğrenme', 'learning'],
  authors: [{ name: 'Morse Code Converter' }],
  creator: 'Morse Code Converter',
  publisher: 'Morse Code Converter',
  robots: 'index, follow',
  openGraph: {
    title: 'Mors Kodu Çevirici',
    description: 'Metin ve Mors kodu arasında hızlı ve kolay çeviri yapın. Sesli oynatma özelliği ile Mors kodunu öğrenin.',
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mors Kodu Çevirici',
    description: 'Metin ve Mors kodu arasında hızlı ve kolay çeviri yapın. Sesli oynatma özelliği ile Mors kodunu öğrenin.',
  },
  generator: 'Next.js',
  applicationName: 'Mors Kodu Çevirici',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
