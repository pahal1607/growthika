'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
export default function AuthPanel(){
 const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [msg,setMsg]=useState(''); const [busy,setBusy]=useState(false); const router=useRouter(); const search=useSearchParams();
 async function login(){setBusy(true);setMsg('');const sb=createClient();const {error}=await sb.auth.signInWithPassword({email,password});if(error){setMsg(error.message)}else{router.push(search.get('next')||'/dashboard');router.refresh()}setBusy(false)}
 async function reset(){if(!email){setMsg('Enter your email first.');return}const sb=createClient();const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:`${location.origin}/reset-password`});setMsg(error?error.message:'Password reset link sent. Check your inbox.')}
 return <div className="authCard"><div className="eyebrow">SECURE PORTAL</div><h1>Welcome back</h1><p>Access your Growthika dashboard, package progress and campaign links.</p><label>Email<input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@example.com"/></label><label>Password<input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="••••••••" onKeyDown={e=>e.key==='Enter'&&login()}/></label><button className="primary full" onClick={login} disabled={busy}>{busy?'Signing in…':'Sign in'}</button><button className="linkBtn" onClick={reset}>Forgot password?</button>{msg&&<div className="formMsg">{msg}</div>}<small>Accounts are created by Growthika administrators.</small></div>
}
