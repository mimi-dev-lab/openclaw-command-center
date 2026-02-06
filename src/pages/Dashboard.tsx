import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  Activity,
  Cpu,
  HardDrive,
  Clock,
  Zap,
  MessageSquare,
  FolderOpen,
  Brain,
  RefreshCw,
  Play,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Terminal,
  Send,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { formatDuration, formatBytes } from '@/lib/utils'

// Mock data
const mockData = {
  status: 'running' as const,
  uptime: 86400000 * 3 + 3600000 * 5 + 60000 * 42,
  memory: { used: 256 * 1024 * 1024, total: 512 * 1024 * 1024 },
  cpu: 12,
  version: '1.2.0',
  nodeVersion: 'v25.5.0',
  model: 'claude-opus-4-5',
  skills: 62,
  sessions: 15,
  projects: 18,
  memoryFiles: 24,
  cronJobs: 8,
  todayMessages: 156,
  tokensUsed: '1.2M',
  channels: [
    { name: 'Discord', emoji: '🎮', status: 'connected' as const, messagesIn: 1250, messagesOut: 890 },
    { name: 'Telegram', emoji: '✈️', status: 'connected' as const, messagesIn: 340, messagesOut: 280 },
  ],
  recentActivity: [
    { type: 'message', icon: Send, message: '回复了 #mimibot', time: '2分钟前', color: 'text-blue-400' },
    { type: 'cron', icon: Clock, message: 'Heartbeat 成功', time: '5分钟前', color: 'text-green-400' },
    { type: 'memory', icon: Brain, message: '更新了记忆', time: '1小时前', color: 'text-purple-400' },
  ],
  topSkills: [
    { name: 'github', uses: 234, trend: 12 },
    { name: 'image-gen', uses: 189, trend: 28 },
    { name: 'gog', uses: 156, trend: -5 },
  ],
}

export function Dashboard() {
  const [data, setData] = useState(mockData)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsRefreshing(false)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        uptime: prev.uptime + 30000,
        cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
      }))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const memoryPercent = Math.round((data.memory.used / data.memory.total) * 100)

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
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
            <Sparkles className="size-4 text-[var(--color-accent)]" />
            <span className="text-xs font-medium text-[var(--color-text-primary)]">{data.model}</span>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`size-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline ml-2">刷新</span>
          </Button>
        </div>
      </div>

      {/* Main Stats - Scrollable on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
        {/* Uptime */}
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20">
          <CardContent className="p-3 lg:p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="size-8 lg:size-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Clock className="size-4 lg:size-5 text-green-400" />
              </div>
              <Badge variant="success" className="text-[10px] lg:text-xs">运行中</Badge>
            </div>
            <p className="text-lg lg:text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">
              {formatDuration(data.uptime)}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">运行时间</p>
          </CardContent>
        </Card>

        {/* Memory */}
        <Card>
          <CardContent className="p-3 lg:p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="size-8 lg:size-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <HardDrive className="size-4 lg:size-5 text-blue-400" />
              </div>
              <span className="text-xs font-medium text-[var(--color-text-muted)]">{memoryPercent}%</span>
            </div>
            <p className="text-lg lg:text-2xl font-bold text-[var(--color-text-primary)]">
              {formatBytes(data.memory.used)}
            </p>
            <div className="mt-1.5 h-1 bg-[var(--color-surface-elevated)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                style={{ width: `${memoryPercent}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* CPU */}
        <Card>
          <CardContent className="p-3 lg:p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="size-8 lg:size-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Cpu className="size-4 lg:size-5 text-orange-400" />
              </div>
            </div>
            <p className="text-lg lg:text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">
              {Math.round(data.cpu)}%
            </p>
            <div className="mt-1.5 h-1 bg-[var(--color-surface-elevated)] rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${data.cpu > 80 ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: `${data.cpu}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card>
          <CardContent className="p-3 lg:p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="size-8 lg:size-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <MessageSquare className="size-4 lg:size-5 text-purple-400" />
              </div>
              <div className="flex items-center gap-0.5 text-green-400 text-xs">
                <ArrowUpRight className="size-3" />
                +23%
              </div>
            </div>
            <p className="text-lg lg:text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">
              {data.todayMessages}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">今日消息</p>
          </CardContent>
        </Card>

        {/* Tokens */}
        <Card className="col-span-2 sm:col-span-1">
          <CardContent className="p-3 lg:p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="size-8 lg:size-10 rounded-xl bg-[var(--color-accent-subtle)] flex items-center justify-center">
                <Terminal className="size-4 lg:size-5 text-[var(--color-accent)]" />
              </div>
            </div>
            <p className="text-lg lg:text-2xl font-bold text-[var(--color-text-primary)]">
              {data.tokensUsed}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Tokens</p>
          </CardContent>
        </Card>
      </div>

      {/* Resource Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
              <Zap className="size-5 lg:size-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{data.skills}</p>
              <p className="text-xs text-[var(--color-text-muted)]">技能</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
              <FolderOpen className="size-5 lg:size-6 text-blue-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{data.projects}</p>
              <p className="text-xs text-[var(--color-text-muted)]">项目</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
              <Brain className="size-5 lg:size-6 text-pink-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{data.memoryFiles}</p>
              <p className="text-xs text-[var(--color-text-muted)]">记忆</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <Clock className="size-5 lg:size-6 text-amber-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{data.cronJobs}</p>
              <p className="text-xs text-[var(--color-text-muted)]">定时任务</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Three Column Layout - Stack on mobile */}
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
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {data.channels.map((channel) => (
                <div key={channel.name} className="px-4 lg:px-5 py-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span>{channel.emoji}</span>
                      <span className="font-medium text-sm text-[var(--color-text-primary)]">{channel.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="size-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-green-400">在线</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1">
                      <ArrowDownRight className="size-3 text-blue-400" />
                      {channel.messagesIn}
                    </span>
                    <span className="flex items-center gap-1">
                      <ArrowUpRight className="size-3 text-green-400" />
                      {channel.messagesOut}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-2 lg:pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="size-4 text-[var(--color-accent)]" />
              最近活动
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {data.recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center gap-3 px-4 lg:px-5 py-3">
                  <div className={`size-7 lg:size-8 rounded-lg bg-[var(--color-surface-elevated)] flex items-center justify-center ${activity.color}`}>
                    <activity.icon className="size-3.5 lg:size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--color-text-primary)] truncate">{activity.message}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Skills */}
        <Card>
          <CardHeader className="pb-2 lg:pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Zap className="size-4 text-[var(--color-accent)]" />
              热门技能
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {data.topSkills.map((skill, i) => (
                <div key={skill.name} className="flex items-center gap-3 px-4 lg:px-5 py-3">
                  <span className="text-sm font-medium text-[var(--color-text-muted)] w-4">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{skill.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{skill.uses} 次</p>
                  </div>
                  <div className={`flex items-center gap-0.5 text-xs font-medium ${skill.trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {skill.trend >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                    {Math.abs(skill.trend)}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - Mobile friendly */}
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
            <Button variant="secondary" size="sm" className="flex-1 sm:flex-none">
              <RefreshCw className="size-4 mr-1.5" />
              重启 Gateway
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
