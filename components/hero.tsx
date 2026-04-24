'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Download, ExternalLink } from 'lucide-react'
import { useEffect, useRef, useCallback } from 'react'
import { useTheme } from 'next-themes'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const nodesRef = useRef<Node[]>([])
  const rafRef = useRef<number>(0)
  const { resolvedTheme } = useTheme()

  const initNodes = useCallback((width: number, height: number) => {
    const count = Math.floor((width * height) / 8000)
    nodesRef.current = Array.from({ length: Math.min(count, 150) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 1,
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isDark = resolvedTheme === 'dark'
    const nodeColor = isDark ? 'rgba(139, 92, 246, 0.7)' : 'rgba(99, 102, 241, 0.6)'
    const edgeColor = isDark ? 'rgba(139, 92, 246,' : 'rgba(99, 102, 241,'
    const mouseNodeColor = isDark ? 'rgba(56, 189, 248, 0.9)' : 'rgba(6, 182, 212, 0.9)'
    const mouseEdgeColor = isDark ? 'rgba(56, 189, 248,' : 'rgba(6, 182, 212,'
    const CONNECTION_DIST = 120
    const MOUSE_DIST = 200

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initNodes(canvas.width, canvas.height)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const nodes = nodesRef.current
      const mouse = mouseRef.current

      // Update positions
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > w) node.vx *= -1
        if (node.y < 0 || node.y > h) node.vy *= -1

        // Mouse magnet attraction
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_DIST && dist > 10) {
          const force = (MOUSE_DIST - dist) / MOUSE_DIST
          // Attract towards mouse (positive direction)
          node.vx += (dx / dist) * force * 0.5
          node.vy += (dy / dist) * force * 0.5
        }

        // Damping (stronger when near mouse for smoother movement)
        const nearMouse = dist < MOUSE_DIST
        node.vx *= nearMouse ? 0.92 : 0.995
        node.vy *= nearMouse ? 0.92 : 0.995
        
        // Min speed (only when not near mouse)
        if (!nearMouse) {
          const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy)
          if (speed < 0.15) {
            node.vx += (Math.random() - 0.5) * 0.05
            node.vy += (Math.random() - 0.5) * 0.05
          }
        }
      }

      // Draw edges between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.5
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `${edgeColor}${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw mouse-to-nearby-nodes edges
      for (const node of nodes) {
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_DIST) {
          const alpha = (1 - dist / MOUSE_DIST) * 0.8
          ctx.beginPath()
          ctx.moveTo(mouse.x, mouse.y)
          ctx.lineTo(node.x, node.y)
          ctx.strokeStyle = `${mouseEdgeColor}${alpha})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const isNearMouse = dist < MOUSE_DIST

        ctx.beginPath()
        ctx.arc(node.x, node.y, isNearMouse ? node.radius * 1.5 : node.radius, 0, Math.PI * 2)
        ctx.fillStyle = isNearMouse ? mouseNodeColor : nodeColor
        ctx.fill()

        if (isNearMouse) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2)
          ctx.fillStyle = `${mouseEdgeColor}0.15)`
          ctx.fill()
        }
      }

      // Draw mouse node
      if (mouse.x > -1000) {
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = mouseNodeColor
        ctx.fill()
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2)
        ctx.fillStyle = `${mouseEdgeColor}0.2)`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [resolvedTheme, initNodes])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Interactive network canvas */}
      <NetworkCanvas />

      {/* Ambient background orbs */}
      <motion.div
        aria-hidden
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20 dark:opacity-20"
        style={{ background: 'var(--primary)' }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.2, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-15 dark:opacity-15"
        style={{ background: 'var(--accent)' }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 text-balance"
        >
          <span className="text-foreground">Mabrouk </span>
          <span className="text-gradient">Logbibi</span>
        </motion.h1>

        {/* Title */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="text-xl sm:text-2xl font-mono text-primary tracking-wide">
            AI &amp; Robotics Engineer
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed text-pretty"
        >
          Building intelligent systems, AI-driven solutions, and real-world tech products.
        </motion.p>

        {/* Badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {['Patent Holder', 'Award Winner', 'Startup Founder', 'Open Source'].map((badge) => (
            <span
              key={badge}
              className="px-3 py-1 text-xs font-medium glass-soft rounded-full border border-primary/20 text-primary"
            >
              {badge}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <a
            href="#projects"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-200 glow-primary"
          >
            <ExternalLink size={16} />
            View Projects
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3 glass-soft border border-border text-foreground font-semibold rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
          >
            <Mail size={16} />
            Contact Me
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-6 py-3 glass-soft border border-border text-muted-foreground font-medium rounded-xl hover:border-accent/30 hover:text-foreground transition-all duration-200"
          >
            <Download size={16} />
            Download CV
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div variants={itemVariants} className="flex justify-center gap-4 mb-16">
          <a
            href="https://github.com/Islamlogbibi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-3 glass-soft rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/mabrouk-logbibi-0651b026a/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-3 glass-soft rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:mabrouk.logbibi@gmail.com"
            aria-label="Email"
            className="p-3 glass-soft rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200"
          >
            <Mail size={18} />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-2 text-muted-foreground/50"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown size={18} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
