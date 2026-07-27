import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  Film,
  Megaphone,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'

export const metadata = {
  title: 'Growthika — Real Estate Marketing That Sells',
  description:
    'Growthika helps real estate brands sell properties through premium reels, influencer campaigns, cinematic content and performance marketing.',
}

const services = [
  {
    icon: Film,
    title: 'Cinematic Property Reels',
    text: 'Premium real estate videos designed to stop scrolling and generate serious buyer interest.',
  },
  {
    icon: Users,
    title: 'Influencer Campaigns',
    text: 'Collaborations with relevant creators who bring reach, trust and local market attention.',
  },
  {
    icon: Megaphone,
    title: 'Performance Marketing',
    text: 'Targeted campaigns built to generate enquiries, site visits and qualified leads.',
  },
  {
    icon: BarChart3,
    title: 'Campaign Tracking',
    text: 'Clients can view deliverables, reel usage, invoices, campaign links and progress in one portal.',
  },
]

const packages = [
  {
    name: 'Basic',
    description: 'For individual property owners',
    features: [
      'Professional property reel',
      'Cinematic editing',
      'Social-media format',
      'Campaign-ready delivery',
    ],
  },
  {
    name: 'Creator',
    description: 'For projects that need more reach',
    featured: true,
    features: [
      'Professional property reel',
      'Influencer collaboration',
      'Creative campaign concept',
      'Posting coordination',
      'Performance-ready assets',
    ],
  },
  {
    name: 'Premium',
    description: 'For serious project launches',
    features: [
      'Multiple influencer collaborations',
      'Cinematic property campaign',
      'Ad-ready content',
      'Campaign strategy',
      'Performance marketing support',
    ],
  },
]

