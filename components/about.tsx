'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Cpu, Globe, Lightbulb } from 'lucide-react'

const stats = [
  { label: 'Projects Built', value: '8+' },
  { label: 'Patents Held', value: '1' },
  { label: 'Awards Won', value: '3' },
  { label: 'Hackathons', value: '2+' },
]

const interests = [
  { icon: Brain, label: 'AI & Machine Learning' },
  { icon: Cpu, label: 'Robotics & Embedded' },
  { icon: Globe, label: 'Computer Vision' },
  { icon: Lightbulb, label: 'Intelligent Systems' },
]

function fadeUp(delay = 0) {
  return {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay } },
  }
}

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">
            01. About
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Who I Am
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Text content */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="space-y-5"
          >
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m a 3rd-year Computer Science &amp; Automation student with a laser focus on{' '}
              <span className="text-foreground font-medium">AI, robotics, and intelligent systems</span>.
              I don&apos;t build to learn — I build to ship. Every project I take on is designed with
              real-world impact and production quality in mind.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My startup mindset pushes me beyond academic exercises. From holding a{' '}
              <span className="text-primary font-medium">patent for a healthcare logistics platform</span>{' '}
              to competing in international hackathons, I chase problems that matter and engineer
              solutions that scale.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My long-term vision: a{' '}
              <span className="text-primary font-medium">
                sign language translation glove
              </span>{' '}
              — a fusion of AI, computer vision, and embedded hardware that bridges communication gaps
              for the deaf and hard-of-hearing community. A project I&apos;m actively working toward.
            </p>

            {/* Interest pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {interests.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 py-2 glass-soft rounded-lg border border-border text-sm text-muted-foreground card-hover"
                >
                  <Icon size={14} className="text-primary" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-soft rounded-2xl border border-border p-6 hover:border-primary/30 transition-all duration-300 card-hover"
                >
                  <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Vision card */}
            <div className="glass-soft rounded-2xl border border-accent/20 p-6 relative overflow-hidden card-hover">
              <div
                aria-hidden
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 dark:opacity-20"
                style={{ background: 'var(--accent)' }}
              />
              <p className="text-xs font-mono text-accent tracking-widest uppercase mb-2">
                Long-term Vision
              </p>
              <p className="text-foreground font-semibold text-lg mb-2">
                Sign Language Translation Glove
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Glove + Computer Vision + AI — translating sign language in real-time,
                breaking communication barriers with hardware meets intelligence.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
