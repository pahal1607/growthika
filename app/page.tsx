import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminConsole from '@/components/AdminConsole'

export const metadata = {
  title: 'Admin | Growthika',
  robots: {
    index: false,
    follow: false,
  },
}

function getAdminEmails() {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/admin')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  const adminEmails = getAdminEmails()
  const userEmail = user.email?.toLowerCase() ?? ''

  const isAdmin =
    profile?.role === 'admin' ||
    adminEmails.includes(userEmail)

  if (!isAdmin) {
    redirect('/dashboard')
  }

  return (
    <AdminConsole
      name={profile?.full_name || user.email || 'Admin'}
    />
  )
}