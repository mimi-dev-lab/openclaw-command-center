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
  Cat,
} from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: '仪表盘', description: '系统概览' },
  { to: '/config', icon: FileText, label: '配置文件', description: '核心配置' },
  { to: '/memory', icon: Brain, label: '记忆系统', description: 'Memory' },
  { to: '/prompts', icon: Sparkles, label: '提示词', description: 'Prompts' },
  { to: '/skills', icon: Zap, label: '技能库', description: 'Skills' },
  { to: '/projects', icon: FolderOpen, label: '项目', description: 'Projects' },
  { to: '/output', icon: FileOutput, label: '输出文件', description: 'Output' },
  { to: '/cron', icon: Clock, label: '定时任务', description: 'Cron' },
  { to: '/sessions', icon: MessageSquare, label: '会话', description: 'Sessions' },
  { to: '/settings', icon: Settings, label: '设置', description: 'Settings' },
]

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[var(--spacing-sidebar)] bg-[var(--color-surface)] border-r border-[var(--color-border)] flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-[var(--color-border-subtle)]">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Cat className="size-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-[var(--color-text-primary)] text-lg tracking-tight">
              OpenClaw
            </h1>
            <p className="text-xs text-[var(--color-text-muted)]">指挥中心</p>
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
                    'group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                    'hover:bg-[var(--color-surface-hover)]',
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-[var(--color-accent-hover)] shadow-sm'
                      : 'text-[var(--color-text-secondary)]'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={cn(
                      'size-8 rounded-lg flex items-center justify-center transition-colors',
                      isActive ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-surface-elevated)] group-hover:bg-[var(--color-surface-hover)]'
                    )}>
                      <item.icon className="size-4" />
                    </div>
                    <span className="font-medium text-sm">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--color-border-subtle)]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-green-500/5 border border-green-500/20">
          <div className="size-2.5 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
          <div>
            <span className="text-sm font-medium text-green-400">Gateway 运行中</span>
            <p className="text-xs text-[var(--color-text-muted)]">v1.2.0 • 3天5小时</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
