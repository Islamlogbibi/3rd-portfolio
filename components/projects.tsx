'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, Zap, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react'
import Image from 'next/image'

type FilterKey = 'All' | 'AI' | 'Web' | 'Embedded'

const filters: FilterKey[] = ['All', 'AI', 'Web', 'Embedded']

interface ProjectImage {
  src: string
  alt: string
  caption: string
}

interface Project {
  id: number
  title: string
  type: string
  problem?: string
  solution: string
  tech: string[]
  features: string[]
  impact?: string
  status: 'Production Ready' | 'Ongoing' | 'Hackathon' | 'Startup'
  featured?: boolean
  badges?: string[]
  filter: FilterKey[]
  score?: string
  hackathon?: string
  images?: ProjectImage[]
}

// Images for Smart Blood Supply (blood logistics and ordering platform)
const smartBloodSupplyImages: ProjectImage[] = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-04-25_15-27-46-D2pPSSZzIlGA79TGoCzVixOqKKsJ1T.jpg',
    alt: 'Landing Page',
    caption: 'Smart Blood Supply - Home page with login access',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2kqGT7CroPFN7y2kwhr25IFoxVb0TR.png',
    alt: 'Urgent Orders',
    caption: 'Orders Dashboard - View and manage urgent blood product orders',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NVYp1EkE8mnLWS8dEB8MOT40Riizgd.png',
    alt: 'Waiting Orders',
    caption: 'Waiting Orders - Track pending blood product requests by type',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iby2lXZC62Kp3dgr2r429Lr84ulAlE.png',
    alt: 'Accepted Orders',
    caption: 'Accepted Orders - Monitor orders that have been approved',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-C8xYAoYqqBqTmhWkvVYLh8MSadeFI1.png',
    alt: 'Order Overview with Map',
    caption: 'Order Overview - Route optimization with patient details and delivery tracking',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LoPSq5TOMZ4I3Nvv1FFkxnddVuXoBd.png',
    alt: 'Blood Inventory Management',
    caption: 'Blood Manage - Real-time inventory of blood products by type and group',
  },
]

// Images for BloodCare Management System (hospital/blood center management)
const bloodCareImages: ProjectImage[] = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_1_2026-04-24_16-01-54-dTrKNRI7D5kwu4LVYulz4TXT0rX9fc.jpg',
    alt: 'Dashboard View',
    caption: 'Main Dashboard - Patient overview, transfusion scheduling, and analytics',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2_2026-04-24_16-01-54-nX46ldBGtsVWQi78T5P8NLqfvCybc6.jpg',
    alt: 'Patient Records',
    caption: 'Patient Records - Filtering by category, blood type tracking, and status',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_3_2026-04-24_16-01-54-gZbipgVGFHImhKsY1xPA8NBAn1lEQE.jpg',
    alt: 'Patient Details',
    caption: 'Patient Details - Medical information, contact details, donation history',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_4_2026-04-24_16-01-54-RUq1tb5rz5a7CGxrWKjmZKjR7lgatI.jpg',
    alt: 'Edit Patient Form',
    caption: 'Edit Patient - Comprehensive form for updating patient information',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5_2026-04-24_16-01-54-CsOTZzFsbY1kxagcUZsEaFtC7SF9Ea.jpg',
    alt: 'Today\'s Transfusions',
    caption: 'Today\'s Schedule - Track and manage scheduled transfusions',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_6_2026-04-24_16-01-54-5P8GTMNuvjWYzV1nAIcnWYctnITH95.jpg',
    alt: 'Tomorrow\'s Schedule',
    caption: 'Tomorrow\'s Transfusions - Plan ahead with upcoming schedules',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_7_2026-04-24_16-01-54-lmQ7J1B4L8YPZ9rWyQxpUfUGRrRZT1.jpg',
    alt: 'Schedule Transfusion Modal',
    caption: 'Schedule Transfusion - Priority selection for urgent vs regular cases',
  },
]

