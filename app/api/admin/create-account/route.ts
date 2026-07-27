import { NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

type CreateAccountBody = {
  email?: string
  full_name?: string
  phone?: string
  password?: string
}

function makeTemporaryPassword() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%'
  const bytes = crypto.getRandomValues(new Uint8Array(18))
  return Array.from(bytes, (value) => alphabet[value % alphabet.length]).join('')
}

export async function POST(request: Request) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url || !anonKey || !serviceRoleKey) {
      return NextResponse.json(
        { error: 'Server account creation is not configured. Add SUPABASE_SERVICE_ROLE_KEY to .env.local.' },
        { status: 500 },
      )
    }

    const authorization = request.headers.get('authorization') || ''
    const accessToken = authorization.startsWith('Bearer ') ? authorization.slice(7) : ''
    if (!accessToken) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

    const verifier = createAdminClient(url, anonKey, {
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    })
    const { data: userData, error: userError } = await verifier.auth.getUser(accessToken)
    if (userError || !userData.user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

    const admin = createAdminClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
    const { data: profile, error: profileError } = await admin
      .from('profiles')
      .select('role')
      .eq('id', userData.user.id)
      .maybeSingle()

    if (profileError || profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Only Growthika administrators can create accounts.' }, { status: 403 })
    }

    const body = (await request.json()) as CreateAccountBody
    const email = body.email?.trim().toLowerCase()
    const fullName = body.full_name?.trim() || email?.split('@')[0] || 'Client'
    const phone = body.phone?.trim() || null
    if (!email) return NextResponse.json({ error: 'Email is required.' }, { status: 400 })

    const suppliedPassword = body.password?.trim()
    if (suppliedPassword && suppliedPassword.length < 8) {
      return NextResponse.json({ error: 'Temporary password must contain at least 8 characters.' }, { status: 400 })
    }
    const temporaryPassword = suppliedPassword || makeTemporaryPassword()

    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email,
      password: temporaryPassword,
      email_confirm: true,
      user_metadata: { full_name: fullName, phone },
    })

    if (createError || !created.user) {
      return NextResponse.json({ error: createError?.message || 'Could not create the portal account.' }, { status: 400 })
    }

    const { error: upsertError } = await admin.from('profiles').upsert({
      id: created.user.id,
      email,
      full_name: fullName,
      phone,
      role: 'client',
      updated_at: new Date().toISOString(),
    })

    if (upsertError) {
      await admin.auth.admin.deleteUser(created.user.id)
      return NextResponse.json({ error: upsertError.message }, { status: 400 })
    }

    return NextResponse.json({
      profile: { id: created.user.id, email, full_name: fullName, phone, role: 'client' },
      temporary_password: suppliedPassword ? null : temporaryPassword,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unexpected server error.' },
      { status: 500 },
    )
  }
}
