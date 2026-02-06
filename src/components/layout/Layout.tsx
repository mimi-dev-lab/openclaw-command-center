import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-[var(--color-background)]">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[var(--color-surface)] border-b border-[var(--color-border)] z-40 flex items-center px-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 -ml-2 rounded-lg hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)]"
        >
          <Menu className="size-6" />
        </button>
        <div className="ml-3 flex items-center gap-2">
          <div className="size-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm">🐱</span>
          </div>
          <span className="font-bold text-[var(--color-text-primary)]">OpenClaw</span>
        </div>
      </header>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'lg:block',
          sidebarOpen ? 'block' : 'hidden'
        )}
      >
        <div className="lg:hidden absolute top-4 right-4 z-50">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)]"
          >
            <X className="size-5" />
          </button>
        </div>
        <Sidebar onNavigate={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <main className="lg:ml-[var(--spacing-sidebar)] min-h-dvh pt-14 lg:pt-0">
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
