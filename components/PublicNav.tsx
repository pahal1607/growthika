'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
export default function PublicNav(){const [open,setOpen]=useState(false); return <header className="nav"><Link className="brand" href="/"><span>G</span>rowthika</Link><button className="menu" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X/>:<Menu/>}</button><nav className={open?'open':''}><a href="#services">Services</a><a href="#work">Work</a><a href="#packages">Packages</a><a href="#contact">Contact</a><Link className="navLogin" href="/login">Client Login</Link></nav></header>}
