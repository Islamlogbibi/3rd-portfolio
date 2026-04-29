import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mabrouk Logbibi — AI & Robotics Engineer',
  description:
    'Personal portfolio of Mabrouk Logbibi, a Computer Science & Automation student specializing in AI, robotics, and intelligent systems. Patent holder and award-winning developer.',
  keywords: ['AI', 'Robotics', 'Portfolio', 'Computer Science', 'Machine Learning', 'Algeria'],
  authors: [{ name: 'Mabrouk Logbibi' }],
  openGraph: {
    title: 'Mabrouk Logbibi — AI & Robotics Engineer',
    description: 'Building intelligent systems, AI-driven solutions, and real-world tech products.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