// Images for FastPay (fintech QR-based mobile wallet)
const fastPayImages: ProjectImage[] = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-04-27_15-13-57-JYKyZPTZR8QtHNHEyV9qHC5vRck9YU.jpg',
    alt: 'Login Screen',
    caption: 'Welcome Back - FastPay login with email and password authentication',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-04-27_15-12-59-MMBtSVda4SR72Uoxh5M9ZtWDm4R92p.jpg',
    alt: 'Home Dashboard',
    caption: 'Home Screen - Total balance, Send/Request/Insights actions, and recent activity',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-04-27_15-13-46-0QAx2Zl4LjHFX9A7lAvl3wghDpetIc.jpg',
    alt: 'My Wallet',
    caption: 'Wallet View - Balance display, deposit/withdraw/transfer/history actions',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-04-27_15-13-33-pDqSiC79484I86vvmfWGIwtRuwDzLE.jpg',
    alt: 'Transfer Send Mode',
    caption: 'Transfer Methods - Choose between nearby QR scan or remote wallet transfer',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-04-27_15-13-39-zZe5lg2FxZgEk1ntyDvly1NZ4PNeuV.jpg',
    alt: 'QR Code Reception',
    caption: 'Receive Transfer - Display QR code with amount and 15-minute validity',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-04-27_15-13-37-z2SkbM1IporoOWk51KkvpLgowOEt8m.jpg',
    alt: 'Request Amount',
    caption: 'Request Transfer - Specify amount or let sender choose with predefined options',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-04-27_15-13-12-r4N8Ci5LIWaKJex8dIrLVSxdbKnJEh.jpg',
    alt: 'Activity History',
    caption: 'Activity Feed - Filter transactions by All, Income, Expense, Transfer, or Bill',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-04-27_15-12-46-Rk1RJENTLwmWqxA8k0KYULqi9jKiyu.jpg',
    alt: 'Cards Management',
    caption: 'Cards Screen - Child accounts and family virtual cards with spending limits',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-04-27_15-12-38-4Kezxmk1s63Vcc9qyoR7nSQw5haJos.jpg',
    alt: 'Create Child Account',
    caption: 'Child Profile - Add child with relationship, email, password, and nickname',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-04-27_15-12-40-hh3Jbq2sd9VyOo24myTfAsKHazMP04.jpg',
    alt: 'Create Virtual Card',
    caption: 'New Card - Set monthly limit, expiration date, and instant activation',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-04-27_15-12-48-kJd3VRKkQTVBCkR0aLBgjY5jr1FM38.jpg',
    alt: 'Child Dashboard',
    caption: 'Child Account - Spending summary, virtual cards, and recent expenses by category',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-04-27_15-12-42-AGXXcsc9b6yWppWt93YBfEHINFXhE3.jpg',
    alt: 'Virtual Card Details',
    caption: 'Card View - Spending progress, remaining balance, and recent transactions',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-04-27_15-12-31-BdURthi7dHxezmR8pU00qv6Ww11Gcj.jpg',
    alt: 'User Profile',
    caption: 'Profile Settings - Security, linked accounts, preferences, and logout options',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-04-27_15-13-44-ePaI4yogiHFpk6HrEYmkJ73Ds6qK69.jpg',
    alt: 'Deposit Modal',
    caption: 'Deposit Transaction - Amount input with numeric keyboard interface',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-04-27_15-13-42-D4OCarVN370vPkzOOiOinSVmtvwJlz.jpg',
    alt: 'Withdraw Modal',
    caption: 'Withdrawal - Amount entry with numeric keypad and confirmation button',
  },
]

// Placeholder for additional images
const bloodCareImagesPlaceholder: ProjectImage[] = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_1_2026-04-24_16-01-54-dTrKNRI7D5kwu4LVYulz4TXT0rX9fc.jpg',
    alt: 'Dashboard View',
    caption: 'Main Dashboard - Patient overview, transfusion scheduling, and analytics',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2_2026-04-24_16-01-54-nX46ldBGtsVWQi78T5P8NLqfvCybc6.jpg',
    alt: 'Patient Records',
    caption: 'Patient Records - Filtering by category, blood type tracking, and status',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_3_2026-04-24_16-01-54-gZbipgVGFHImhKsY1xPA8NBAn1lEQE.jpg',
    alt: 'Patient Details',
    caption: 'Patient Details - Medical information, contact details, donation history',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_4_2026-04-24_16-01-54-RUq1tb5rz5a7CGxrWKjmZKjR7lgatI.jpg',
    alt: 'Edit Patient Form',
    caption: 'Edit Patient - Comprehensive form for updating patient information',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5_2026-04-24_16-01-54-CsOTZzFsbY1kxagcUZsEaFtC7SF9Ea.jpg',
    alt: 'Today\'s Transfusions',
    caption: 'Today\'s Schedule - Track and manage scheduled transfusions',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_6_2026-04-24_16-01-54-5P8GTMNuvjWYzV1nAIcnWYctnITH95.jpg',
    alt: 'Tomorrow\'s Schedule',
    caption: 'Tomorrow\'s Transfusions - Plan ahead with upcoming schedules',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_7_2026-04-24_16-01-54-lmQ7J1B4L8YPZ9rWyQxpUfUGRrRZT1.jpg',
    alt: 'Schedule Transfusion Modal',
    caption: 'Schedule Transfusion - Priority selection for urgent vs regular cases',
  },
]

