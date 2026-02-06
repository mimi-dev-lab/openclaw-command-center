import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn, formatRelativeTime } from '@/lib/utils'
import {
  MessageSquare,
  Search,
  RefreshCw,
  Clock,
  User,
  Bot,
  ChevronRight,
  Activity,
} from 'lucide-react'

// Mock sessions data
const sessions = [
  {
    sessionKey: 'discord:main:1469153482257731824',
    kind: 'main',
    label: '#🎛️ OpenClaw 作战指挥中心',
    channel: 'discord',
    created: '2026-02-07T02:00:00Z',
    lastActivity: '2026-02-07T03:41:00Z',
    messageCount: 45,
    model: 'claude-opus-4-5',
    active: true,
  },
  {
    sessionKey: 'discord:main:1465702266307608750',
    kind: 'main',
    label: '#mimibot',
    channel: 'discord',
    created: '2026-01-27T10:00:00Z',
    lastActivity: '2026-02-07T02:30:00Z',
    messageCount: 1250,
    model: 'claude-opus-4-5',
    active: true,
  },
  {
    sessionKey: 'isolated:gemini-research:abc123',
    kind: 'isolated',
    label: 'Gemini Research Task',
    channel: null,
    created: '2026-02-07T01:00:00Z',
    lastActivity: '2026-02-07T01:15:00Z',
    messageCount: 8,
    model: 'gemini-3-pro',
    active: false,
  },
  {
    sessionKey: 'telegram:main:123456',
    kind: 'main',
    label: 'Li Fan (Telegram)',
    channel: 'telegram',
    created: '2026-02-01T08:00:00Z',
    lastActivity: '2026-02-06T22:00:00Z',
    messageCount: 340,
    model: 'claude-sonnet-4',
    active: false,
  },
  {
    sessionKey: 'isolated:deploy:xyz789',
    kind: 'isolated',
    label: 'Deploy Agent Task',
    channel: null,
    created: '2026-02-06T14:00:00Z',
    lastActivity: '2026-02-06T14:30:00Z',
    messageCount: 12,
    model: 'claude-haiku-4',
    active: false,
  },
]

const channelIcons: Record<string, string> = {
  discord: '🎮',
  telegram: '✈️',
  whatsapp: '💬',
  slack: '💼',
  signal: '🔒',
}

export function Sessions() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterKind, setFilterKind] = useState<'all' | 'main' | 'isolated'>('all')

  const filteredSessions = sessions.filter((session) => {
    if (filterKind !== 'all' && session.kind !== filterKind) return false
    if (searchQuery && !session.label?.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const activeSessions = sessions.filter((s) => s.active).length
  const totalMessages = sessions.reduce((sum, s) => sum + s.messageCount, 0)
  const mainSessions = sessions.filter((s) => s.kind === 'main').length
  const isolatedSessions = sessions.filter((s) => s.kind === 'isolated').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Sessions</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            View and manage active sessions
          </p>
        </div>
        <Button variant="secondary" size="sm">
          <RefreshCw className="size-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Activity className="size-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {activeSessions}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Active Now</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-[var(--color-accent-subtle)] flex items-center justify-center">
              <MessageSquare className="size-5 text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {totalMessages.toLocaleString()}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Total Messages</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <User className="size-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {mainSessions}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Main Sessions</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Bot className="size-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {isolatedSessions}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Isolated Sessions</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search & Filter */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search sessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'w-full pl-10 pr-4 py-2 rounded-lg',
                'bg-[var(--color-surface-elevated)] border border-[var(--color-border)]',
                'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
                'focus:outline-none focus:border-[var(--color-accent)]'
              )}
            />
          </div>
          <div className="flex items-center gap-2">
            {(['all', 'main', 'isolated'] as const).map((kind) => (
              <button
                key={kind}
                onClick={() => setFilterKind(kind)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize',
                  filterKind === kind
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
                )}
              >
                {kind}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Session List */}
      <Card>
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {filteredSessions.map((session) => (
              <div
                key={session.sessionKey}
                className="flex items-center gap-4 px-5 py-4 hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer"
              >
                <div
                  className={cn(
                    'size-10 rounded-lg flex items-center justify-center shrink-0',
                    session.kind === 'main' ? 'bg-blue-500/10' : 'bg-purple-500/10'
                  )}
                >
                  {session.channel ? (
                    <span className="text-lg">{channelIcons[session.channel] || '💬'}</span>
                  ) : (
                    <Bot
                      className={cn(
                        'size-5',
                        session.kind === 'main' ? 'text-blue-400' : 'text-purple-400'
                      )}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-[var(--color-text-primary)] truncate">
                      {session.label}
                    </p>
                    {session.active && (
                      <span className="size-2 rounded-full bg-green-400 animate-pulse" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge variant={session.kind === 'main' ? 'info' : 'default'}>
                      {session.kind}
                    </Badge>
                    <span className="text-xs text-[var(--color-text-muted)] font-mono">
                      {session.model}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {session.messageCount.toLocaleString()} msgs
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1 justify-end">
                    <Clock className="size-3" />
                    {formatRelativeTime(session.lastActivity)}
                  </p>
                </div>
                <ChevronRight className="size-4 text-[var(--color-text-muted)]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
