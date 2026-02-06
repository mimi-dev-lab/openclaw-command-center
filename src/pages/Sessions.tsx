import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

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
  
  Sparkles,
} from 'lucide-react'

const sessions = [
  {
    sessionKey: 'discord:main:1469153482257731824',
    kind: 'main',
    label: '#作战指挥中心',
    emoji: '🎮',
    lastActivity: '2026-02-07T03:41:00Z',
    messageCount: 45,
    model: 'opus-4-5',
    active: true,
    tokensUsed: '125K',
  },
  {
    sessionKey: 'discord:main:1465702266307608750',
    kind: 'main',
    label: '#mimibot',
    emoji: '🎮',
    lastActivity: '2026-02-07T02:30:00Z',
    messageCount: 1250,
    model: 'opus-4-5',
    active: true,
    tokensUsed: '2.3M',
  },
  {
    sessionKey: 'isolated:gemini-research:abc123',
    kind: 'isolated',
    label: 'Gemini 任务',
    emoji: '🤖',
    lastActivity: '2026-02-07T01:15:00Z',
    messageCount: 8,
    model: 'gemini-3',
    active: false,
    tokensUsed: '45K',
  },
  {
    sessionKey: 'telegram:main:123456',
    kind: 'main',
    label: 'Telegram',
    emoji: '✈️',
    lastActivity: '2026-02-06T22:00:00Z',
    messageCount: 340,
    model: 'sonnet-4',
    active: false,
    tokensUsed: '890K',
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

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">会话</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">查看和管理会话</p>
        </div>
        <Button variant="secondary" size="sm">
          <RefreshCw className="size-4" />
          <span className="hidden sm:inline ml-1.5">刷新</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center relative">
              <Activity className="size-5 lg:size-6 text-green-400" />
              <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-green-400 animate-pulse border border-[var(--color-surface)]" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{activeSessions}</p>
              <p className="text-xs text-[var(--color-text-muted)]">活跃</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
              <MessageSquare className="size-5 lg:size-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{totalMessages.toLocaleString()}</p>
              <p className="text-xs text-[var(--color-text-muted)]">消息</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
              <User className="size-5 lg:size-6 text-blue-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{sessions.filter(s => s.kind === 'main').length}</p>
              <p className="text-xs text-[var(--color-text-muted)]">主会话</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Bot className="size-5 lg:size-6 text-purple-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{sessions.filter(s => s.kind === 'isolated').length}</p>
              <p className="text-xs text-[var(--color-text-muted)]">隔离</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="搜索会话..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              'w-full pl-10 pr-4 py-2.5 rounded-xl',
              'bg-[var(--color-surface)] border border-[var(--color-border)]',
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
                'px-3 py-2 rounded-xl text-sm font-medium transition-all flex-1 sm:flex-none',
                filterKind === kind
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
              )}
            >
              {kind === 'all' ? '全部' : kind === 'main' ? '主会话' : '隔离'}
            </button>
          ))}
        </div>
      </div>

      {/* Session List */}
      <Card>
        <CardHeader className="pb-2 lg:pb-3 px-4">
          <CardTitle className="text-sm flex items-center gap-2">
            <MessageSquare className="size-4 text-[var(--color-accent)]" />
            会话列表
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {filteredSessions.map((session) => (
              <div
                key={session.sessionKey}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-surface-hover)] transition-all cursor-pointer"
              >
                <div className={cn(
                  'size-10 lg:size-12 rounded-xl flex items-center justify-center shrink-0 relative',
                  session.kind === 'main' 
                    ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20' 
                    : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
                )}>
                  <span className="text-lg">{session.emoji}</span>
                  {session.active && (
                    <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-green-400 border-2 border-[var(--color-surface)] animate-pulse" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-[var(--color-text-primary)] truncate">{session.label}</p>
                    {session.active && <span className="text-[10px] text-green-400 font-medium">● 活跃</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-[var(--color-text-muted)] flex-wrap">
                    <span className="flex items-center gap-1">
                      <Sparkles className="size-3" />
                      {session.model}
                    </span>
                    <span>{session.messageCount} 消息</span>
                    <span className="hidden sm:inline">{session.tokensUsed}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-[var(--color-text-muted)] hidden sm:flex items-center gap-1">
                    <Clock className="size-3" />
                    {formatRelativeTime(session.lastActivity)}
                  </span>
                  <ChevronRight className="size-4 text-[var(--color-text-muted)]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