export default function HomePage() {
  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <Link href="/" style={styles.logo}>
          <span style={styles.logoOrange}>Grow</span>
          <span>thika</span>
        </Link>

        <nav style={styles.nav}>
          <a href="#services" style={styles.navLink}>
            Services
          </a>
          <a href="#packages" style={styles.navLink}>
            Packages
          </a>
          <a href="#contact" style={styles.navLink}>
            Contact
          </a>
          <Link href="/login" style={styles.loginButton}>
            Client login
          </Link>
        </nav>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroGlowOne} />
        <div style={styles.heroGlowTwo} />

        <div style={styles.heroContent}>
          <div style={styles.eyebrow}>
            <Sparkles size={15} />
            REAL ESTATE GROWTH, REIMAGINED
          </div>

          <h1 style={styles.heroTitle}>
            Turn properties into
            <span style={styles.gradientText}> powerful campaigns.</span>
          </h1>

          <p style={styles.heroText}>
            Growthika combines cinematic content, influencer collaborations and
            performance marketing to help real estate projects attract attention,
            generate enquiries and sell faster.
          </p>

          <div style={styles.heroActions}>
            <a
              href="https://wa.me/919236841145"
              target="_blank"
              rel="noreferrer"
              style={styles.primaryButton}
            >
              Start a campaign
              <ArrowRight size={18} />
            </a>

            <a href="#services" style={styles.secondaryButton}>
              Explore services
            </a>
          </div>

          <div style={styles.trustRow}>
            <span style={styles.trustItem}>
              <Check size={16} />
              Real estate focused
            </span>
            <span style={styles.trustItem}>
              <Check size={16} />
              End-to-end production
            </span>
            <span style={styles.trustItem}>
              <Check size={16} />
              Client portal included
            </span>
          </div>
        </div>

        <div style={styles.heroVisual}>
          <div style={styles.dashboardCard}>
            <div style={styles.dashboardTop}>
              <div>
                <span style={styles.miniLabel}>CAMPAIGN OVERVIEW</span>
                <h3 style={styles.dashboardTitle}>Project Growth</h3>
              </div>
              <div style={styles.liveBadge}>LIVE</div>
            </div>

            <div style={styles.metricsGrid}>
              <div style={styles.metricCard}>
                <Film size={20} color="#ff6a00" />
                <span style={styles.metricLabel}>Reels completed</span>
                <strong style={styles.metricValue}>18</strong>
              </div>

              <div style={styles.metricCard}>
                <Target size={20} color="#ff6a00" />
                <span style={styles.metricLabel}>Campaign reach</span>
                <strong style={styles.metricValue}>284K</strong>
              </div>

              <div style={styles.metricCard}>
                <Users size={20} color="#ff6a00" />
                <span style={styles.metricLabel}>Influencers</span>
                <strong style={styles.metricValue}>6</strong>
              </div>

              <div style={styles.metricCard}>
                <Building2 size={20} color="#ff6a00" />
                <span style={styles.metricLabel}>Qualified leads</span>
                <strong style={styles.metricValue}>142</strong>
              </div>
            </div>

            <div style={styles.progressBlock}>
              <div style={styles.progressHeader}>
                <span>Campaign progress</span>
                <strong>72%</strong>
              </div>
              <div style={styles.progressTrack}>
                <div style={styles.progressFill} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" style={styles.section}>
        <div style={styles.sectionHeading}>
          <span style={styles.sectionEyebrow}>WHAT WE DO</span>
          <h2 style={styles.sectionTitle}>
            Everything needed to market a property professionally.
          </h2>
          <p style={styles.sectionText}>
            From the first shoot to campaign delivery, Growthika manages the
            creative and marketing process in one place.
          </p>
        </div>

        <div style={styles.serviceGrid}>
          {services.map((service) => {
            const Icon = service.icon

            return (
              <article key={service.title} style={styles.serviceCard}>
                <div style={styles.iconBox}>
                  <Icon size={23} />
                </div>
                <h3 style={styles.cardTitle}>{service.title}</h3>
                <p style={styles.cardText}>{service.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section style={styles.darkSection}>
        <div style={styles.splitSection}>
          <div>
            <span style={styles.sectionEyebrow}>WHY GROWTHIKA</span>
            <h2 style={styles.sectionTitle}>
              More than content. A complete growth system.
            </h2>
          </div>

          <div style={styles.featureList}>
            {[
              'Strategy designed specifically for real estate',
              'Professional production and campaign execution',
              'Influencer collaborations managed end-to-end',
              'Clear visibility through a private client dashboard',
            ].map((item) => (
              <div key={item} style={styles.featureItem}>
                <div style={styles.checkCircle}>
                  <Check size={15} />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" style={styles.section}>
        <div style={styles.sectionHeading}>
          <span style={styles.sectionEyebrow}>PACKAGES</span>
          <h2 style={styles.sectionTitle}>Choose the right level of growth.</h2>
          <p style={styles.sectionText}>
            Every project is different. Our packages can be adjusted according to
            location, campaign goals and property scale.
          </p>
        </div>

        <div style={styles.packageGrid}>
          {packages.map((item) => (
            <article
              key={item.name}
              style={{
                ...styles.packageCard,
                ...(item.featured ? styles.featuredPackage : {}),
              }}
            >
              {item.featured && <div style={styles.popularBadge}>MOST POPULAR</div>}

              <h3 style={styles.packageTitle}>{item.name}</h3>
              <p style={styles.packageDescription}>{item.description}</p>

              <div style={styles.packageDivider} />

              <div style={styles.packageFeatures}>
                {item.features.map((feature) => (
                  <div key={feature} style={styles.packageFeature}>
                    <Check size={16} color="#ff6a00" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/919236841145"
                target="_blank"
                rel="noreferrer"
                style={
                  item.featured
                    ? styles.primaryPackageButton
                    : styles.packageButton
                }
              >
                Get a quote
                <ArrowRight size={17} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" style={styles.ctaSection}>
        <div style={styles.ctaGlow} />

        <div style={styles.ctaContent}>
          <span style={styles.sectionEyebrow}>LET&apos;S BUILD YOUR CAMPAIGN</span>
          <h2 style={styles.ctaTitle}>
            Ready to make your property impossible to ignore?
          </h2>
          <p style={styles.ctaText}>
            Tell us about your project and we&apos;ll create a campaign plan built
            around your goals.
          </p>

          <div style={styles.heroActions}>
            <a
              href="https://wa.me/919236841145"
              target="_blank"
              rel="noreferrer"
              style={styles.primaryButton}
            >
              Talk on WhatsApp
              <ArrowRight size={18} />
            </a>

            <a
              href="mailto:growthikaofficial@gmail.com"
              style={styles.secondaryButton}
            >
              Email us
            </a>
          </div>
        </div>
      </section>

      <footer style={styles.footer}>
        <div>
          <Link href="/" style={styles.logo}>
            <span style={styles.logoOrange}>Grow</span>
            <span>thika</span>
          </Link>
          <p style={styles.footerText}>
            Premium real estate marketing from Kanpur, India.
          </p>
        </div>

        <div style={styles.footerLinks}>
          <a href="mailto:growthikaofficial@gmail.com" style={styles.footerLink}>
            growthikaofficial@gmail.com
          </a>
          <span style={styles.footerMuted}>+91 92368 41145</span>
          <Link href="/login" style={styles.footerLink}>
            Client portal
          </Link>
        </div>
      </footer>
    </main>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#08090b',
    color: '#f8f8f8',
    overflowX: 'hidden',
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  header: {
    height: 78,
    maxWidth: 1240,
    margin: '0 auto',
    padding: '0 28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    position: 'relative',
    zIndex: 20,
  },
  logo: {
    display: 'inline-flex',
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: 24,
    fontWeight: 900,
    letterSpacing: '-1.4px',
  },
  logoOrange: {
    color: '#ff6a00',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 28,
  },
  navLink: {
    color: '#b7b9c0',
    textDecoration: 'none',
    fontSize: 14,
  },
  loginButton: {
    color: '#ffffff',
    textDecoration: 'none',
    border: '1px solid rgba(255,255,255,0.16)',
    padding: '11px 17px',
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 700,
    background: 'rgba(255,255,255,0.04)',
  },
  hero: {
    maxWidth: 1240,
    margin: '0 auto',
    padding: '110px 28px 100px',
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: 70,
    alignItems: 'center',
    position: 'relative',
  },
  heroGlowOne: {
    position: 'absolute',
    width: 450,
    height: 450,
    borderRadius: '50%',
    background: 'rgba(255, 91, 0, 0.14)',
    filter: 'blur(110px)',
    top: -100,
    left: -180,
    pointerEvents: 'none',
  },
  heroGlowTwo: {
    position: 'absolute',
    width: 360,
    height: 360,
    borderRadius: '50%',
    background: 'rgba(255, 140, 0, 0.08)',
    filter: 'blur(100px)',
    bottom: -100,
    right: -100,
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
  },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 9,
    color: '#ff7a1a',
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: '2px',
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 'clamp(48px, 6vw, 82px)',
    lineHeight: 0.98,
    margin: 0,
    letterSpacing: '-4px',
    maxWidth: 760,
  },
  gradientText: {
    display: 'block',
    background: 'linear-gradient(90deg, #ff6a00, #ffae57)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
  heroText: {
    maxWidth: 650,
    margin: '28px 0 0',
    color: '#a9abb3',
    fontSize: 18,
    lineHeight: 1.7,
  },
  heroActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 36,
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    minHeight: 52,
    padding: '0 23px',
    borderRadius: 13,
    background: 'linear-gradient(135deg, #ff7a18, #ff5200)',
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: 800,
    boxShadow: '0 15px 45px rgba(255, 90, 0, 0.28)',
  },
  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    padding: '0 23px',
    borderRadius: 13,
    border: '1px solid rgba(255,255,255,0.14)',
    background: 'rgba(255,255,255,0.035)',
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: 700,
  },
  trustRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 18,
    marginTop: 34,
  },
  trustItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    color: '#9598a0',
    fontSize: 13,
  },
  heroVisual: {
    position: 'relative',
    zIndex: 2,
  },
  dashboardCard: {
    border: '1px solid rgba(255,255,255,0.12)',
    background:
      'linear-gradient(145deg, rgba(23,24,29,0.96), rgba(11,12,15,0.96))',
    borderRadius: 28,
    padding: 24,
    boxShadow: '0 40px 100px rgba(0,0,0,0.48)',
  },
  dashboardTop: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  miniLabel: {
    color: '#ff7417',
    fontSize: 10,
    letterSpacing: '1.7px',
    fontWeight: 800,
  },
  dashboardTitle: {
    margin: '7px 0 0',
    fontSize: 25,
  },
  liveBadge: {
    color: '#71e49b',
    border: '1px solid rgba(113,228,155,0.25)',
    background: 'rgba(113,228,155,0.08)',
    padding: '7px 10px',
    borderRadius: 999,
    fontSize: 10,
    fontWeight: 800,
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
    gap: 12,
  },
  metricCard: {
    minHeight: 126,
    padding: 18,
    borderRadius: 17,
    background: '#101115',
    border: '1px solid rgba(255,255,255,0.07)',
    display: 'flex',
    flexDirection: 'column',
  },
  metricLabel: {
    marginTop: 17,
    color: '#858893',
    fontSize: 12,
  },
  metricValue: {
    marginTop: 5,
    fontSize: 26,
  },
  progressBlock: {
    marginTop: 16,
    padding: 18,
    borderRadius: 17,
    background: '#101115',
    border: '1px solid rgba(255,255,255,0.07)',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#d9dae0',
    fontSize: 13,
    marginBottom: 12,
  },
  progressTrack: {
    height: 8,
    background: '#24262c',
    borderRadius: 99,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '72%',
    borderRadius: 99,
    background: 'linear-gradient(90deg, #ff5600, #ff9a42)',
  },
  section: {
    maxWidth: 1240,
    margin: '0 auto',
    padding: '110px 28px',
  },
  sectionHeading: {
    maxWidth: 720,
    marginBottom: 48,
  },
  sectionEyebrow: {
    color: '#ff7214',
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: '2px',
  },
  sectionTitle: {
    margin: '14px 0 0',
    fontSize: 'clamp(36px, 5vw, 58px)',
    lineHeight: 1.05,
    letterSpacing: '-2.5px',
  },
  sectionText: {
    margin: '20px 0 0',
    color: '#a3a5ad',
    fontSize: 17,
    lineHeight: 1.7,
  },
  serviceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
    gap: 16,
  },
  serviceCard: {
    minHeight: 270,
    padding: 25,
    borderRadius: 21,
    background: '#101115',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    display: 'grid',
    placeItems: 'center',
    color: '#ff6a00',
    background: 'rgba(255,106,0,0.1)',
    border: '1px solid rgba(255,106,0,0.18)',
  },
  cardTitle: {
    margin: '25px 0 0',
    fontSize: 21,
  },
  cardText: {
    margin: '13px 0 0',
    color: '#9699a2',
    lineHeight: 1.65,
    fontSize: 14,
  },
  darkSection: {
    borderTop: '1px solid rgba(255,255,255,0.07)',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    background: '#0d0e11',
  },
  splitSection: {
    maxWidth: 1240,
    margin: '0 auto',
    padding: '100px 28px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 80,
    alignItems: 'center',
  },
  featureList: {
    display: 'grid',
    gap: 15,
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    minHeight: 66,
    padding: '0 18px',
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.025)',
    color: '#d5d6dc',
  },
  checkCircle: {
    width: 31,
    height: 31,
    display: 'grid',
    placeItems: 'center',
    color: '#ff7414',
    background: 'rgba(255,106,0,0.1)',
    borderRadius: 999,
    flexShrink: 0,
  },
  packageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
    gap: 18,
  },
  packageCard: {
    position: 'relative',
    padding: 27,
    borderRadius: 23,
    background: '#101115',
    border: '1px solid rgba(255,255,255,0.09)',
  },
  featuredPackage: {
    border: '1px solid rgba(255,106,0,0.5)',
    background:
      'linear-gradient(160deg, rgba(255,106,0,0.09), rgba(16,17,21,1) 45%)',
    transform: 'translateY(-10px)',
  },
  popularBadge: {
    position: 'absolute',
    top: 18,
    right: 18,
    color: '#ff7b1a',
    fontSize: 9,
    fontWeight: 900,
    letterSpacing: '1px',
  },
  packageTitle: {
    fontSize: 27,
    margin: 0,
  },
  packageDescription: {
    color: '#92959d',
    marginTop: 10,
    minHeight: 42,
  },
  packageDivider: {
    height: 1,
    background: 'rgba(255,255,255,0.08)',
    margin: '24px 0',
  },
  packageFeatures: {
    display: 'grid',
    gap: 14,
    minHeight: 190,
  },
  packageFeature: {
    display: 'flex',
    gap: 10,
    color: '#c5c7cd',
    fontSize: 14,
  },
  packageButton: {
    marginTop: 25,
    height: 50,
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.13)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 700,
  },
  primaryPackageButton: {
    marginTop: 25,
    height: 50,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #ff7717, #ff5000)',
  },
  ctaSection: {
    maxWidth: 1184,
    margin: '30px auto 100px',
    padding: '75px 30px',
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center',
    borderRadius: 30,
    border: '1px solid rgba(255,106,0,0.28)',
    background:
      'linear-gradient(145deg, rgba(255,106,0,0.13), rgba(15,16,19,1) 55%)',
  },
  ctaGlow: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: '50%',
    background: 'rgba(255,100,0,0.18)',
    filter: 'blur(90px)',
    top: -180,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  ctaContent: {
    maxWidth: 760,
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },
  ctaTitle: {
    margin: '15px 0 0',
    fontSize: 'clamp(38px, 5vw, 62px)',
    lineHeight: 1.05,
    letterSpacing: '-2.5px',
  },
  ctaText: {
    color: '#a7a9b0',
    fontSize: 17,
    lineHeight: 1.7,
    margin: '20px auto 0',
    maxWidth: 620,
  },
  footer: {
    maxWidth: 1240,
    margin: '0 auto',
    padding: '35px 28px 50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  footerText: {
    color: '#747781',
    fontSize: 13,
    marginTop: 12,
  },
  footerLinks: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 9,
    fontSize: 13,
  },
  footerLink: {
    color: '#c7c8ce',
    textDecoration: 'none',
  },
  footerMuted: {
    color: '#777a83',
  },
}