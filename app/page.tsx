'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight, Camera, Check, ChevronDown, CirclePlay, Globe2, Instagram,
  LayoutGrid, Menu, MessageCircle, MousePointer2, Palette, Phone, Rocket,
  Sparkles, Target, Video, X, Zap, MapPin, Mail, ExternalLink
} from 'lucide-react';

const nav = [
  ['Services', '#services'], ['Work', '#work'], ['Process', '#process'],
  ['Packages', '#packages'], ['About', '#about'], ['Contact', '#contact']
];

const services = [
  { tag: 'CREATE', title: 'Cinematic Content', text: 'Reels, property walkthroughs, drone films, photography and edits designed for attention.', icon: Video },
  { tag: 'GROW', title: 'Performance Marketing', text: 'Meta Ads, Google Ads, lead funnels and conversion-focused campaigns built for enquiries.', icon: Target },
  { tag: 'BUILD', title: 'Brand & Social', text: 'Positioning, visual identity, graphic design, personal branding and social media management.', icon: Palette },
  { tag: 'LAUNCH', title: 'Web Experiences', text: 'Premium websites, landing pages, analytics and campaign-ready digital experiences.', icon: Globe2 }
];

const audiences = ['Builders', 'Developers', 'Property Dealers', 'Brokers', 'Plot Projects', 'Residential Projects', 'Commercial Real Estate', 'Architects', 'Interior Designers', 'Construction Companies'];

const projects = [
  { n: '01', title: 'Luxury Villa Launch', type: 'Concept Campaign', desc: 'A cinematic launch system combining reels, drone, photography and social-first storytelling.', className: 'visual villa' },
  { n: '02', title: 'Plot Project Growth', type: 'Concept Campaign', desc: 'Location-led content, landing page strategy and performance marketing built to generate qualified interest.', className: 'visual plots' },
  { n: '03', title: 'Broker Personal Brand', type: 'Concept Campaign', desc: 'A modern personal-brand system for consistent visibility, authority and inbound enquiries.', className: 'visual broker' }
];

const plans = [
  {
    id: 'PLAN A', name: 'Growth Plan', price: '₹18,000', tone: 'green', badge: '',
    features: ['8 reels per month — shot & edited','Captions, transitions & premium editing','Hashtag research & content strategy','Instagram & YouTube Shorts posting','Monthly performance report','Dedicated account manager']
  },
  {
    id: 'PLAN B', name: 'PR & Branding', price: '₹40,000', tone: 'yellow', badge: 'MOST POPULAR',
    features: ['16 reels per month — shot & edited','Complete social media management','Branding-focused content strategy','Organic marketing & profile optimisation','Audience engagement & growth management','Bi-weekly performance reports','Priority support & dedicated strategist']
  },
  {
    id: 'PLAN C', name: 'Business Growth', price: '₹70,000', tone: 'orange', badge: 'BEST VALUE',
    features: ['20 reels per month — shot & edited','Everything in PR & Branding','Lead generation campaign setup','Drone shoot — 1 per month','Full paid ads management','Landing page & conversion optimisation','Weekly strategy calls','Dedicated creative director']
  }
];

const faqs = [
  ['Do you only work in Kanpur?', 'We are based in Kanpur and currently serve Kanpur, Lucknow and Noida, while remaining open to projects across India.'],
  ['Can you handle everything from shoot to ads?', 'Yes. Growthika can handle strategy, scripting, production, editing, posting, branding, websites and paid advertising as one connected system.'],
  ['Are the packages customisable?', 'Yes. The displayed plans are starting frameworks. Scope can be adjusted based on project size, shoot frequency, travel, ad budget and campaign goals.'],
  ['How quickly can we start?', 'After a discovery call and project brief, we can prepare the strategy and production schedule. Exact timing depends on location and scope.']
];

