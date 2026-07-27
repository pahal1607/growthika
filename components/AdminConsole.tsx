'use client'

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  ExternalLink,
  Film,
  IndianRupee,
  Loader2,
  Package,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  UserRoundSearch,
  X,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import DashboardShell from './DashboardShell'

type Tab = 'overview' | 'clients' | 'packages' | 'influencers' | 'deliverables' | 'invoices'
type RecordRow = Record<string, any>
type DataState = Record<Exclude<Tab, 'overview'>, RecordRow[]> & { profiles: RecordRow[] }
type Notice = { type: 'success' | 'error'; text: string } | null

const tabs: Tab[] = ['overview', 'clients', 'packages', 'influencers', 'deliverables', 'invoices']
const emptyData: DataState = { clients: [], packages: [], influencers: [], deliverables: [], invoices: [], profiles: [] }
const statusOptions: Record<Exclude<Tab, 'overview'>, string[]> = {
  clients: ['active', 'paused', 'completed'],
  packages: ['active', 'inactive'],
  influencers: ['available', 'busy', 'unavailable'],
  deliverables: ['planned', 'in_progress', 'review', 'completed'],
  invoices: ['pending', 'paid', 'overdue'],
}

export default function AdminConsole({ name }: { name: string }) {
  const sb = useMemo(() => createClient(), [])
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('overview')
  const [data, setData] = useState<DataState>(emptyData)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState<Notice>(null)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [editing, setEditing] = useState<RecordRow | null>(null)
  const [creating, setCreating] = useState(false)

  const showNotice = useCallback((type: 'success' | 'error', text: string) => {
    setNotice({ type, text })
    window.setTimeout(() => setNotice(null), 4500)
  }, [])

  const load = useCallback(async () => {
    setLoading(true)
    const [clients, packages, influencers, deliverables, invoices, profiles] = await Promise.all([
      sb.from('clients').select('*,packages(*),profiles(*)').order('created_at', { ascending: false }),
      sb.from('packages').select('*').order('price', { ascending: true }),
      sb.from('influencers').select('*').order('created_at', { ascending: false }),
      sb.from('deliverables').select('*,clients(company_name)').order('created_at', { ascending: false }),
      sb.from('invoices').select('*,clients(company_name)').order('created_at', { ascending: false }),
      sb.from('profiles').select('id,email,full_name,role').eq('role', 'client').order('email', { ascending: true }),
    ])

    const error = clients.error || packages.error || influencers.error || deliverables.error || invoices.error || profiles.error
    if (error) showNotice('error', error.message)
    setData({
      clients: clients.data || [],
      packages: packages.data || [],
      influencers: influencers.data || [],
      deliverables: deliverables.data || [],
      invoices: invoices.data || [],
      profiles: profiles.data || [],
    })
    setLoading(false)
  }, [sb, showNotice])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    const current = new URLSearchParams(window.location.search).get('tab') as Tab | null
    setTab(current && tabs.includes(current) ? current : 'overview')
  }, [])

  function changeTab(next: Tab) {
    setTab(next)
    setQuery('')
    setFilter('all')
    setCreating(false)
    setEditing(null)
    router.push(next === 'overview' ? '/admin' : `/admin?tab=${next}`)
  }

  async function save(table: Exclude<Tab, 'overview'>, row: RecordRow, id?: string) {
    setSaving(true)
    const request = id ? sb.from(table).update(row).eq('id', id) : sb.from(table).insert(row)
    const { error } = await request
    setSaving(false)
    if (error) {
      showNotice('error', error.message)
      return false
    }
    showNotice('success', id ? 'Changes saved successfully.' : 'New item added successfully.')
    setCreating(false)
    setEditing(null)
    await load()
    return true
  }

  async function remove(table: Exclude<Tab, 'overview'>, id: string) {
    if (!window.confirm('Delete this item permanently?')) return
    const { error } = await sb.from(table).delete().eq('id', id)
    if (error) return showNotice('error', error.message)
    showNotice('success', 'Item deleted successfully.')
    await load()
  }

  async function createPortalAccount(account: { email: string; full_name: string; phone?: string; password?: string; send_setup_email?: boolean }) {
    const { data: sessionData } = await sb.auth.getSession()
    const accessToken = sessionData.session?.access_token
    if (!accessToken) throw new Error('Your admin session has expired. Please sign in again.')

    const response = await fetch('/api/admin/create-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(account),
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || 'Could not create the portal account.')

    if (account.send_setup_email) {
      const { error } = await sb.auth.resetPasswordForEmail(account.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw new Error(`Account created, but the setup email failed: ${error.message}`)
    }

    return result as { profile: RecordRow; temporary_password: string | null }
  }

  const rows = useMemo(() => {
    if (tab === 'overview') return []
    return data[tab].filter((row) => {
      const matchesQuery = JSON.stringify(row).toLowerCase().includes(query.trim().toLowerCase())
      if (!matchesQuery) return false
      if (filter === 'all') return true
      if (tab === 'packages') return filter === 'active' ? row.active : !row.active
      if (tab === 'influencers') return row.availability === filter
      return row.status === filter
    })
  }, [data, filter, query, tab])

  const revenue = data.invoices.reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0)
  const paidRevenue = data.invoices
    .filter((invoice) => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0)
  const pendingDeliverables = data.deliverables.filter((item) => item.status !== 'completed').length
  const activeClients = data.clients.filter((client) => client.status === 'active').length

  return (
    <DashboardShell admin name={name}>
      <div className="dashContent">
        <div className="welcome adminWelcome">
          <div>
            <div className="eyebrow">ADMIN CONTROL CENTRE</div>
            <h1>{titleFor(tab)}</h1>
            <p>{subtitleFor(tab)}</p>
          </div>
          <button className="secondaryBtn" type="button" onClick={load} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'spin' : ''} /> Refresh
          </button>
        </div>

        {notice && (
          <div className={`adminNotice ${notice.type}`}>
            {notice.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{notice.text}</span>
            <button type="button" onClick={() => setNotice(null)} aria-label="Dismiss message"><X size={16} /></button>
          </div>
        )}

        <div className="adminTabBar" aria-label="Admin sections">
          {tabs.map((item) => (
            <button key={item} type="button" className={tab === item ? 'active' : ''} onClick={() => changeTab(item)}>
              {titleFor(item)}
            </button>
          ))}
        </div>

        {tab === 'overview' ? (
          <Overview
            data={data}
            revenue={revenue}
            paidRevenue={paidRevenue}
            pendingDeliverables={pendingDeliverables}
            activeClients={activeClients}
            onNavigate={changeTab}
          />
        ) : (
          <>
            <div className="adminTools">
              <div className="search">
                <Search size={18} />
                <input
                  placeholder={`Search ${titleFor(tab).toLowerCase()}`}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <select className="adminFilter" value={filter} onChange={(event) => setFilter(event.target.value)}>
                <option value="all">All statuses</option>
                {statusOptions[tab].map((status) => (
                  <option key={status} value={status}>{humanize(status)}</option>
                ))}
              </select>
              <button className="primary" type="button" onClick={() => setCreating(true)}>
                <Plus size={17} /> Add {singular(tab)}
              </button>
            </div>

            {loading ? (
              <div className="adminLoading"><Loader2 className="spin" /> Loading data…</div>
            ) : rows.length === 0 ? (
              <div className="adminEmpty">
                <div><Search size={24} /></div>
                <h3>No {titleFor(tab).toLowerCase()} found</h3>
                <p>{query || filter !== 'all' ? 'Try changing your search or filter.' : `Add your first ${singular(tab)} to get started.`}</p>
              </div>
            ) : (
              <div className="adminTable">
                {rows.map((row) => (
                  <AdminRow key={row.id} tab={tab} row={row} onEdit={() => setEditing(row)} onDelete={() => remove(tab, row.id)} />
                ))}
              </div>
            )}

            <div className="adminCount">Showing {rows.length} of {data[tab].length} records</div>
          </>
        )}
      </div>

      {(creating || editing) && tab !== 'overview' && (
        <RecordModal
          tab={tab}
          data={data}
          record={editing}
          saving={saving}
          onClose={() => { setCreating(false); setEditing(null) }}
          onSave={(row) => save(tab, row, editing?.id)}
          onCreatePortalAccount={createPortalAccount}
          onAccountCreated={(message) => showNotice('success', message)}
        />
      )}
    </DashboardShell>
  )
}

