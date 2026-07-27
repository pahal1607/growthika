import Link from 'next/link'
import AuthPanel from '@/components/AuthPanel'
export const metadata={title:'Login | Growthika',robots:{index:false,follow:false}}
export default function Login(){return <main className="authPage"><div className="authBrand"><Link className="brand" href="/"><span>G</span>rowthika</Link><div><div className="eyebrow">ONE PLATFORM</div><h2>Everything about your campaign, in one place.</h2><p>Packages, remaining reels, deliverables, invoices, files and links—always visible.</p></div><Link href="/">← Back to website</Link></div><AuthPanel/></main>}
