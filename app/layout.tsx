import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'Growthika — Real Estate Growth Studio',
  description: 'Premium real estate marketing, content, ads and client growth platform in Kanpur.',
  robots: { index: true, follow: true }
}
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>
}