const projects: Project[] = [
  {
    id: 1,
    title: 'Smart Blood Supply',
    type: 'Startup / Innovation / Research',
    problem: 'Inefficient blood supply chains and poor coordination between hospitals and blood banks.',
    solution: 'Platform to optimize blood logistics and connect healthcare systems across institutions.',
    tech: ['FastAPI', 'React', 'Python', 'AI Optimization'],
    features: [
      'Blood supply chain optimization',
      'PSL (labile blood product) ordering',
      'Cross-institution coordination',
    ],
    impact: 'Real innovation in healthcare logistics — high-value for research and scholarships.',
    status: 'Startup',
    featured: true,
    badges: ['Patent', 'Certified Startup', 'Score 19.5/20'],
    filter: ['AI', 'Web'],
    score: '19.5 / 20',
    images: smartBloodSupplyImages,
  },
  {
    id: 2,
    title: 'BloodCare Management System',
    type: 'Healthcare System / Real-world Product',
    problem: 'Lack of efficient donor, patient, and inventory management in blood centers.',
    solution: 'Full management platform for blood centers with analytics and scheduling.',
    tech: ['React', 'Django', 'PostgreSQL', 'Chart.js'],
    features: [
      'Patient & donor management',
      'Blood inventory tracking',
      'Appointment scheduling',
      'Analytics dashboard',
      'French interface',
    ],
    impact: 'Designed for real hospital deployment — production-oriented, not a student demo.',
    status: 'Production Ready',
    badges: ['Production Ready'],
    filter: ['Web'],
    images: bloodCareImages,
  },
  {
    id: 3,
    title: 'FastPay',
    type: 'Fintech / Startup',
    problem: 'Cash-heavy markets lack accessible digital payment infrastructure.',
    solution: 'QR-based digital wallet system enabling real-time mobile payments.',
    tech: ['React', 'Flutter', 'FastAPI', 'SQLite'],
    features: [
      'QR code payments',
      'Digital wallet system',
      'Real-time transactions',
      'Child account management',
      'Virtual card controls with limits',
    ],
    impact: 'Graduation project targeting underbanked markets.',
    status: 'Ongoing',
    filter: ['Web'],
    images: fastPayImages,
  },
  {
    id: 4,
    title: 'EcoGuardian AI',
    type: 'Hackathon Project',
    problem: 'Lack of smart tools for sustainable ecological tourism management.',
    solution: 'AI-powered app for ecological tourism monitoring in El Tarf, Algeria.',
    tech: ['Python', 'OpenCV', 'Computer Vision', 'Predictive Analytics'],
    features: [
      'AI-powered ecological analysis',
      'Computer vision for environment monitoring',
      'Predictive analytics dashboard',
    ],
    impact: 'Built in 24 hours. 5th place in Algeria-Tunisia International Hackathon.',
    status: 'Hackathon',
    badges: ['5th Place', '24h Build'],
    filter: ['AI'],
    hackathon: 'Algeria–Tunisia Hackathon',
  },
  {
    id: 5,
    title: 'AI Task Automation Assistant',
    type: 'Automation / AI',
    problem: 'Manual repetitive tasks slow down productivity in daily workflows.',
    solution: 'Python-based intelligent assistant automating daily digital tasks.',
    tech: ['Python', 'Selenium', 'NLP', 'APIs'],
    features: [
      'Web automation',
      'Translation engine',
      'Messaging automation',
      'Equation solving',
    ],
    impact: 'Step toward intelligent assistants and robotics integration.',
    status: 'Production Ready',
    filter: ['AI'],
  },
  {
    id: 6,
    title: 'Face Recognition System',
    type: 'AI / Computer Vision',
    solution: 'Real-time face detection and recognition with database matching.',
    tech: ['Python', 'OpenCV', 'NumPy'],
    features: [
      'Live webcam integration',
      'Face matching with database',
      'Lightweight performance',
    ],
    impact: 'Applied in security and authentication use cases.',
    status: 'Production Ready',
    filter: ['AI'],
  },
  {
    id: 7,
    title: 'Restaurant Management App',
    type: 'Mobile App',
    solution: 'Offline-first mobile app for restaurant order and inventory management.',
    tech: ['Flutter', 'SQLite', 'Dart'],
    features: [
      'Real-time order tracking',
      'Offline-first architecture',
      'Inventory management',
    ],
    status: 'Production Ready',
    filter: ['Web'],
  },
  {
    id: 8,
    title: 'C++ Electronics Library',
    type: 'Embedded Systems / Library',
    solution: 'Reusable C++ library simplifying electronics development on Arduino.',
    tech: ['C++', 'Arduino', 'Embedded C'],
    features: [
      'Reusable hardware modules',
      'Simplified hardware interaction',
      'Plug-and-play components',
    ],
    impact: 'Improves development speed for embedded systems projects.',
    status: 'Production Ready',
    filter: ['Embedded'],
  },
  {
    id: 9,
    title: 'BEMO Robot',
    type: 'Robotics / Competition Project',
    problem: 'Autonomous navigation and task execution in competitive robotics environments.',
    solution: 'Built an intelligent robot with advanced sensor integration and autonomous control systems for national competition.',
    tech: ['Raspberry Pi', 'ESP32', 'Python', 'ROS', 'C++'],
    features: [
      'Autonomous navigation and pathfinding',
      'Real-time sensor fusion (camera, ultrasonic, IMU)',
      'Intelligent task execution logic',
      'Multi-agent coordination',
      'Real-time performance optimization',
    ],
    impact: 'CSA Team achievement — National Robotics Competition winner. Demonstrates advanced robotics engineering, control systems design, and collaborative problem-solving under competition constraints.',
    status: 'Production Ready',
    badges: ['🏆 Award Winner', '1st Place National'],
    filter: ['Embedded'],
  },
]

