// Layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import MainLayout from '../Layouts/MainLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Favour Bawa Portfolio',
  description: 'A web-design showcase of my work and skills',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  )
}