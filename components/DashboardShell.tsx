'use client'

import Link from 'next/link'
import { Bell, FileText, Film, LayoutDashboard, LogOut, Menu, Package, UserRoundSearch, Users, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const adminLinks = [
  ['/admin', LayoutDashboard, 'Overview', 'overview'],
  ['/admin?tab=clients', Users, 'Clients', 'clients'],
  ['/admin?tab=packages', Package, 'Packages', 'packages'],
  ['/admin?tab=influencers', UserRoundSearch, 'Influencers', 'influencers'],
  ['/admin?tab=deliverables', Film, 'Deliverables', 'deliverables'],
  ['/admin?tab=invoices', FileText, 'Invoices', 'invoices'],
] as const

export default function DashboardShell({ children, admin = false, name = 'Growthika' }: { children: React.ReactNode; admin?: boolean; name?: string }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const path = usePathname()
  const [activeTab, setActiveTab] = useState('overview')
  useEffect(() => {
    setActiveTab(new URLSearchParams(window.location.search).get('tab') || 'overview')
  }, [path])

  async function logout() {
    await createClient().auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const clientLinks = [
    ['/dashboard', LayoutDashboard, 'Dashboard'],
    ['/dashboard#deliverables', Film, 'Deliverables'],
    ['/dashboard#invoices', FileText, 'Invoices'],
    ['/dashboard#notifications', Bell, 'Notifications'],
  ] as const

  return <div className="dashLayout">
    <aside className={open ? 'side open' : 'side'}>
      <div className="sideTop">
        <Link className="brand" href="/"><span>G</span>rowthika</Link>
        <button className="closeSide" type="button" onClick={() => setOpen(false)} aria-label="Close navigation"><X /></button>
      </div>
      <div className="sideRole">{admin ? 'ADMIN CONSOLE' : 'CLIENT PORTAL'}</div>
      <nav>
        {(admin ? adminLinks : clientLinks).map((item: any) => {
          const [href, Icon, label, tab] = item
          const active = admin ? path === '/admin' && activeTab === tab : path === href.split('#')[0]
          return <Link key={label} href={href} className={active ? 'active' : ''} onClick={() => { setOpen(false); if (admin) setActiveTab(tab || 'overview') }}><Icon size={18} />{label}</Link>
        })}
      </nav>
      <button className="logout" type="button" onClick={logout}><LogOut size={18} />Sign out</button>
    </aside>
    <main className="dashMain">
      <div className="dashTop">
        <button onClick={() => setOpen(true)} className="openSide" type="button" aria-label="Open navigation"><Menu /></button>
        <div><small>{admin ? 'Administration' : 'Client account'}</small><strong>{name}</strong></div>
        <div className="avatar">{name.trim().charAt(0).toUpperCase() || 'G'}</div>
      </div>
      {children}
    </main>
  </div>
}
