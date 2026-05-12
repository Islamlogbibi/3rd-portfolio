'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Trophy, FileText, Users, Briefcase } from 'lucide-react'

const certificates = [
  {
    title: 'Python Camp Certificate',
    org: 'Algerian Olympiad in Informatics',
    date: 'Sep 2023',
    icon: FileText,
    color: 'oklch(0.55 0.22 260)',
  },
  {
    title: '1st Place — National Problem Solving',
    org: 'National Competition',
    date: 'Dec 2024',
    icon: Trophy,
    color: 'oklch(0.65 0.18 55)',
    badge: '1st Place',
  },
  {
    title: 'Patent Recognition Certificate',
    org: 'Smart Blood Supply Project',
    date: 'Dec 2024',
    icon: Award,
    color: 'oklch(0.6 0.18 25)',
    badge: 'Patent',
  },
  {
    title: 'Invigilator — 1st North African Olympiad',
    org: 'North African Olympiad in Informatics',
    date: 'Apr 2025',
    icon: Users,
    color: 'oklch(0.50 0.2 200)',
  },
  {
    title: '5th Place — Algeria–Tunisia Hackathon',
    org: 'Team CSA',
    date: 'May 2025',
    icon: Trophy,
    color: 'oklch(0.55 0.18 140)',
    badge: '5th Place',
  },
  {
    title: '1st Place — National Robotics Competition',
    org: 'Biskra Competition',
    date: 'Apr 2026',
    icon: Trophy,
    color: 'oklch(0.65 0.18 55)',
    badge: '1st Place',
  },
  {
    title: '2nd Place — BitHack Hackathon',
    org: 'BitHack, Annaba',
    date: 'May 2026',
    icon: Trophy,
    color: 'oklch(0.60 0.18 40)',
    badge: '2nd Place',
  },
]

const experience = [
  {
    role: 'President — R&D Department',
    org: 'HTIC',
    period: '2025 / 2026',
    description: 'Leading the Research & Development department, driving innovation initiatives and managing technical projects.',
    icon: Briefcase,
    color: 'oklch(0.55 0.22 260)',
  },
  {
    role: 'Remote Developer',
    org: 'PromptLine (France)',
    period: 'Nov 2025 – Apr 2026',
    description: 'Full-stack development in a remote international environment, working with a French tech company.',
    icon: Briefcase,
    color: 'oklch(0.50 0.2 200)',
  },
]

function fadeUp(delay = 0) {
  return {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay } },
  }
}

