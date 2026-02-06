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

// Mock data - will be replaced with real API calls
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
    { type: 'message', icon: Send, message: '回复了 #mimibot 频道', time: '2分钟前', color: 'text-blue-400' },
    { type: 'cron', icon: Clock, message: 'Heartbeat 执行成功', time: '5分钟前', color: 'text-green-400' },
    { type: 'memory', icon: Brain, message: '更新了 memory/2026-02-07.md', time: '1小时前', color: 'text-purple-400' },
    { type: 'skill', icon: Zap, message: '调用了 image-generation skill', time: '2小时前', color: 'text-yellow-400' },
  ],
  topSkills: [
    { name: 'github', uses: 234, trend: 12 },
    { name: 'image-generation', uses: 189, trend: 28 },
    { name: 'gog', uses: 156, trend: -5 },
    { name: 'gemini-subagent', uses: 98, trend: 45 },
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">仪表盘</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            系统概览与实时状态监控
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
            <Sparkles className="size-4 text-[var(--color-accent)]" />
            <span className="text-sm font-medium text-[var(--color-text-primary)]">{data.model}</span>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`size-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            刷新
          </Button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-5 gap-4">
        {/* Uptime Card - Special */}
        <Card className="col-span-1 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="size-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Clock className="size-5 text-green-400" />
              </div>
              <Badge variant="success">运行中</Badge>
            </div>
            <p className="text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">
              {formatDuration(data.uptime)}
            </p>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">已运行时间</p>
          </CardContent>
        </Card>

        {/* Memory */}
        <Card className="col-span-1">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <HardDrive className="size-5 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-[var(--color-text-muted)]">{memoryPercent}%</span>
            </div>
            <p className="text-2xl font-bold text-[var(--color-text-primary)]">
              {formatBytes(data.memory.used)}
            </p>
            <div className="mt-2 h-1.5 bg-[var(--color-surface-elevated)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all"
                style={{ width: `${memoryPercent}%` }}
              />
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-1.5">/ {formatBytes(data.memory.total)}</p>
          </CardContent>
        </Card>

        {/* CPU */}
        <Card className="col-span-1">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="size-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Cpu className="size-5 text-orange-400" />
              </div>
              <span className={`text-sm font-medium ${data.cpu > 80 ? 'text-red-400' : 'text-[var(--color-text-muted)]'}`}>
                {data.cpu > 80 ? '⚠️' : ''}
              </span>
            </div>
            <p className="text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">
              {Math.round(data.cpu)}%
            </p>
            <div className="mt-2 h-1.5 bg-[var(--color-surface-elevated)] rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${
                  data.cpu > 80 ? 'bg-red-500' : data.cpu > 50 ? 'bg-orange-500' : 'bg-green-500'
                }`}
                style={{ width: `${data.cpu}%` }}
              />
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mt-1.5">CPU 使用率</p>
          </CardContent>
        </Card>

        {/* Today Messages */}
        <Card className="col-span-1">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="size-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <MessageSquare className="size-5 text-purple-400" />
              </div>
              <div className="flex items-center gap-1 text-green-400">
                <ArrowUpRight className="size-3" />
                <span className="text-xs font-medium">+23%</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">
              {data.todayMessages}
            </p>
            <p className="text-sm text-[var(--color-text-muted)] mt-1.5">今日消息</p>
          </CardContent>
        </Card>

        {/* Tokens */}
        <Card className="col-span-1">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="size-10 rounded-xl bg-[var(--color-accent-subtle)] flex items-center justify-center">
                <Terminal className="size-5 text-[var(--color-accent)]" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[var(--color-text-primary)]">
              {data.tokensUsed}
            </p>
            <p className="text-sm text-[var(--color-text-muted)] mt-1.5">Tokens 使用量</p>
          </CardContent>
        </Card>
      </div>

      {/* Resource Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 hover:border-[var(--color-accent)] transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
              <Zap className="size-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{data.skills}</p>
              <p className="text-sm text-[var(--color-text-muted)]">已安装技能</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 hover:border-[var(--color-accent)] transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
              <FolderOpen className="size-6 text-blue-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{data.projects}</p>
              <p className="text-sm text-[var(--color-text-muted)]">本地项目</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 hover:border-[var(--color-accent)] transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
              <Brain className="size-6 text-pink-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{data.memoryFiles}</p>
              <p className="text-sm text-[var(--color-text-muted)]">记忆文件</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 hover:border-[var(--color-accent)] transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <Clock className="size-6 text-amber-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{data.cronJobs}</p>
              <p className="text-sm text-[var(--color-text-muted)]">定时任务</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Channel Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Activity className="size-4 text-[var(--color-accent)]" />
              通道状态
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {data.channels.map((channel) => (
                <div key={channel.name} className="px-5 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{channel.emoji}</span>
                      <span className="font-medium text-[var(--color-text-primary)]">{channel.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="size-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-green-400">在线</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                      <ArrowDownRight className="size-3 text-blue-400" />
                      <span>{channel.messagesIn} 接收</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                      <ArrowUpRight className="size-3 text-green-400" />
                      <span>{channel.messagesOut} 发送</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-4 text-[var(--color-accent)]" />
              最近活动
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {data.recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3">
                  <div className={`size-8 rounded-lg bg-[var(--color-surface-elevated)] flex items-center justify-center ${activity.color}`}>
                    <activity.icon className="size-4" />
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
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Zap className="size-4 text-[var(--color-accent)]" />
              热门技能
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {data.topSkills.map((skill, i) => (
                <div key={skill.name} className="flex items-center gap-3 px-5 py-3">
                  <span className="text-sm font-medium text-[var(--color-text-muted)] w-5">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{skill.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{skill.uses} 次调用</p>
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${skill.trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {skill.trend >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                    {Math.abs(skill.trend)}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Info */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>系统信息</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Play className="size-4 mr-2" />
                运行 Heartbeat
              </Button>
              <Button variant="secondary" size="sm">
                <RefreshCw className="size-4 mr-2" />
                重启 Gateway
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-6">
            <div>
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">版本</p>
              <p className="font-semibold text-[var(--color-text-primary)] mt-1">v{data.version}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Node.js</p>
              <p className="font-semibold text-[var(--color-text-primary)] mt-1">{data.nodeVersion}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">平台</p>
              <p className="font-semibold text-[var(--color-text-primary)] mt-1">Darwin arm64</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">默认模型</p>
              <p className="font-semibold text-[var(--color-text-primary)] mt-1">{data.model}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">工作目录</p>
              <p className="font-semibold text-[var(--color-text-primary)] mt-1 font-mono text-sm">~/clawd</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">活跃会话</p>
              <p className="font-semibold text-[var(--color-text-primary)] mt-1">{data.sessions} 个</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
