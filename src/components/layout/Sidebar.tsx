import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FileText,
  Brain,
  Sparkles,
  Zap,
  FolderOpen,
  FileOutput,
  Clock,
  MessageSquare,
  Settings,
  Terminal,
} from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', description: 'System overview' },
  { to: '/config', icon: FileText, label: 'Config', description: 'Core configuration' },
  { to: '/memory', icon: Brain, label: 'Memory', description: 'Memory system' },
  { to: '/prompts', icon: Sparkles, label: 'Prompts', description: 'Prompt templates' },
  { to: '/skills', icon: Zap, label: 'Skills', description: 'Installed skills' },
  { to: '/projects', icon: FolderOpen, label: 'Projects', description: 'Local projects' },
  { to: '/output', icon: FileOutput, label: 'Output', description: 'Output files' },
  { to: '/cron', icon: Clock, label: 'Cron', description: 'Scheduled tasks' },
  { to: '/sessions', icon: MessageSquare, label: 'Sessions', description: 'Session history' },
  { to: '/settings', icon: Settings, label: 'Settings', description: 'OpenClaw config' },
]

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[var(--spacing-sidebar)] bg-[var(--color-surface)] border-r border-[var(--color-border)] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[var(--color-border-subtle)]">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-[var(--color-accent)] flex items-center justify-center">
            <Terminal className="size-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-[var(--color-text-primary)] text-lg tracking-tight">
              OpenClaw
            </h1>
            <p className="text-xs text-[var(--color-text-muted)]">Command Center</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                    'hover:bg-[var(--color-surface-hover)]',
                    isActive
                      ? 'bg-[var(--color-accent-subtle)] text-[var(--color-accent-hover)]'
                      : 'text-[var(--color-text-secondary)]'
                  )
                }
              >
                <item.icon className="size-5 shrink-0" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--color-border-subtle)]">
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <div className="size-2 rounded-full bg-[var(--color-success)] animate-pulse" />
          <span>Gateway running</span>
        </div>
      </div>
    </aside>
  )
}
