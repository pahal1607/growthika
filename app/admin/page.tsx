import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminConsole from '@/components/AdminConsole'
export const metadata={title:'Admin | Growthika',robots:{index:false,follow:false}}
export default async function Admin(){const sb=await createClient();const {data:{user}}=await sb.auth.getUser();if(!user)redirect('/login');const {data:profile}=await sb.from('profiles').select('*').eq('id',user.id).maybeSingle();if(profile?.role!=='admin')redirect('/dashboard');return <AdminConsole name={profile.full_name||user.email||'Admin'}/>}
