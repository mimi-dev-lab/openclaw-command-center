import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
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
} from 'lucide-react'

const cronJobs = [
  {
    id: 'heartbeat-check',
    name: 'Heartbeat',
    schedule: { kind: 'every', everyMs: 300000 },
    sessionTarget: 'main',
    enabled: true,
    lastRun: '03:35',
    nextRun: '03:40',
    status: 'success',
    runCount: 1247,
  },
  {
    id: 'hippocampus-decay',
    name: '记忆衰减',
    schedule: { kind: 'cron', expr: '0 3 * * *' },
    sessionTarget: 'isolated',
    enabled: true,
    lastRun: '03:00',
    nextRun: '明天 03:00',
    status: 'success',
    runCount: 45,
  },
  {
    id: 'nightly-review',
    name: '每日复盘',
    schedule: { kind: 'cron', expr: '0 23 * * *' },
    sessionTarget: 'isolated',
    enabled: true,
    lastRun: '昨天 23:00',
    nextRun: '23:00',
    status: 'success',
    runCount: 38,
  },
  {
    id: 'mimi-bit-check',
    name: '市场检查',
    schedule: { kind: 'every', everyMs: 3600000 },
    sessionTarget: 'isolated',
    enabled: false,
    lastRun: '2天前',
    nextRun: null,
    status: 'disabled',
    runCount: 156,
  },
]

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; label: string }> = {
  success: { icon: CheckCircle, color: 'text-green-400', label: '成功' },
  error: { icon: XCircle, color: 'text-red-400', label: '失败' },
  pending: { icon: Clock, color: 'text-blue-400', label: '待执行' },
  disabled: { icon: Pause, color: 'text-gray-400', label: '禁用' },
}

function formatSchedule(schedule: typeof cronJobs[0]['schedule']): string {
  switch (schedule.kind) {
    case 'every':
      const mins = (schedule.everyMs || 0) / 60000
      if (mins < 60) return `${mins}分钟`
      return `${mins / 60}小时`
    case 'cron':
      return schedule.expr || ''
    default:
      return '未知'
  }
}

export function Cron() {
  const [filter, setFilter] = useState<'all' | 'enabled' | 'disabled'>('all')

  const filteredJobs = cronJobs.filter((job) => {
    if (filter === 'enabled') return job.enabled
    if (filter === 'disabled') return !job.enabled
    return true
  })

  const enabledCount = cronJobs.filter((j) => j.enabled).length
  const successCount = cronJobs.filter((j) => j.status === 'success').length
  const totalRuns = cronJobs.reduce((sum, j) => sum + j.runCount, 0)

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">定时任务</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">管理计划任务</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <RefreshCw className="size-4" />
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
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <Zap className="size-5 lg:size-6 text-amber-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{totalRuns.toLocaleString()}</p>
              <p className="text-xs text-[var(--color-text-muted)]">总执行</p>
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
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {filteredJobs.map((job) => {
              const status = statusConfig[job.status]
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
                      ) : (
                        <Calendar className={job.enabled ? 'size-4 lg:size-5 text-indigo-400' : 'size-4 lg:size-5 text-[var(--color-text-muted)]'} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-sm text-[var(--color-text-primary)]">{job.name}</p>
                        <Badge variant={job.sessionTarget === 'main' ? 'info' : 'default'} className="text-[10px]">
                          {job.sessionTarget === 'main' ? '主' : '隔离'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-xs text-[var(--color-text-muted)] flex-wrap">
                        <span className="flex items-center gap-1">
                          <Timer className="size-3" />
                          每{formatSchedule(job.schedule)}
                        </span>
                        {job.nextRun && (
                          <span className="hidden sm:flex items-center gap-1">
                            <Clock className="size-3" />
                            下次: {job.nextRun}
                          </span>
                        )}
                        <span>{job.runCount}次</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-2 pl-12 sm:pl-0">
                    <div className={cn('flex items-center gap-1.5 px-2 py-1 rounded-lg', 
                      status.color === 'text-green-400' ? 'bg-green-500/10' : 
                      status.color === 'text-red-400' ? 'bg-red-500/10' : 'bg-gray-500/10'
                    )}>
                      <status.icon className={cn('size-3.5', status.color)} />
                      <span className={cn('text-xs font-medium', status.color)}>{status.label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
                        <Play className="size-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
                        <Edit className="size-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--color-text-muted)] hover:text-red-400">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
