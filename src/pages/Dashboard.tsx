import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ConnectionPanel } from '@/components/ConnectionPanel'
import { useGatewayStore } from '@/stores/gateway'
import {
  Activity,
  Clock,
  MessageSquare,
  RefreshCw,
  Play,
  Sparkles,
  Terminal,
  Send,
  WifiOff,
  AlertCircle,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { formatDuration } from '@/lib/utils'

// Channel emoji mapping
const channelEmojis: Record<string, string> = {
  discord: '🎮',
  telegram: '✈️',
  whatsapp: '💬',
  signal: '🔐',
  slack: '💼',
  imessage: '🍎',
}

export function Dashboard() {
  const { 
    isConnected, 
    isLoading, 
    error,
    sessions, 
    cronJobs, 
    channels, 
    agents,
    systemInfo,
    healthHistory,
    refresh,
    restartGateway,
  } = useGatewayStore()

  const [isRestarting, setIsRestarting] = useState(false)

  // Auto refresh every 30s when connected
  useEffect(() => {
    if (!isConnected) return
    const interval = setInterval(() => refresh(), 30000)
    return () => clearInterval(interval)
  }, [isConnected, refresh])

  const handleRestart = async () => {
    setIsRestarting(true)
    await restartGateway()
    setTimeout(() => {
      setIsRestarting(false)
      refresh()
    }, 3000)
  }

  // Calculate stats
  const totalSessions = sessions.length
  const activeSessions = sessions.filter(s => {
    if (!s.lastActivityAt) return false
    const lastActivity = new Date(s.lastActivityAt).getTime()
    return Date.now() - lastActivity < 24 * 60 * 60 * 1000 // 24h
  }).length
  const totalTokens = sessions.reduce((sum, s) => sum + (s.tokenCount || 0), 0)
  const enabledCronJobs = cronJobs.filter(j => j.enabled).length

  // Health status
  const lastHealth = healthHistory[healthHistory.length - 1]
  const healthOk = lastHealth?.ok ?? true
  const avgLatency = healthHistory.length > 0 
    ? Math.round(healthHistory.reduce((sum, h) => sum + (h.latencyMs || 0), 0) / healthHistory.length)
    : 0

  // Not connected - show connection panel
  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">仪表盘</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
            连接到 Gateway 查看实时状态
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ConnectionPanel />
          
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <WifiOff className="size-12 text-[var(--color-text-muted)] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">
                未连接到 Gateway
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">
                请在左侧输入 Gateway 地址和 Token 进行连接
              </p>
              <div className="text-xs text-[var(--color-text-muted)] bg-[var(--color-surface-elevated)] rounded-lg p-3 font-mono">
                $ openclaw dashboard
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">仪表盘</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
            系统概览与实时状态
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ConnectionPanel compact />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => refresh()}
            disabled={isLoading}
          >
            <RefreshCw className={`size-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline ml-2">刷新</span>
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
          <AlertCircle className="size-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Main Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
        {/* Uptime */}
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20">
          <CardContent className="p-3 lg:p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="size-8 lg:size-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Clock className="size-4 lg:size-5 text-green-400" />
              </div>
              <Badge variant={healthOk ? 'success' : 'error'}>
                {healthOk ? '健康' : '异常'}
              </Badge>
            </div>
            <p className="text-lg lg:text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">
              {systemInfo?.uptimeMs ? formatDuration(systemInfo.uptimeMs) : '--'}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">运行时间</p>
          </CardContent>
        </Card>

        {/* Latency */}
        <Card>
          <CardContent className="p-3 lg:p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="size-8 lg:size-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Activity className="size-4 lg:size-5 text-blue-400" />
              </div>
            </div>
            <p className="text-lg lg:text-2xl font-bold text-[var(--color-text-primary)]">
              {avgLatency}ms
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">平均延迟</p>
          </CardContent>
        </Card>

        {/* Sessions */}
        <Card>
          <CardContent className="p-3 lg:p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="size-8 lg:size-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <MessageSquare className="size-4 lg:size-5 text-purple-400" />
              </div>
              <span className="text-xs font-medium text-green-400">{activeSessions} 活跃</span>
            </div>
            <p className="text-lg lg:text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">
              {totalSessions}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">会话</p>
          </CardContent>
        </Card>

        {/* Tokens */}
        <Card>
          <CardContent className="p-3 lg:p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="size-8 lg:size-10 rounded-xl bg-[var(--color-accent-subtle)] flex items-center justify-center">
                <Terminal className="size-4 lg:size-5 text-[var(--color-accent)]" />
              </div>
            </div>
            <p className="text-lg lg:text-2xl font-bold text-[var(--color-text-primary)]">
              {totalTokens > 1000000 
                ? `${(totalTokens / 1000000).toFixed(1)}M` 
                : totalTokens > 1000 
                  ? `${(totalTokens / 1000).toFixed(1)}K`
                  : totalTokens}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Tokens</p>
          </CardContent>
        </Card>

        {/* Cron Jobs */}
        <Card className="col-span-2 sm:col-span-1">
          <CardContent className="p-3 lg:p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="size-8 lg:size-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Clock className="size-4 lg:size-5 text-amber-400" />
              </div>
            </div>
            <p className="text-lg lg:text-2xl font-bold text-[var(--color-text-primary)]">
              {enabledCronJobs}/{cronJobs.length}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">定时任务</p>
          </CardContent>
        </Card>
      </div>

      {/* Agents Stats */}
      {agents.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-4">
          {agents.map((agent) => (
            <Card key={agent.id} className="p-3 lg:p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                  <Sparkles className="size-5 lg:size-6 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                      {agent.name || agent.id}
                    </p>
                    {agent.isDefault && (
                      <Badge variant="info" className="text-[10px]">默认</Badge>
                    )}
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)]">{agent.sessionCount} 会话</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Channel Status */}
        <Card>
          <CardHeader className="pb-2 lg:pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="size-4 text-[var(--color-accent)]" />
              通道状态
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {channels.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">
                暂无配置通道
              </div>
            ) : (
              <div className="divide-y divide-[var(--color-border-subtle)]">
                {channels.map((channel) => (
                  <div key={channel.id} className="px-4 lg:px-5 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{channelEmojis[channel.id] || '📡'}</span>
                        <span className="font-medium text-sm text-[var(--color-text-primary)]">
                          {channel.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className={`size-2 rounded-full ${channel.connected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                        <span className={`text-xs ${channel.connected ? 'text-green-400' : 'text-red-400'}`}>
                          {channel.connected ? '在线' : '离线'}
                        </span>
                      </div>
                    </div>
                    {channel.botName && (
                      <p className="text-xs text-[var(--color-text-muted)] mt-1">
                        @{channel.botName}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <Card>
          <CardHeader className="pb-2 lg:pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <MessageSquare className="size-4 text-[var(--color-accent)]" />
              最近会话
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {sessions.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">
                暂无会话
              </div>
            ) : (
              <div className="divide-y divide-[var(--color-border-subtle)]">
                {sessions.slice(0, 5).map((session) => (
                  <div key={session.key} className="flex items-center gap-3 px-4 lg:px-5 py-3">
                    <div className="size-7 lg:size-8 rounded-lg bg-[var(--color-surface-elevated)] flex items-center justify-center text-purple-400">
                      <Send className="size-3.5 lg:size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--color-text-primary)] truncate">
                        {session.displayName || session.label || session.channel || 'Session'}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {session.tokenCount ? `${session.tokenCount.toLocaleString()} tokens` : '--'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cron Jobs */}
        <Card>
          <CardHeader className="pb-2 lg:pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="size-4 text-[var(--color-accent)]" />
              定时任务
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {cronJobs.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">
                暂无定时任务
              </div>
            ) : (
              <div className="divide-y divide-[var(--color-border-subtle)]">
                {cronJobs.slice(0, 5).map((job) => (
                  <div key={job.id} className="flex items-center gap-3 px-4 lg:px-5 py-3">
                    <span className="text-sm font-medium text-[var(--color-text-muted)] w-4">
                      {job.enabled ? '✓' : '○'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                        {job.name || job.id}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {job.schedule.kind === 'cron' 
                          ? job.schedule.expr 
                          : job.schedule.kind === 'every'
                            ? `每 ${Math.round((job.schedule.everyMs || 0) / 60000)} 分钟`
                            : job.schedule.kind}
                      </p>
                    </div>
                    <Badge 
                      variant={
                        job.state?.lastStatus === 'success' 
                          ? 'success' 
                          : job.state?.lastStatus === 'error'
                            ? 'error'
                            : 'default'
                      }
                      className="text-[10px]"
                    >
                      {job.state?.lastStatus || '待运行'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-2 lg:pb-3">
          <CardTitle className="text-sm">快捷操作</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" className="flex-1 sm:flex-none">
              <Play className="size-4 mr-1.5" />
              Heartbeat
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="flex-1 sm:flex-none"
              onClick={handleRestart}
              disabled={isRestarting}
            >
              <RefreshCw className={`size-4 mr-1.5 ${isRestarting ? 'animate-spin' : ''}`} />
              重启 Gateway
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
