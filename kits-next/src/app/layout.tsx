import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pattern Lab · React Bits (Next)',
  description: 'All React Bits components grouped — Next.js package',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
