'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'

type AnimatedSectionProps = {
  children: ReactNode
  className?: string
}

export default function AnimatedSection({
  children,
  className = '',
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`${className} animated-section ${
        isVisible ? 'animated-section-visible' : ''
      }`}
    >
      {children}
    </section>
  )
}