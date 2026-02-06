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
  TrendingUp,
  Sparkles,
  Eye,
  MoreVertical,
} from 'lucide-react'

// Mock sessions data
const sessions = [
  {
    sessionKey: 'discord:main:1469153482257731824',
    kind: 'main',
    label: '#🎛️ OpenClaw 作战指挥中心',
    channel: 'discord',
    emoji: '🎮',
    created: '2026-02-07T02:00:00Z',
    lastActivity: '2026-02-07T03:41:00Z',
    messageCount: 45,
    model: 'claude-opus-4-5',
    active: true,
    tokensUsed: '125K',
  },
  {
    sessionKey: 'discord:main:1465702266307608750',
    kind: 'main',
    label: '#mimibot',
    channel: 'discord',
    emoji: '🎮',
    created: '2026-01-27T10:00:00Z',
    lastActivity: '2026-02-07T02:30:00Z',
    messageCount: 1250,
    model: 'claude-opus-4-5',
    active: true,
    tokensUsed: '2.3M',
  },
  {
    sessionKey: 'isolated:gemini-research:abc123',
    kind: 'isolated',
    label: 'Gemini 研究任务',
    channel: null,
    emoji: '🤖',
    created: '2026-02-07T01:00:00Z',
    lastActivity: '2026-02-07T01:15:00Z',
    messageCount: 8,
    model: 'gemini-3-pro',
    active: false,
    tokensUsed: '45K',
  },
  {
    sessionKey: 'telegram:main:123456',
    kind: 'main',
    label: 'Li Fan (Telegram)',
    channel: 'telegram',
    emoji: '✈️',
    created: '2026-02-01T08:00:00Z',
    lastActivity: '2026-02-06T22:00:00Z',
    messageCount: 340,
    model: 'claude-sonnet-4',
    active: false,
    tokensUsed: '890K',
  },
  {
    sessionKey: 'isolated:deploy:xyz789',
    kind: 'isolated',
    label: '部署 Agent 任务',
    channel: null,
    emoji: '🚀',
    created: '2026-02-06T14:00:00Z',
    lastActivity: '2026-02-06T14:30:00Z',
    messageCount: 12,
    model: 'claude-haiku-4',
    active: false,
    tokensUsed: '28K',
  },
]

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
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">会话</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            查看和管理活跃会话
          </p>
        </div>
        <Button variant="secondary" size="sm">
          <RefreshCw className="size-4 mr-2" />
          刷新
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center relative">
              <Activity className="size-6 text-green-400" />
              <span className="absolute -top-1 -right-1 size-3 rounded-full bg-green-400 animate-pulse border-2 border-[var(--color-surface)]" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">
                {activeSessions}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">活跃中</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
              <MessageSquare className="size-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">
                {totalMessages.toLocaleString()}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">消息总数</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
              <User className="size-6 text-blue-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">
                {mainSessions}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">主会话</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Bot className="size-6 text-purple-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">
                {isolatedSessions}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">隔离会话</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search & Filter */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="搜索会话..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'w-full pl-11 pr-4 py-2.5 rounded-xl',
                'bg-[var(--color-surface-elevated)] border border-[var(--color-border)]',
                'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
                'focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20'
              )}
            />
          </div>
          <div className="flex items-center gap-2">
            {(['all', 'main', 'isolated'] as const).map((kind) => (
              <button
                key={kind}
                onClick={() => setFilterKind(kind)}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                  filterKind === kind
                    ? 'bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/25'
                    : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
                )}
              >
                {kind === 'all' ? '全部' : kind === 'main' ? '主会话' : '隔离会话'}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Session List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="size-4 text-[var(--color-accent)]" />
            会话列表
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {filteredSessions.map((session) => (
              <div
                key={session.sessionKey}
                className="flex items-center gap-4 px-5 py-4 hover:bg-[var(--color-surface-hover)] transition-all duration-200 cursor-pointer group"
              >
                <div
                  className={cn(
                    'size-12 rounded-xl flex items-center justify-center shrink-0 relative',
                    session.kind === 'main' 
                      ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20' 
                      : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
                  )}
                >
                  <span className="text-xl">{session.emoji}</span>
                  {session.active && (
                    <span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-green-400 border-2 border-[var(--color-surface)] animate-pulse" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-[var(--color-text-primary)] truncate">
                      {session.label}
                    </p>
                    <Badge 
                      variant={session.kind === 'main' ? 'info' : 'default'}
                      className="text-[10px]"
                    >
                      {session.kind === 'main' ? '主会话' : '隔离'}
                    </Badge>
                    {session.active && (
                      <span className="text-[10px] text-green-400 font-medium">● 活跃</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1.5 text-xs text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="size-3" />
                      {session.model}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="size-3" />
                      {session.messageCount.toLocaleString()} 消息
                    </span>
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="size-3" />
                      {session.tokensUsed} tokens
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm text-[var(--color-text-secondary)] flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    {formatRelativeTime(session.lastActivity)}
                  </p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
                    <Eye className="size-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
                    <MoreVertical className="size-4" />
                  </button>
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
