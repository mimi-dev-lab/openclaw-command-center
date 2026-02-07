import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useGatewayStore, type CronJob } from '@/stores/gateway'
import { cn } from '@/lib/utils'
import {
  Clock,
  Plus,
  Play,
  Pause,
  Trash2,
  Edit,
  RefreshCw,
  CheckCircle,
  XCircle,
  Calendar,
  Timer,
  Repeat,
  Zap,
  WifiOff,
  AlertCircle,
} from 'lucide-react'

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; label: string }> = {
  success: { icon: CheckCircle, color: 'text-green-400', label: '成功' },
  error: { icon: XCircle, color: 'text-red-400', label: '失败' },
  pending: { icon: Clock, color: 'text-blue-400', label: '待执行' },
  running: { icon: RefreshCw, color: 'text-yellow-400', label: '运行中' },
  disabled: { icon: Pause, color: 'text-gray-400', label: '禁用' },
}

function formatSchedule(schedule: CronJob['schedule']): string {
  switch (schedule.kind) {
    case 'every': {
      const ms = schedule.everyMs || 0
      if (ms < 60000) return `${ms / 1000}秒`
      const mins = ms / 60000
      if (mins < 60) return `${mins}分钟`
      const hours = mins / 60
      if (hours < 24) return `${hours}小时`
      return `${hours / 24}天`
    }
    case 'cron':
      return schedule.expr || 'cron'
    case 'at':
      return '一次性'
    default:
      return schedule.kind
  }
}

