'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
export default function Reset(){const [password,setPassword]=useState('');const [msg,setMsg]=useState('');const router=useRouter();async function save(){const {error}=await createClient().auth.updateUser({password});if(error)setMsg(error.message);else{setMsg('Password updated.');setTimeout(()=>router.push('/dashboard'),800)}}return <main className="centerPage"><div className="authCard"><div className="eyebrow">ACCOUNT SECURITY</div><h1>Set a new password</h1><label>New password<input type="password" value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="primary full" onClick={save}>Update password</button>{msg&&<div className="formMsg">{msg}</div>}</div></main>}