function reveal(delay = 0) {
  return { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .2 }, transition: { duration: .75, delay, ease: [0.22, 1, 0.36, 1] as const } };
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: .2 });
  const heroY = useTransform(scrollYProgress, [0, .2], [0, 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, .18], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1700);
    return () => clearTimeout(t);
  }, []);

  const whatsapp = useMemo(() => 'https://wa.me/918081766280?text=' + encodeURIComponent('Hi Growthika, I would like to discuss marketing for my real estate business.'), []);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const message = `Hi Growthika, I am ${data.get('name')}.\nBusiness: ${data.get('business')}\nRequirement: ${data.get('requirement')}\nPhone: ${data.get('phone')}`;
    window.open('https://wa.me/918081766280?text=' + encodeURIComponent(message), '_blank');
  }

  return (
    <main>
      <motion.div className="progress" style={{ scaleX: smoothProgress }} />

      <AnimatePresence>
        {loading && (
          <motion.div className="loader" exit={{ opacity: 0 }} transition={{ duration: .6 }}>
            <motion.div className="loader-mark" initial={{ scale: .7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .7 }}>
              G<span>↗</span>
            </motion.div>
            <div className="loader-line"><motion.i initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 1.25, ease: 'easeInOut' }} /></div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: .6 }} transition={{ delay: .35 }}>BUILDING ATTENTION</motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="nav-wrap">
        <nav className="nav glass">
          <a href="#top" className="brand"><img src="/growthika-logo.png" alt="Growthika"/><span>growthika</span></a>
          <div className="nav-links">
            {nav.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
          </div>
          <a href={whatsapp} target="_blank" className="nav-cta">Let&apos;s Grow <ArrowRight size={16}/></a>
          <button className="menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu/></button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && <motion.div className="mobile-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
          <button onClick={() => setMenuOpen(false)}><X/></button>
          {nav.map(([label, href], i) => <motion.a key={label} href={href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .06 }}>{label}</motion.a>)}
        </motion.div>}
      </AnimatePresence>

      <section id="top" className="hero section">
        <div className="ambient ambient-a"/><div className="ambient ambient-b"/>
        <div className="grid-bg"/>
        <motion.div className="hero-content" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div className="eyebrow" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.85 }}><Sparkles size={15}/> REAL ESTATE GROWTH STUDIO</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: .95, ease: [0.22,1,0.36,1] }}>
            Turning properties into <span>powerful brands.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.15, duration: .8 }}>
            Cinematic content, branding, social media, websites and performance marketing — built to turn attention into enquiries.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3 }}>
            <a href={whatsapp} target="_blank" className="btn primary magnetic"><MessageCircle size={18}/> Start a Project <ArrowRight size={17}/></a>
            <a href="#work" className="btn secondary"><CirclePlay size={18}/> View Concept Work</a>
          </motion.div>
        </motion.div>

        <motion.div className="hero-orbit" initial={{ opacity: 0, scale: .82 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2, duration: 1.2 }}>
          <div className="orbit ring1"/><div className="orbit ring2"/><div className="orbit ring3"/>
          <div className="hero-card card-a"><Camera/><span>CONTENT</span></div>
          <div className="hero-card card-b"><Rocket/><span>GROWTH</span></div>
          <div className="hero-card card-c"><LayoutGrid/><span>BRANDING</span></div>
          <div className="hero-logo">G<span>↗</span></div>
        </motion.div>

        <div className="scroll-hint"><MousePointer2 size={16}/><span>SCROLL TO EXPLORE</span></div>
      </section>

      <section className="marquee-section">
        <div className="marquee">
          {[...audiences, ...audiences].map((x, i) => <span key={i}>{x}<i>✦</i></span>)}
        </div>
      </section>

      <section className="story section">
        <motion.div className="story-copy" {...reveal()}>
          <span className="section-kicker">THE GROWTHIKA METHOD</span>
          <h2>We don&apos;t create content.<br/><em>We create momentum.</em></h2>
        </motion.div>
        <div className="story-steps">
          {['Attention', 'Trust', 'Enquiries', 'Growth'].map((s, i) => (
            <motion.div className="story-step" key={s} {...reveal(i * .08)}>
              <b>0{i+1}</b><h3>{s}</h3><p>{['Stop the scroll with content people remember.','Build credibility through consistent brand storytelling.','Turn interest into conversations and qualified leads.','Create a system that compounds month after month.'][i]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="services" className="services section">
        <motion.div className="section-head" {...reveal()}>
          <div><span className="section-kicker">EVERYTHING CONNECTED</span><h2>Everything your real estate brand needs to grow.</h2></div>
          <p>One partner. One strategy. Every touchpoint aligned.</p>
        </motion.div>
        <div className="service-grid">
          {services.map((s, i) => <motion.article key={s.title} className="service-card" {...reveal(i*.08)} whileHover={{ y: -10 }}>
            <div className="service-icon"><s.icon/></div><span>{s.tag}</span><h3>{s.title}</h3><p>{s.text}</p><ArrowRight className="service-arrow"/>
          </motion.article>)}
        </div>
      </section>

      <section id="work" className="work section">
        <motion.div className="section-head" {...reveal()}>
          <div><span className="section-kicker">CONCEPT PORTFOLIO</span><h2>Built to show what is possible.</h2></div>
          <p>Sample campaign directions for now. Real client work will replace these as Growthika grows.</p>
        </motion.div>
        <div className="projects">
          {projects.map((p, i) => <motion.article className="project" key={p.title} {...reveal(i*.1)}>
            <div className={p.className}><div className="visual-noise"/><span>{p.n}</span><button><CirclePlay/> Preview</button></div>
            <div className="project-meta"><div><small>{p.type}</small><h3>{p.title}</h3></div><p>{p.desc}</p><ExternalLink/></div>
          </motion.article>)}
        </div>
      </section>

      <section id="process" className="process section">
        <motion.div className="section-head" {...reveal()}>
          <div><span className="section-kicker">HOW WE WORK</span><h2>From first call to measurable growth.</h2></div>
        </motion.div>
        <div className="process-line">
          {['Discover','Strategise','Produce','Launch','Optimise','Scale'].map((x, i) => <motion.div className="process-item" key={x} {...reveal(i*.08)}>
            <span>{String(i+1).padStart(2,'0')}</span><div className="process-dot"/><h3>{x}</h3><p>{['Goals, audience and project context.','Campaign roadmap and creative direction.','Shoot, design, edit and build.','Publish across the right channels.','Track performance and improve.','Double down on what works.'][i]}</p>
          </motion.div>)}
        </div>
      </section>

      <section id="packages" className="packages section">
        <motion.div className="section-head center" {...reveal()}>
          <div><span className="pill">FIXED MONTHLY PLANS</span><h2>Ready-made packages.</h2><p>Clear starting points for every stage of your real estate brand.</p></div>
        </motion.div>
        <div className="plans">
          {plans.map((plan, i) => <motion.article className={`plan ${plan.tone}`} key={plan.name} {...reveal(i*.09)} whileHover={{ y: -10, scale: 1.01 }}>
            {plan.badge && <div className="plan-badge">{plan.badge}</div>}
            <span className="plan-id">{plan.id}</span><h3>{plan.name}</h3><div className="price">{plan.price}<small>/mo</small></div>
            <div className="divider"/>
            <ul>{plan.features.map(f => <li key={f}><Check/>{f}</li>)}</ul>
            <a href={`${whatsapp}&text=${encodeURIComponent('I am interested in the '+plan.name)}`} target="_blank">Get {plan.name} <ArrowRight/></a>
          </motion.article>)}
        </div>
        <motion.p className="package-note" {...reveal()}>Ad spend, travel and specialised production requirements may be quoted separately. Every plan can be customised.</motion.p>
      </section>

      <section id="about" className="about section">
        <motion.div className="about-panel" {...reveal()}>
          <div className="about-mark">G<span>↗</span></div>
          <div><span className="section-kicker">A MODERN GROWTH STUDIO</span><h2>New by age.<br/>Not by ambition.</h2></div>
          <div className="about-copy"><p>Growthika was created for a real estate market that has changed. Generic posts are no longer enough. Brands now need cinematic storytelling, platform-native content and performance systems working together.</p><p>We are building Growthika as an end-to-end partner for ambitious real estate businesses — from local brokers to large developments.</p></div>
        </motion.div>
      </section>

      <section className="promise section">
        <motion.div {...reveal()}><Zap/><span>OUR PROMISE</span><h2>We treat every project like it carries our name — because it does.</h2><p>Clear strategy. Strong creative. Honest communication. Relentless improvement.</p></motion.div>
      </section>

      <section className="faq section">
        <motion.div className="section-head" {...reveal()}><div><span className="section-kicker">QUESTIONS, ANSWERED</span><h2>Before we start.</h2></div></motion.div>
        <div className="faq-list">
          {faqs.map(([q,a],i) => <motion.div className="faq-item" key={q} {...reveal(i*.05)}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{q}</span><ChevronDown className={openFaq===i?'rotate':''}/></button>
            <AnimatePresence initial={false}>{openFaq === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{a}</motion.p>}</AnimatePresence>
          </motion.div>)}
        </div>
      </section>

      <section id="contact" className="contact section">
        <motion.div className="contact-wrap" {...reveal()}>
          <div className="contact-copy"><span className="section-kicker">LET&apos;S BUILD SOMETHING</span><h2>Your next growth chapter starts here.</h2><p>Tell us what you are building. We&apos;ll help shape the story, strategy and system around it.</p>
            <div className="contact-links">
              <a href="tel:+918081766280"><Phone/>+91 80817 66280</a>
              <a href="mailto:growthikaofficial@gmail.com"><Mail/>growthikaofficial@gmail.com</a>
              <span><MapPin/>Near Heera Sweets, Kalyanpur, Kanpur, UP</span>
              <a href="https://instagram.com/growthika" target="_blank"><Instagram/>@growthika</a>
            </div>
          </div>
          <form onSubmit={submit}>
            <label>Your name<input name="name" required placeholder="Full name"/></label>
            <label>Business type<select name="business" defaultValue=""><option value="" disabled>Select one</option>{audiences.map(a=><option key={a}>{a}</option>)}</select></label>
            <label>Phone number<input name="phone" required placeholder="+91"/></label>
            <label>What do you need?<textarea name="requirement" required placeholder="Tell us about your project..."/></label>
            <button className="btn primary" type="submit">Send on WhatsApp <ArrowRight/></button>
          </form>
        </motion.div>
      </section>

      <footer>
        <div className="footer-top"><a href="#top" className="brand"><img src="/growthika-logo.png" alt="Growthika"/><span>growthika</span></a><h2>Attention. Trust. Enquiries. <em>Growth.</em></h2></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Growthika. All rights reserved.</span><div>{nav.slice(0,4).map(([l,h])=><a key={l} href={h}>{l}</a>)}</div><span>Kanpur · Lucknow · Noida · India</span></div>
      </footer>

      <a className="floating-wa" href={whatsapp} target="_blank" aria-label="Chat on WhatsApp"><MessageCircle/><span>Let&apos;s talk</span></a>
    </main>
  );
}
