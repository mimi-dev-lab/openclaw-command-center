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

// Mock cron jobs
const cronJobs = [
  {
    id: 'heartbeat-check',
    name: 'Heartbeat 心跳检查',
    schedule: { kind: 'every', everyMs: 300000 },
    payload: { kind: 'systemEvent', text: 'Heartbeat poll' },
    sessionTarget: 'main',
    enabled: true,
    lastRun: '2026-02-07 03:35',
    nextRun: '2026-02-07 03:40',
    status: 'success',
    runCount: 1247,
  },
  {
    id: 'hippocampus-decay',
    name: 'Hippocampus 记忆衰减',
    schedule: { kind: 'cron', expr: '0 3 * * *' },
    payload: { kind: 'agentTurn', message: '执行记忆衰减' },
    sessionTarget: 'isolated',
    enabled: true,
    lastRun: '2026-02-07 03:00',
    nextRun: '2026-02-08 03:00',
    status: 'success',
    runCount: 45,
  },
  {
    id: 'nightly-review',
    name: 'Nightly Review 每日复盘',
    schedule: { kind: 'cron', expr: '0 23 * * *' },
    payload: { kind: 'agentTurn', message: '执行每日复盘' },
    sessionTarget: 'isolated',
    enabled: true,
    lastRun: '2026-02-06 23:00',
    nextRun: '2026-02-07 23:00',
    status: 'success',
    runCount: 38,
  },
  {
    id: 'mimi-bit-check',
    name: 'Mimi-Bit 市场检查',
    schedule: { kind: 'every', everyMs: 3600000 },
    payload: { kind: 'agentTurn', message: '检查加密货币市场' },
    sessionTarget: 'isolated',
    enabled: false,
    lastRun: '2026-02-05 12:00',
    nextRun: null,
    status: 'disabled',
    runCount: 156,
  },
  {
    id: 'reminder-test',
    name: '测试提醒',
    schedule: { kind: 'at', at: '2026-02-07T10:00:00+09:00' },
    payload: { kind: 'systemEvent', text: '提醒：这是一个测试' },
    sessionTarget: 'main',
    enabled: true,
    lastRun: null,
    nextRun: '2026-02-07 10:00',
    status: 'pending',
    runCount: 0,
  },
]

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; bgColor: string; label: string }> = {
  success: { icon: CheckCircle, color: 'text-green-400', bgColor: 'bg-green-500/10', label: '成功' },
  error: { icon: XCircle, color: 'text-red-400', bgColor: 'bg-red-500/10', label: '失败' },
  pending: { icon: Clock, color: 'text-blue-400', bgColor: 'bg-blue-500/10', label: '待执行' },
  disabled: { icon: Pause, color: 'text-gray-400', bgColor: 'bg-gray-500/10', label: '已禁用' },
  running: { icon: RefreshCw, color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', label: '运行中' },
}

function formatSchedule(schedule: typeof cronJobs[0]['schedule']): string {
  switch (schedule.kind) {
    case 'every':
      const mins = (schedule.everyMs || 0) / 60000
      if (mins < 60) return `每 ${mins} 分钟`
      return `每 ${mins / 60} 小时`
    case 'cron':
      return schedule.expr || ''
    case 'at':
      return `一次性`
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">定时任务</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            管理计划任务和提醒
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <RefreshCw className="size-4 mr-2" />
            刷新
          </Button>
          <Button size="sm">
            <Plus className="size-4 mr-2" />
            新建任务
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
              <Clock className="size-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">
                {cronJobs.length}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">任务总数</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
              <Play className="size-6 text-green-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">
                {enabledCount}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">已启用</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
              <CheckCircle className="size-6 text-blue-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">
                {successCount}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">最近成功</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <Zap className="size-6 text-amber-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">
                {totalRuns.toLocaleString()}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">总执行次数</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter */}
      <Card className="p-4">
        <div className="flex items-center gap-2">
          {(['all', 'enabled', 'disabled'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                filter === f
                  ? 'bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/25'
                  : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
              )}
            >
              {f === 'all' ? '全部' : f === 'enabled' ? '已启用' : '已禁用'}
            </button>
          ))}
        </div>
      </Card>

      {/* Job List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
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
                    'flex items-center gap-4 px-5 py-4 transition-all duration-200',
                    'hover:bg-[var(--color-surface-hover)]',
                    !job.enabled && 'opacity-50'
                  )}
                >
                  <div
                    className={cn(
                      'size-11 rounded-xl flex items-center justify-center shrink-0',
                      job.enabled ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20' : 'bg-[var(--color-surface-elevated)]'
                    )}
                  >
                    {job.schedule.kind === 'every' ? (
                      <Repeat className={job.enabled ? 'size-5 text-indigo-400' : 'size-5 text-[var(--color-text-muted)]'} />
                    ) : job.schedule.kind === 'cron' ? (
                      <Calendar className={job.enabled ? 'size-5 text-indigo-400' : 'size-5 text-[var(--color-text-muted)]'} />
                    ) : (
                      <Clock className={job.enabled ? 'size-5 text-indigo-400' : 'size-5 text-[var(--color-text-muted)]'} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-[var(--color-text-primary)]">{job.name}</p>
                      <Badge variant={job.sessionTarget === 'main' ? 'info' : 'default'} className="text-[10px]">
                        {job.sessionTarget === 'main' ? '主会话' : '隔离会话'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1.5 text-xs text-[var(--color-text-muted)]">
                      <span className="flex items-center gap-1.5">
                        <Timer className="size-3" />
                        {formatSchedule(job.schedule)}
                        {job.schedule.kind === 'cron' && (
                          <code className="ml-1 px-1.5 py-0.5 rounded bg-[var(--color-surface-elevated)] font-mono">
                            {job.schedule.expr}
                          </code>
                        )}
                      </span>
                      {job.nextRun && (
                        <span className="flex items-center gap-1.5">
                          <Calendar className="size-3" />
                          下次: {job.nextRun}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Zap className="size-3" />
                        {job.runCount} 次执行
                      </span>
                    </div>
                  </div>
                  <div className={cn('flex items-center gap-2 px-3 py-1.5 rounded-lg', status.bgColor)}>
                    <status.icon className={cn('size-4', status.color)} />
                    <span className={cn('text-sm font-medium', status.color)}>{status.label}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:text-green-400">
                      <Play className="size-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">
                      <Edit className="size-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-500/10 text-[var(--color-text-muted)] hover:text-red-400">
                      <Trash2 className="size-4" />
                    </button>
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