function Overview({ data, revenue, paidRevenue, pendingDeliverables, activeClients, onNavigate }: {
  data: DataState
  revenue: number
  paidRevenue: number
  pendingDeliverables: number
  activeClients: number
  onNavigate: (tab: Tab) => void
}) {
  return (
    <>
      <div className="metricGrid">
        <Metric icon={<Building2 />} label="Active clients" value={`${activeClients}`} hint={`${data.clients.length} total`} />
        <Metric icon={<Package />} label="Packages" value={`${data.packages.filter((p) => p.active).length}`} hint={`${data.packages.length} total`} />
        <Metric icon={<Film />} label="Pending deliverables" value={`${pendingDeliverables}`} hint={`${data.deliverables.length} total`} />
        <Metric icon={<IndianRupee />} label="Paid revenue" value={formatMoney(paidRevenue)} hint={`${formatMoney(revenue)} invoiced`} />
      </div>

      <div className="dashGrid">
        <section className="panel">
          <div className="panelHead"><h2>Recent clients</h2><button onClick={() => onNavigate('clients')}>View all</button></div>
          {data.clients.slice(0, 6).map((client) => (
            <div className="listRow" key={client.id}>
              <div className="rowIcon"><Building2 size={17} /></div>
              <div><strong>{client.company_name}</strong><span>{client.packages?.name || 'No package'} · {humanize(client.status)}</span></div>
              <StatusBadge value={client.status} />
            </div>
          ))}
          {!data.clients.length && <p className="empty">No clients yet.</p>}
        </section>
        <section className="panel">
          <div className="panelHead"><h2>Recent deliverables</h2><button onClick={() => onNavigate('deliverables')}>View all</button></div>
          {data.deliverables.slice(0, 6).map((item) => (
            <div className="listRow" key={item.id}>
              <div className="rowIcon"><Film size={17} /></div>
              <div><strong>{item.title}</strong><span>{item.clients?.company_name || 'Unknown client'} · {humanize(item.type)}</span></div>
              <StatusBadge value={item.status} />
            </div>
          ))}
          {!data.deliverables.length && <p className="empty">No deliverables yet.</p>}
        </section>
      </div>
    </>
  )
}

