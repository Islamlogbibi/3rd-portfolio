'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skillGroups = [
  {
    category: 'Programming',
    color: 'oklch(0.55 0.22 260)',
    skills: ['Python', 'C', 'C++', 'JavaScript', 'PHP'],
  },
  {
    category: 'Web Development',
    color: 'oklch(0.50 0.2 200)',
    skills: ['React', 'Django', 'FastAPI', 'HTML', 'CSS'],
  },
  {
    category: 'Tools & Frameworks',
    color: 'oklch(0.55 0.18 140)',
    skills: ['OpenCV', 'ROS', 'Flutter', 'SQLite', 'Arduino'],
  },
  {
    category: 'Domains',
    color: 'oklch(0.55 0.2 45)',
    skills: ['Artificial Intelligence', 'Machine Learning', 'Computer Vision', 'Embedded Systems', 'Cybersecurity'],
  },
]

function fadeUp(delay = 0) {
  return {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay } },
  }
}

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp()}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">
            02. Skills
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Technical Arsenal
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.category}
              variants={fadeUp(idx * 0.1)}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="group glass-soft rounded-2xl border border-border p-6 hover:border-primary/30 transition-all duration-300 relative overflow-hidden card-hover"
            >
              {/* Glow accent */}
              <div
                aria-hidden
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: group.color }}
              />

              {/* Category label */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: group.color, boxShadow: `0 0 8px ${group.color}` }}
                />
                <span className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
                  {group.category}
                </span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg border transition-all duration-200 hover:scale-105 cursor-default text-foreground"
                    style={{
                      background: `${group.color}10`,
                      borderColor: `${group.color}25`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
