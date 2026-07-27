import type React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Camera,
  Check,
  Code2,
  Video,
  Megaphone,
  MousePointer2,
  Play,
  Smartphone,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import PublicNav from '@/components/PublicNav'
import Hero3D from '@/components/Hero3D'
import AnimatedSection from '@/components/AnimatedSection'

const services: Array<[string, React.ComponentType<any>, string]> = [
  ['Reel Production', Camera, 'Cinematic property reels built for attention and enquiries.'],
  ['Drone Videography', Video, 'Aerial visuals that make plots and projects feel larger than life.'],
  ['Social Media', Smartphone, 'Strategy, content calendars, posting and community growth.'],
  ['Influencer Marketing', Users, 'Private creator network matched to your location and audience.'],
  ['Meta & Google Ads', Target, 'Lead campaigns designed around real estate buyer intent.'],
  ['Web Development', Code2, 'Fast, premium websites and landing pages that convert.'],
]

const packages = [
  [
    'Growth Plan',
    '₹18,000',
    'For consistent content and a stronger digital presence',
    ['Professional reel shoots', 'Drone footage', 'Creative designs', 'Monthly reporting'],
  ],
  [
    'PR & Branding',
    '₹40,000',
    'For projects that need authority and reach',
    ['Everything in Growth Plan', 'Influencer collaboration', 'Personal branding', 'Campaign strategy'],
  ],
  [
    'Business Growth',
    '₹70,000',
    'For serious lead generation and scale',
    ['Premium cinematic content', '2–3 influencer activations', 'Meta + Google ads', 'Lead funnel and optimisation'],
  ],
]

export default function Home() {
  return (
    <>
      <PublicNav />

      <main className="public">
        <section className="hero hero-enter">
          <div className="heroGlow" />

          <div className="heroCopy">
            <div className="eyebrow hero-kicker">
              <Sparkles size={15} /> REAL ESTATE GROWTH STUDIO
            </div>

            <h1 className="hero-title">
              We turn properties into <em>desirable brands.</em>
            </h1>

            <p className="hero-description">
              Growthika combines cinematic content, performance marketing and digital systems to help real estate businesses attract attention, leads and trust.
            </p>

            <div className="heroActions hero-actions-enter">
              <a className="primary" href="#contact">
                Start a project <ArrowRight size={18} />
              </a>
              <a className="ghost" href="#work">
                <Play size={17} /> See our work
              </a>
            </div>

            <div className="heroStats hero-stats-enter">
              <div>
                <strong>360°</strong>
                <span>Growth support</span>
              </div>
              <div>
                <strong>10+</strong>
                <span>Core services</span>
              </div>
              <div>
                <strong>1</strong>
                <span>Unified client portal</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-enter">
            <Hero3D />
          </div>

          <div className="scrollHint">SCROLL TO EXPLORE</div>
        </section>

        <AnimatedSection className="logoStrip">
          <span>BUILDERS</span>
          <span>DEVELOPERS</span>
          <span>BROKERS</span>
          <span>ARCHITECTS</span>
          <span>INTERIORS</span>
        </AnimatedSection>

        <AnimatedSection className="section">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">WHAT WE DO</div>
              <h2>Everything your real estate brand needs to grow.</h2>
            </div>
            <p>One focused team for content, distribution, advertising and digital experience.</p>
          </div>

          <div id="services" className="serviceGrid stagger-grid">
            {services.map(([title, Icon, description], index) => (
              <article className="serviceCard stagger-item" key={title}>
                <div className="serviceNo">0{index + 1}</div>
                <Icon />
                <h3>{title}</h3>
                <p>{description}</p>
                <MousePointer2 className="cornerIcon" />
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="videoSection">
          <div className="videoText">
            <div className="eyebrow">CINEMATIC STORYTELLING</div>
            <h2>Make buyers feel the property before they visit it.</h2>
            <p>Temporary showcase footage is included now. Replace it later with your own shoots from Growthika projects.</p>
            <a href="#contact" className="textLink">
              Plan your first shoot <ArrowRight size={17} />
            </a>
          </div>

          <div id="work" className="videoGrid">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
            >
              <source
                src="https://videos.pexels.com/video-files/3773486/3773486-hd_1920_1080_30fps.mp4"
                type="video/mp4"
              />
            </video>

            <video autoPlay muted loop playsInline>
              <source
                src="https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4"
                type="video/mp4"
              />
            </video>

            <div className="videoBadge">
              <BarChart3 />
              <strong>Content that performs</strong>
              <span>Designed for discovery, trust and enquiries.</span>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="section">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">PACKAGES</div>
              <h2>Choose a growth level. Upgrade anytime.</h2>
            </div>
          </div>

          <div id="packages" className="priceGrid stagger-grid">
            {packages.map((item, index) => (
              <article
                className={`${index === 1 ? 'priceCard featured' : 'priceCard'} stagger-item`}
                key={item[0] as string}
              >
                {index === 1 && <div className="popular">MOST POPULAR</div>}
                <span>{item[0] as string}</span>
                <h3>{item[1] as string}</h3>
                <p>{item[2] as string}</p>
                <ul>
                  {(item[3] as string[]).map((feature) => (
                    <li key={feature}>
                      <Check size={16} /> {feature}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={index === 1 ? 'primary full' : 'ghost full'}>
                  Enquire now
                </a>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="section why">
          <div className="whyVisual">
            <div className="orbit o1" />
            <div className="orbit o2" />
            <div className="growthG">G</div>
          </div>

          <div>
            <div className="eyebrow">WHY GROWTHIKA</div>
            <h2>Creative enough to stand out. Strategic enough to sell.</h2>
            <p>We are building Growthika as a modern operating partner for real estate teams—not just another social media agency.</p>

            <div className="promiseGrid stagger-grid">
              <div className="stagger-item">
                <Megaphone />
                <strong>Clear communication</strong>
                <span>Track work, links and package usage in your portal.</span>
              </div>
              <div className="stagger-item">
                <BarChart3 />
                <strong>Measurable progress</strong>
                <span>See deliverables, invoices and campaign status.</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <section id="contact" className="contact contact-reveal">
          <div>
            <div className="eyebrow">LET&apos;S GROW</div>
            <h2>Your next project deserves more attention.</h2>
            <p>Tell us what you are selling and where. We will suggest the right content and growth plan.</p>
          </div>

          <div className="contactActions">
            <a className="primary" href="https://wa.me/919236841145" target="_blank" rel="noreferrer">
              WhatsApp us <ArrowRight />
            </a>
            <a className="ghost" href="mailto:growthikaofficial@gmail.com">
              growthikaofficial@gmail.com
            </a>
            <span>Near Heera Sweets, Kalyanpur, Kanpur, Uttar Pradesh</span>
          </div>
        </section>
      </main>

      <footer>
        <Link className="brand" href="/">
          <span>G</span>rowthika
        </Link>
        <p>Real estate growth, beautifully managed.</p>
        <small>© 2026 Growthika. All rights reserved.</small>
      </footer>
    </>
  )
}