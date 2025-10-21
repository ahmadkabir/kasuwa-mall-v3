import { ReactNode } from 'react'
import { Navbar } from './navbar'
import { Footer } from './footer'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-kasuwa-secondary via-kasuwa-primary/10 to-kasuwa-brown/10 dark:from-gray-900 dark:via-kasuwa-primary/20 dark:to-kasuwa-brown/20" />
      
      {/* Animated background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-kasuwa-secondary dark:bg-kasuwa-primary rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-float" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-kasuwa-brown dark:bg-kasuwa-secondary rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-float animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-kasuwa-primary dark:bg-kasuwa-brown rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-float animation-delay-4000" />
      </div>

      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      
      <Footer />
    </div>
  )
}