function Metric({ icon, label, value, hint }: { icon: React.ReactNode; label: string; value: string; hint: string }) {
  return <div className="metric">{icon}<span>{label}</span><strong>{value}</strong><small>{hint}</small></div>
}

function AdminRow({ tab, row, onEdit, onDelete }: { tab: Exclude<Tab, 'overview'>; row: RecordRow; onEdit: () => void; onDelete: () => void | Promise<void> }) {
  return (
    <div className="adminRow">
      <div className="adminRowMain">
        {tab === 'clients' && (
          <>
            <div className="adminRowTitle"><strong>{row.company_name}</strong><StatusBadge value={row.status} /></div>
            <span>{row.profiles?.email || row.phone || 'No contact'} · {row.packages?.name || 'No package'}</span>
            <div className="rowMeta">
              <span>Reels: {Number(row.reels_used || 0)} / {Number(row.packages?.total_reels || 0)}</span>
              <span>Renewal: {formatDate(row.renewal_date)}</span>
              {row.drive_link && <a href={row.drive_link} target="_blank" rel="noreferrer">Drive <ExternalLink size={12} /></a>}
            </div>
          </>
        )}
        {tab === 'packages' && (
          <>
            <div className="adminRowTitle"><strong>{row.name}</strong><StatusBadge value={row.active ? 'active' : 'inactive'} /></div>
            <span>{formatMoney(row.price)} · {Number(row.total_reels || 0)} reels</span>
            {row.description && <p>{row.description}</p>}
          </>
        )}
        {tab === 'influencers' && (
          <>
            <div className="adminRowTitle"><strong>{row.name}</strong><StatusBadge value={row.availability} /></div>
            <span>{row.instagram || 'No Instagram'} · {row.city || 'No city'} · {row.niche || 'No category'}</span>
            <div className="rowMeta"><span>{formatNumber(row.followers)} followers</span><span>{Number(row.engagement || 0)}% engagement</span><span>{formatMoney(row.rate)}</span></div>
          </>
        )}
        {tab === 'deliverables' && (
          <>
            <div className="adminRowTitle"><strong>{row.title}</strong><StatusBadge value={row.status} /></div>
            <span>{row.clients?.company_name || 'Unknown client'} · {humanize(row.type)}</span>
            <div className="rowMeta"><span>Due: {formatDate(row.due_date)}</span>{row.url && <a href={row.url} target="_blank" rel="noreferrer">Open link <ExternalLink size={12} /></a>}</div>
          </>
        )}
        {tab === 'invoices' && (
          <>
            <div className="adminRowTitle"><strong>{row.invoice_number}</strong><StatusBadge value={row.status} /></div>
            <span>{row.clients?.company_name || 'Unknown client'} · {formatMoney(row.amount)}</span>
            <div className="rowMeta"><span>Due: {formatDate(row.due_date)}</span>{row.url && <a href={row.url} target="_blank" rel="noreferrer">Invoice <ExternalLink size={12} /></a>}</div>
          </>
        )}
      </div>
      <div className="adminRowActions">
        <button className="editBtn" type="button" onClick={onEdit} aria-label="Edit"><Pencil size={16} /></button>
        <button className="iconBtn" type="button" onClick={onDelete} aria-label="Delete"><Trash2 size={16} /></button>
      </div>
    </div>
  )
}