const statusConfig: Record<Project['status'], { color: string; bg: string }> = {
  'Production Ready': {
    color: 'oklch(0.55 0.18 140)',
    bg: 'oklch(0.55 0.18 140 / 0.12)',
  },
  Ongoing: {
    color: 'oklch(0.55 0.22 260)',
    bg: 'oklch(0.55 0.22 260 / 0.12)',
  },
  Hackathon: {
    color: 'oklch(0.55 0.2 45)',
    bg: 'oklch(0.55 0.2 45 / 0.12)',
  },
  Startup: {
    color: 'oklch(0.6 0.18 25)',
    bg: 'oklch(0.6 0.18 25 / 0.12)',
  },
}

function ImageGallery({ images }: { images: ProjectImage[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      {/* Gallery Container */}
      <div className="relative mt-6 rounded-xl overflow-hidden border border-border bg-card/50">
        {/* Main Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </motion.div>
          </AnimatePresence>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />

          {/* Expand button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-3 right-3 p-2 glass-soft rounded-lg border border-border text-foreground/70 hover:text-foreground hover:border-primary/30 transition-all z-10"
            aria-label="View fullscreen"
          >
            <Maximize2 size={16} />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 glass-soft rounded-full border border-border text-foreground/70 hover:text-foreground hover:border-primary/30 transition-all z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 glass-soft rounded-full border border-border text-foreground/70 hover:text-foreground hover:border-primary/30 transition-all z-10"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <p className="text-sm text-foreground font-medium">{images[currentIndex].caption}</p>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 p-3 overflow-x-auto bg-card/80">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${idx === currentIndex
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-border/30 hover:border-border'
                }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-12 right-0 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {/* Modal Image */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-border">
                <Image
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  fill
                  className="object-contain bg-card"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />

                {/* Navigation */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage() }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 glass-soft rounded-full border border-border text-foreground/70 hover:text-foreground hover:border-primary/30 transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage() }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 glass-soft rounded-full border border-border text-foreground/70 hover:text-foreground hover:border-primary/30 transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Caption and counter */}
              <div className="mt-4 flex items-center justify-between">
                <p className="text-muted-foreground">{images[currentIndex].caption}</p>
                <p className="text-sm text-muted-foreground font-mono">
                  {currentIndex + 1} / {images.length}
                </p>
              </div>

              {/* Thumbnails in modal */}
              <div className="flex gap-2 mt-4 justify-center overflow-x-auto py-2">
                {images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${idx === currentIndex
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-border/30 hover:border-border'
                      }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const status = statusConfig[project.status]

  if (project.featured) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, delay: 0 }}
        className="col-span-full relative glass-soft rounded-2xl border p-8 overflow-hidden group"
        style={{ borderColor: 'oklch(0.6 0.18 25 / 0.4)' }}
      >
        {/* Background glow */}
        <div
          aria-hidden
          className="absolute top-0 right-0 w-96 h-96 blur-[100px] opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'oklch(0.6 0.18 25)' }}
        />

        <div className="relative z-10">
          {/* Header row */}
          <div className="flex flex-col lg:flex-row gap-8 mb-6">
            {/* Left - Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Star size={14} className="text-yellow-500" fill="currentColor" />
                <span className="text-xs font-mono text-yellow-600 dark:text-yellow-400/80 tracking-widest uppercase">
                  Featured Project
                </span>
                {project.badges?.map((badge) => (
                  <span
                    key={badge}
                    className="px-2 py-0.5 text-xs font-semibold rounded-full"
                    style={{
                      background: statusConfig.Startup.bg,
                      color: statusConfig.Startup.color,
                      border: `1px solid ${statusConfig.Startup.color}40`,
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {project.title}
              </h3>
              <p className="text-xs font-mono text-muted-foreground tracking-wider mb-4">
                {project.type}
              </p>

              {project.problem && (
                <div className="mb-4">
                  <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest mb-1">
                    Problem
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.problem}</p>
                </div>
              )}

              <div className="mb-4">
                <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest mb-1">
                  Solution
                </p>
                <p className="text-foreground/80 text-sm leading-relaxed">{project.solution}</p>
              </div>

              {project.impact && (
                <div className="p-4 rounded-xl border text-sm text-muted-foreground leading-relaxed"
                  style={{ background: 'oklch(0.6 0.18 25 / 0.08)', borderColor: 'oklch(0.6 0.18 25 / 0.2)' }}>
                  <span className="text-foreground font-medium">Impact: </span>
                  {project.impact}
                </div>
              )}
            </div>

            {/* Right - Details */}
            <div className="lg:w-72 space-y-5">
              <div>
                <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest mb-2">
                  Key Features
                </p>
                <ul className="space-y-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest mb-2">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono glass-soft rounded-lg border border-border text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{ background: status.bg, color: status.color, border: `1px solid ${status.color}30` }}
              >
                <Zap size={12} />
                {project.status}
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          {project.images && project.images.length > 0 && (
            <div>
              <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest mb-2">
                System Screenshots
              </p>
              <ImageGallery images={project.images} />
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      className="glass-soft rounded-2xl border border-border p-6 flex flex-col gap-4 hover:border-primary/20 transition-all duration-300 group relative overflow-hidden card-hover"
    >
      <div
        aria-hidden
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'var(--primary)' }}
      />

      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-bold text-foreground text-lg leading-tight">{project.title}</h3>
          <p className="text-xs font-mono text-muted-foreground mt-0.5 tracking-wide">
            {project.type}
          </p>
        </div>
        <div
          className="flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold"
          style={{ background: status.bg, color: status.color, border: `1px solid ${status.color}30` }}
        >
          {project.status}
        </div>
      </div>

      {project.badges && (
        <div className="flex flex-wrap gap-1.5">
          {project.badges.map((badge) => (
            <span
              key={badge}
              className="px-2 py-0.5 text-xs glass-soft rounded-full border border-primary/20 text-primary"
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      <p className="text-muted-foreground text-sm leading-relaxed flex-1">{project.solution}</p>

      <ul className="space-y-1.5">
        {project.features.slice(0, 3).map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/60 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 text-xs font-mono glass-soft rounded border border-border text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Image Gallery for non-featured projects */}
      {project.images && project.images.length > 0 && (
        <div className="pt-2">
          <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest mb-2">
            Screenshots
          </p>
          <ImageGallery images={project.images} />
        </div>
      )}
    </motion.div>
  )
}

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeFilter, setActiveFilter] = useState<FilterKey>('All')

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.filter.includes(activeFilter))

  return (
    <section id="projects" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">
            03. Projects
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            What I&apos;ve Built
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-200 ${activeFilter === f
                  ? 'bg-primary text-primary-foreground border-primary glow-primary'
                  : 'glass-soft border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <ProjectCard key={project.id} project={project} idx={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
