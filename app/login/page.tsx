import { Suspense } from 'react'
import AuthPanel from '@/components/AuthPanel'

export const metadata = {
  title: 'Login | Growthika',
  robots: {
    index: false,
    follow: false,
  },
}

function LoginFallback() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#09090b',
        color: '#ffffff',
      }}
    >
      Loading…
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <AuthPanel />
    </Suspense>
  )
}