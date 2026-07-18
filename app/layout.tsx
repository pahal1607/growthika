import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Growthika — Real Estate Growth Studio',
  description: 'Cinematic content, branding, social media, websites and performance marketing for ambitious real estate brands.',
  keywords: ['real estate marketing', 'property reels', 'drone shoot', 'Kanpur', 'Growthika'],
  openGraph: {
    title: 'Growthika — Turning Properties Into Powerful Brands',
    description: 'A modern real estate growth studio serving Kanpur, Lucknow, Noida and clients across India.',
    type: 'website'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