function RecordModal({ tab, data, record, saving, onClose, onSave, onCreatePortalAccount, onAccountCreated }: {
  tab: Exclude<Tab, 'overview'>
  data: DataState
  record: RecordRow | null
  saving: boolean
  onClose: () => void
  onSave: (row: RecordRow) => Promise<boolean>
  onCreatePortalAccount: (account: { email: string; full_name: string; phone?: string; password?: string; send_setup_email?: boolean }) => Promise<{ profile: RecordRow; temporary_password: string | null }>
  onAccountCreated: (message: string) => void
}) {
  const [accountBusy, setAccountBusy] = useState(false)
  const [accountError, setAccountError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAccountError('')
    const form = new FormData(event.currentTarget)
    const row: RecordRow = Object.fromEntries(form.entries())

    try {
      if (tab === 'clients' && !record && row.create_portal_account === 'yes') {
        setAccountBusy(true)
        const email = String(row.account_email || '').trim().toLowerCase()
        const fullName = String(row.account_full_name || '').trim()
        const password = String(row.account_password || '').trim()
        const sendSetupEmail = row.send_setup_email === 'yes'
        if (!email || !fullName) throw new Error('Client name and portal email are required.')

        const account = await onCreatePortalAccount({
          email,
          full_name: fullName,
          phone: String(row.phone || ''),
          password: password || undefined,
          send_setup_email: sendSetupEmail,
        })
        row.profile_id = account.profile.id
        const passwordMessage = account.temporary_password
          ? ` Temporary password: ${account.temporary_password}`
          : ''
        onAccountCreated(`Portal account created for ${email}.${sendSetupEmail ? ' A password setup email was sent.' : passwordMessage}`)
      }

      delete row.create_portal_account
      delete row.account_email
      delete row.account_full_name
      delete row.account_password
      delete row.send_setup_email

      const numberFields = ['price', 'total_reels', 'followers', 'engagement', 'rate', 'amount', 'reels_used']
      numberFields.forEach((field) => {
        if (field in row) row[field] = row[field] === '' ? 0 : Number(row[field])
      })
      if (tab === 'packages') row.active = row.active === 'true'
      Object.keys(row).forEach((key) => {
        if (row[key] === '') row[key] = null
      })
      await onSave(row)
    } catch (error) {
      setAccountError(error instanceof Error ? error.message : 'Could not save this client.')
    } finally {
      setAccountBusy(false)
    }
  }

  const isSaving = saving || accountBusy

  return (
    <div className="modalBackdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !isSaving) onClose() }}>
      <section className="recordModal" role="dialog" aria-modal="true" aria-labelledby="record-modal-title">
        <div className="modalHead">
          <div><span className="eyebrow">{record ? 'EDIT RECORD' : 'NEW RECORD'}</span><h2 id="record-modal-title">{record ? `Edit ${singular(tab)}` : `Add ${singular(tab)}`}</h2></div>
          <button type="button" onClick={onClose} aria-label="Close" disabled={isSaving}><X /></button>
        </div>
        <form className="adminForm modalForm" onSubmit={submit}>
          <Fields tab={tab} data={data} record={record} />
          {accountError && <div className="formMsg adminFormError"><AlertCircle size={16} /> {accountError}</div>}
          <div className="modalActions">
            <button className="secondaryBtn" type="button" onClick={onClose} disabled={isSaving}>Cancel</button>
            <button className="primary" type="submit" disabled={isSaving}>{isSaving ? <><Loader2 className="spin" size={17} /> {accountBusy ? 'Creating account…' : 'Saving…'}</> : <><CheckCircle2 size={17} /> Save changes</>}</button>
          </div>
        </form>
      </section>
    </div>
  )
}