function formatNextRun(nextRunAtMs?: number): string {
  if (!nextRunAtMs) return '--'
  const now = Date.now()
  const diff = nextRunAtMs - now
  
  if (diff < 0) return '已过期'
  if (diff < 60000) return '< 1分钟'
  if (diff < 3600000) return `${Math.round(diff / 60000)}分钟后`
  if (diff < 86400000) return `${Math.round(diff / 3600000)}小时后`
  
  const date = new Date(nextRunAtMs)
  return date.toLocaleString('zh-CN', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

function formatLastRun(lastRunAtMs?: number): string {
  if (!lastRunAtMs) return '--'
  const now = Date.now()
  const diff = now - lastRunAtMs
  
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return `${Math.round(diff / 60000)}分钟前`
  if (diff < 86400000) return `${Math.round(diff / 3600000)}小时前`
  if (diff < 604800000) return `${Math.round(diff / 86400000)}天前`
  
  return new Date(lastRunAtMs).toLocaleDateString('zh-CN')
}

export function Cron() {
  const { cronJobs, isConnected, isLoading, refresh } = useGatewayStore()
  const [filter, setFilter] = useState<'all' | 'enabled' | 'disabled'>('all')

  useEffect(() => {
    if (isConnected) refresh()
  }, [isConnected])

  const filteredJobs = cronJobs.filter((job) => {
    if (filter === 'enabled') return job.enabled
    if (filter === 'disabled') return !job.enabled
    return true
  })

  const enabledCount = cronJobs.filter((j) => j.enabled).length
  const successCount = cronJobs.filter((j) => j.state?.lastStatus === 'success').length
  const errorCount = cronJobs.filter((j) => j.state?.lastStatus === 'error').length

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">定时任务</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">管理计划任务</p>
        </div>
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <WifiOff className="size-12 text-[var(--color-text-muted)] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">
              未连接到 Gateway
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              请先在仪表盘页面连接 Gateway
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">定时任务</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">管理计划任务</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => refresh()} disabled={isLoading}>
            <RefreshCw className={`size-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button size="sm">
            <Plus className="size-4" />
            <span className="hidden sm:inline ml-1.5">新建</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
              <Clock className="size-5 lg:size-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{cronJobs.length}</p>
              <p className="text-xs text-[var(--color-text-muted)]">任务</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
              <Play className="size-5 lg:size-6 text-green-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{enabledCount}</p>
              <p className="text-xs text-[var(--color-text-muted)]">启用</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
              <CheckCircle className="size-5 lg:size-6 text-blue-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{successCount}</p>
              <p className="text-xs text-[var(--color-text-muted)]">成功</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
              <AlertCircle className="size-5 lg:size-6 text-red-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{errorCount}</p>
              <p className="text-xs text-[var(--color-text-muted)]">失败</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        {(['all', 'enabled', 'disabled'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
              filter === f
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
            )}
          >
            {f === 'all' ? '全部' : f === 'enabled' ? '启用' : '禁用'}
          </button>
        ))}
      </div>

      {/* Job List */}
      <Card>
        <CardHeader className="pb-2 lg:pb-3 px-4">
          <CardTitle className="text-sm flex items-center gap-2">
            <Timer className="size-4 text-[var(--color-accent)]" />
            计划任务
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredJobs.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">
              {filter !== 'all' ? '没有匹配的任务' : '暂无定时任务'}
            </div>
          ) : (
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {filteredJobs.map((job) => {
                const statusKey = !job.enabled 
                  ? 'disabled' 
                  : job.state?.lastStatus || 'pending'
                const status = statusConfig[statusKey] || statusConfig.pending
                
                return (
                  <div
                    key={job.id}
                    className={cn(
                      'flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 transition-all',
                      'hover:bg-[var(--color-surface-hover)]',
                      !job.enabled && 'opacity-50'
                    )}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={cn(
                        'size-9 lg:size-11 rounded-xl flex items-center justify-center shrink-0',
                        job.enabled ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20' : 'bg-[var(--color-surface-elevated)]'
                      )}>
                        {job.schedule.kind === 'every' ? (
                          <Repeat className={job.enabled ? 'size-4 lg:size-5 text-indigo-400' : 'size-4 lg:size-5 text-[var(--color-text-muted)]'} />
                        ) : job.schedule.kind === 'at' ? (
                          <Zap className={job.enabled ? 'size-4 lg:size-5 text-amber-400' : 'size-4 lg:size-5 text-[var(--color-text-muted)]'} />
                        ) : (
                          <Calendar className={job.enabled ? 'size-4 lg:size-5 text-indigo-400' : 'size-4 lg:size-5 text-[var(--color-text-muted)]'} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-sm text-[var(--color-text-primary)] truncate">
                            {job.name || job.id}
                          </p>
                          {job.payload?.kind && (
                            <Badge 
                              variant={job.payload.kind === 'systemEvent' ? 'info' : 'default'} 
                              className="text-[10px]"
                            >
                              {job.payload.kind === 'systemEvent' ? 'Event' : 'Agent'}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-0.5 text-xs text-[var(--color-text-muted)] flex-wrap">
                          <span className="flex items-center gap-1">
                            <Timer className="size-3" />
                            {job.schedule.kind === 'cron' 
                              ? job.schedule.expr 
                              : `每${formatSchedule(job.schedule)}`}
                          </span>
                          {job.state?.nextRunAtMs && (
                            <span className="hidden sm:flex items-center gap-1">
                              <Clock className="size-3" />
                              {formatNextRun(job.state.nextRunAtMs)}
                            </span>
                          )}
                          {job.state?.lastRunAtMs && (
                            <span className="hidden lg:inline">
                              上次: {formatLastRun(job.state.lastRunAtMs)}
                            </span>
                          )}
                        </div>
                        {job.state?.lastError && (
                          <p className="text-xs text-red-400 mt-1 truncate">
                            {job.state.lastError}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-2 pl-12 sm:pl-0">
                      <div className={cn('flex items-center gap-1.5 px-2 py-1 rounded-lg', 
                        status.color === 'text-green-400' ? 'bg-green-500/10' : 
                        status.color === 'text-red-400' ? 'bg-red-500/10' : 
                        status.color === 'text-yellow-400' ? 'bg-yellow-500/10' : 'bg-gray-500/10'
                      )}>
                        <status.icon className={cn('size-3.5', status.color)} />
                        <span className={cn('text-xs font-medium', status.color)}>{status.label}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button 
                          className="p-1.5 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]"
                          title="立即运行"
                        >
                          <Play className="size-4" />
                        </button>
                        <button 
                          className="p-1.5 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]"
                          title="编辑"
                        >
                          <Edit className="size-4" />
                        </button>
                        <button 
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--color-text-muted)] hover:text-red-400"
                          title="删除"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