function TimelineItem({ 
  item, 
  index, 
  isInView 
}: { 
  item: typeof certificates[0]
  index: number
  isInView: boolean 
}) {
  const Icon = item.icon
  const isLeft = index % 2 === 0

  return (
    <motion.div
      variants={fadeUp(0.1 + index * 0.08)}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      className="relative grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-start"
    >
      {/* Left content (desktop) / Content (mobile) */}
      <div className={`${isLeft ? 'md:block' : 'md:invisible'} hidden md:block`}>
        {isLeft && (
          <div className="glass-soft rounded-xl border border-border p-5 hover:border-primary/30 transition-all duration-300 card-hover text-right">
            <div className="flex items-start justify-end gap-3 mb-2">
              {item.badge && (
                <span
                  className="flex-shrink-0 px-2.5 py-1 text-xs font-bold rounded-full"
                  style={{
                    background: `${item.color}15`,
                    color: item.color,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  {item.badge}
                </span>
              )}
              <h4 className="font-semibold text-foreground leading-tight">
                {item.title}
              </h4>
            </div>
            <p className="text-sm text-muted-foreground">{item.org}</p>
            <p className="text-xs font-mono text-muted-foreground/70 mt-2">
              {item.date}
            </p>
          </div>
        )}
      </div>

      {/* Center timeline */}
      <div className="flex flex-col items-center">
        <motion.div
          className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-sm bg-card"
          style={{
            borderColor: item.color,
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <Icon size={16} style={{ color: item.color }} />
        </motion.div>
        {/* Connector line */}
        {index < certificates.length - 1 && (
          <div className="w-0.5 h-full min-h-[60px] bg-border/50 mt-2" />
        )}
      </div>

      {/* Right content (desktop) / Content (mobile) */}
      <div className={`${!isLeft ? 'md:block' : 'md:invisible'} md:block`}>
        {/* Mobile: always show */}
        <div className="md:hidden glass-soft rounded-xl border border-border p-5 hover:border-primary/30 transition-all duration-300 card-hover">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h4 className="font-semibold text-foreground leading-tight">
              {item.title}
            </h4>
            {item.badge && (
              <span
                className="flex-shrink-0 px-2.5 py-1 text-xs font-bold rounded-full"
                style={{
                  background: `${item.color}15`,
                  color: item.color,
                  border: `1px solid ${item.color}30`,
                }}
              >
                {item.badge}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{item.org}</p>
          <p className="text-xs font-mono text-muted-foreground/70 mt-2">
            {item.date}
          </p>
        </div>

        {/* Desktop right side */}
        {!isLeft && (
          <div className="hidden md:block glass-soft rounded-xl border border-border p-5 hover:border-primary/30 transition-all duration-300 card-hover">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h4 className="font-semibold text-foreground leading-tight">
                {item.title}
              </h4>
              {item.badge && (
                <span
                  className="flex-shrink-0 px-2.5 py-1 text-xs font-bold rounded-full"
                  style={{
                    background: `${item.color}15`,
                    color: item.color,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  {item.badge}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{item.org}</p>
            <p className="text-xs font-mono text-muted-foreground/70 mt-2">
              {item.date}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function Achievements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="achievements" ref={ref} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="mb-16 text-center"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">
            04. Achievements
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Certificates &amp; Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="mb-20">
          <motion.p
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-8 text-center"
          >
            Certificates &amp; Awards
          </motion.p>

          <div className="space-y-0">
            {certificates.map((cert, idx) => (
              <TimelineItem 
                key={cert.title} 
                item={cert} 
                index={idx} 
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <motion.p
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-8 text-center"
          >
            Experience
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {experience.map((exp, idx) => {
              const Icon = exp.icon
              return (
                <motion.div
                  key={exp.role}
                  variants={fadeUp(0.15 + idx * 0.1)}
                  initial="hidden"
                  animate={isInView ? 'show' : 'hidden'}
                  className="glass-soft rounded-2xl border border-border p-6 hover:border-primary/30 transition-all duration-300 card-hover relative overflow-hidden group"
                >
                  <div
                    aria-hidden
                    className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-500"
                    style={{ background: exp.color }}
                  />
                  <div className="flex items-start gap-4 relative z-10">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center"
                      style={{ background: `${exp.color}10`, borderColor: `${exp.color}25` }}
                    >
                      <Icon size={20} style={{ color: exp.color }} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground">{exp.role}</h4>
                      <div className="flex items-center gap-2 mt-0.5 mb-2">
                        <span className="text-sm text-primary">{exp.org}</span>
                        <span className="text-muted-foreground/40">·</span>
                        <span className="text-xs font-mono text-muted-foreground/70">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Team section */}
          <motion.div
            variants={fadeUp(0.3)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
          >
            <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-6 text-center">
              Team Experience
            </p>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="glass-soft rounded-xl border border-border p-5 card-hover">
                <p className="text-sm font-semibold text-foreground mb-3">Team CSA</p>
                <div className="flex flex-wrap gap-2">
                  {['Mabrouk Logbibi', 'Ali Bahri'].map((name) => (
                    <span
                      key={name}
                      className="px-3 py-1.5 text-xs glass-soft rounded-lg border border-primary/20 text-primary"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="glass-soft rounded-xl border border-border p-5 card-hover">
                <p className="text-sm font-semibold text-foreground mb-3">Robotics Competition Team</p>
                <div className="flex flex-wrap gap-2">
                  {['Mabrouk Logbibi', 'Ali Bahri', 'Khiari Mohammed Aymen'].map((name) => (
                    <span
                      key={name}
                      className="px-3 py-1.5 text-xs glass-soft rounded-lg border border-accent/20 text-muted-foreground"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