function Fields({ tab, data, record }: { tab: Exclude<Tab, 'overview'>; data: DataState; record: RecordRow | null }) {
  const value = (key: string, fallback: string = ''): string => {
    const currentValue = record?.[key]

    if (currentValue === null || currentValue === undefined) {
      return fallback
    }

    return String(currentValue)
  }
  if (tab === 'clients') return <>
    <Field label="Company name"><input name="company_name" defaultValue={value('company_name')} required /></Field>
    {!record ? (
      <>
        <Field label="Create portal login"><select name="create_portal_account" defaultValue="yes"><option value="yes">Yes — create client login</option><option value="no">No — assign later</option></select></Field>
        <Field label="Client full name"><input name="account_full_name" placeholder="Client or owner name" /></Field>
        <Field label="Portal email"><input name="account_email" type="email" placeholder="client@example.com" /></Field>
        <Field label="Temporary password"><input name="account_password" type="text" minLength={8} placeholder="Leave blank to generate securely" /></Field>
        <Field label="Password setup email"><select name="send_setup_email" defaultValue="yes"><option value="yes">Send setup email</option><option value="no">Do not send</option></select></Field>
      </>
    ) : (
      <Field label="Portal account"><select name="profile_id" defaultValue={value('profile_id')}><option value="">Not assigned</option>{data.profiles.map((item) => <option key={item.id} value={item.id}>{item.full_name || item.email} — {item.email}</option>)}</select></Field>
    )}
    <Field label="Phone"><input name="phone" defaultValue={value('phone')} /></Field>
    <Field label="Package"><select name="package_id" defaultValue={value('package_id')}><option value="">No package</option>{data.packages.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></Field>
    <Field label="Reels used"><input name="reels_used" type="number" min="0" defaultValue={value('reels_used', '0')} /></Field>
    <Field label="Start date"><input name="start_date" type="date" defaultValue={value('start_date')} /></Field>
    <Field label="Renewal date"><input name="renewal_date" type="date" defaultValue={value('renewal_date')} /></Field>
    <Field label="Drive link" wide><input name="drive_link" type="url" defaultValue={value('drive_link')} /></Field>
    <Field label="Status"><select name="status" defaultValue={value('status', 'active')}><option value="active">Active</option><option value="paused">Paused</option><option value="completed">Completed</option></select></Field>
  </>
  if (tab === 'packages') return <>
    <Field label="Package name"><input name="name" defaultValue={value('name')} required /></Field>
    <Field label="Price"><input name="price" type="number" min="0" step="0.01" defaultValue={value('price', '0')} required /></Field>
    <Field label="Total reels"><input name="total_reels" type="number" min="0" defaultValue={value('total_reels', '0')} required /></Field>
    <Field label="Status"><select name="active" defaultValue={value('active', 'true')}><option value="true">Active</option><option value="false">Inactive</option></select></Field>
    <Field label="Description" wide><textarea name="description" defaultValue={value('description')} /></Field>
  </>
  if (tab === 'influencers') return <>
    <Field label="Name"><input name="name" defaultValue={value('name')} required /></Field>
    <Field label="Instagram"><input name="instagram" defaultValue={value('instagram')} /></Field>
    <Field label="City"><input name="city" defaultValue={value('city')} /></Field>
    <Field label="Category / niche"><input name="niche" defaultValue={value('niche')} /></Field>
    <Field label="Followers"><input name="followers" type="number" min="0" defaultValue={value('followers', '0')} /></Field>
    <Field label="Engagement %"><input name="engagement" type="number" min="0" step="0.01" defaultValue={value('engagement', '0')} /></Field>
    <Field label="Rate"><input name="rate" type="number" min="0" step="0.01" defaultValue={value('rate', '0')} /></Field>
    <Field label="Phone"><input name="phone" defaultValue={value('phone')} /></Field>
    <Field label="Email"><input name="email" type="email" defaultValue={value('email')} /></Field>
    <Field label="Portfolio link"><input name="portfolio_url" type="url" defaultValue={value('portfolio_url')} /></Field>
    <Field label="Availability"><select name="availability" defaultValue={value('availability', 'available')}><option value="available">Available</option><option value="busy">Busy</option><option value="unavailable">Unavailable</option></select></Field>
    <Field label="Private notes" wide><textarea name="notes" defaultValue={value('notes')} /></Field>
  </>
  if (tab === 'deliverables') return <>
    <Field label="Client"><select name="client_id" defaultValue={value('client_id')} required><option value="">Select client</option>{data.clients.map((item) => <option key={item.id} value={item.id}>{item.company_name}</option>)}</select></Field>
    <Field label="Title"><input name="title" defaultValue={value('title')} required /></Field>
    <Field label="Type"><select name="type" defaultValue={value('type', 'reel')}><option value="reel">Reel</option><option value="photo">Photo</option><option value="design">Design</option><option value="ad">Ad</option><option value="website">Website</option></select></Field>
    <Field label="Status"><select name="status" defaultValue={value('status', 'planned')}><option value="planned">Planned</option><option value="in_progress">In progress</option><option value="review">Review</option><option value="completed">Completed</option></select></Field>
    <Field label="Due date"><input name="due_date" type="date" defaultValue={value('due_date')} /></Field>
    <Field label="Deliverable link" wide><input name="url" type="url" defaultValue={value('url')} /></Field>
  </>
  return <>
    <Field label="Client"><select name="client_id" defaultValue={value('client_id')} required><option value="">Select client</option>{data.clients.map((item) => <option key={item.id} value={item.id}>{item.company_name}</option>)}</select></Field>
    <Field label="Invoice number"><input name="invoice_number" defaultValue={value('invoice_number')} required /></Field>
    <Field label="Amount"><input name="amount" type="number" min="0" step="0.01" defaultValue={value('amount', '0')} required /></Field>
    <Field label="Status"><select name="status" defaultValue={value('status', 'pending')}><option value="pending">Pending</option><option value="paid">Paid</option><option value="overdue">Overdue</option></select></Field>
    <Field label="Due date"><input name="due_date" type="date" defaultValue={value('due_date')} /></Field>
    <Field label="Invoice link" wide><input name="url" type="url" defaultValue={value('url')} /></Field>
  </>
}

function Field({ label, wide = false, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return <label className={wide ? 'field wide' : 'field'}><span>{label}</span>{children}</label>
}

function StatusBadge({ value }: { value: string }) {
  return <span className={`statusBadge status-${String(value).replaceAll('_', '-')}`}>{humanize(value)}</span>
}

function titleFor(tab: Tab) {
  const map: Record<Tab, string> = { overview: 'Overview', clients: 'Clients', packages: 'Packages', influencers: 'Influencers', deliverables: 'Deliverables', invoices: 'Invoices' }
  return map[tab]
}

function subtitleFor(tab: Tab) {
  const map: Record<Tab, string> = {
    overview: 'A live view of Growthika clients, revenue and production.',
    clients: 'Manage client accounts, packages, reel usage and renewals.',
    packages: 'Create and maintain Growthika service packages.',
    influencers: 'Private creator CRM with rates, reach and availability.',
    deliverables: 'Track every reel, design, ad and campaign asset.',
    invoices: 'Manage billing, payment status and due dates.',
  }
  return map[tab]
}

function singular(tab: Exclude<Tab, 'overview'>) {
  return ({ clients: 'client', packages: 'package', influencers: 'influencer', deliverables: 'deliverable', invoices: 'invoice' } as const)[tab]
}

function humanize(value: string) {
  return String(value || '').replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function formatMoney(value: unknown) {
  return `₹${Number(value || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
}

function formatNumber(value: unknown) {
  return Number(value || 0).toLocaleString('en-IN')
}

function formatDate(value: unknown) {
  if (!value) return 'Not set'
  const date = new Date(`${String(value)}T00:00:00`)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}