import { ReactNode } from 'react'
import { Navbar } from './navbar'
import { Footer } from './footer'
import { FloatingContact } from './floating-contact'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-secondary/5 via-primary/10 to-accent/10 dark:from-gray-900 dark:via-primary/20 dark:to-secondary/20" />
      

      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      
      <Footer />
      
      {/* Floating Contact Buttons */}
      <FloatingContact />
    </div>
  )
}