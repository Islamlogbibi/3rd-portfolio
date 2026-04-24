'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react'

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mabrouk.logbibi@gmail.com',
    href: 'mailto:mabrouk.logbibi@gmail.com',
    color: 'oklch(0.55 0.22 260)',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Islamlogbibi',
    href: 'https://github.com/Islamlogbibi',
    color: 'oklch(0.50 0.01 240)',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/mabrouk-logbibi',
    href: 'https://www.linkedin.com/in/mabrouk-logbibi-0651b026a/',
    color: 'oklch(0.50 0.18 230)',
  },
]

function fadeUp(delay = 0) {
  return {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay } },
  }
}

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">
            05. Contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            {"Let's Build Something"}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: message */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed text-lg">
              I&apos;m always open to discussing new projects, research opportunities, or collaborations in AI, robotics, and intelligent systems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you have a problem to solve, a product to build, or just want to connect — reach out. I respond to everything.
            </p>

            <a
              href="mailto:mabrouk.logbibi@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-200 glow-primary"
            >
              <Mail size={16} />
              Say Hello
            </a>
          </motion.div>

          {/* Right: links */}
          <div className="space-y-3">
            {contactLinks.map((link, idx) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  variants={fadeUp(0.1 + idx * 0.1)}
                  initial="hidden"
                  animate={isInView ? 'show' : 'hidden'}
                  className="flex items-center gap-4 glass-soft rounded-2xl border border-border p-5 hover:border-primary/30 transition-all duration-300 group card-hover"
                >
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${link.color}10`, borderColor: `${link.color}25` }}
                  >
                    <Icon size={20} style={{ color: link.color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
                      {link.label}
                    </p>
                    <p className="text-foreground font-medium text-sm truncate mt-0.5">
                      {link.value}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                  />
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        variants={fadeUp(0.3)}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        className="max-w-6xl mx-auto mt-20 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground/60"
      >
        <p>
          Designed &amp; built by{' '}
          <span className="text-primary font-medium">Mabrouk Logbibi</span>
        </p>
        <p className="font-mono text-xs">AI &amp; Robotics Engineer · Algeria</p>
      </motion.div>
    </section>
  )
}
