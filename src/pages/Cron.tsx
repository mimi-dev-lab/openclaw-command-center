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
} from 'lucide-react'

// Mock cron jobs
const cronJobs = [
  {
    id: 'heartbeat-check',
    name: 'Heartbeat Check',
    schedule: { kind: 'every', everyMs: 300000 },
    payload: { kind: 'systemEvent', text: 'Heartbeat poll' },
    sessionTarget: 'main',
    enabled: true,
    lastRun: '2026-02-07 03:35',
    nextRun: '2026-02-07 03:40',
    status: 'success',
  },
  {
    id: 'hippocampus-decay',
    name: 'Hippocampus Decay',
    schedule: { kind: 'cron', expr: '0 3 * * *' },
    payload: { kind: 'agentTurn', message: 'Run hippocampus decay' },
    sessionTarget: 'isolated',
    enabled: true,
    lastRun: '2026-02-07 03:00',
    nextRun: '2026-02-08 03:00',
    status: 'success',
  },
  {
    id: 'nightly-review',
    name: 'Nightly Review',
    schedule: { kind: 'cron', expr: '0 23 * * *' },
    payload: { kind: 'agentTurn', message: 'Perform nightly review' },
    sessionTarget: 'isolated',
    enabled: true,
    lastRun: '2026-02-06 23:00',
    nextRun: '2026-02-07 23:00',
    status: 'success',
  },
  {
    id: 'mimi-bit-check',
    name: 'Mimi-Bit Market Check',
    schedule: { kind: 'every', everyMs: 3600000 },
    payload: { kind: 'agentTurn', message: 'Check crypto markets' },
    sessionTarget: 'isolated',
    enabled: false,
    lastRun: '2026-02-05 12:00',
    nextRun: null,
    status: 'disabled',
  },
  {
    id: 'reminder-test',
    name: 'Test Reminder',
    schedule: { kind: 'at', at: '2026-02-07T10:00:00+09:00' },
    payload: { kind: 'systemEvent', text: 'Reminder: This is a test' },
    sessionTarget: 'main',
    enabled: true,
    lastRun: null,
    nextRun: '2026-02-07 10:00',
    status: 'pending',
  },
]

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; label: string }> = {
  success: { icon: CheckCircle, color: 'text-green-400', label: 'Success' },
  error: { icon: XCircle, color: 'text-red-400', label: 'Error' },
  pending: { icon: Clock, color: 'text-blue-400', label: 'Pending' },
  disabled: { icon: Pause, color: 'text-gray-400', label: 'Disabled' },
  running: { icon: RefreshCw, color: 'text-yellow-400', label: 'Running' },
}

function formatSchedule(schedule: typeof cronJobs[0]['schedule']): string {
  switch (schedule.kind) {
    case 'every':
      const mins = (schedule.everyMs || 0) / 60000
      if (mins < 60) return `Every ${mins} min`
      return `Every ${mins / 60} hour${mins / 60 > 1 ? 's' : ''}`
    case 'cron':
      return schedule.expr || ''
    case 'at':
      return `Once at ${schedule.at}`
    default:
      return 'Unknown'
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
  const errorCount = cronJobs.filter((j) => j.status === 'error').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Cron Jobs</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Manage scheduled tasks and reminders
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <RefreshCw className="size-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="size-4 mr-2" />
            New Job
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-[var(--color-accent-subtle)] flex items-center justify-center">
              <Clock className="size-5 text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {cronJobs.length}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Total Jobs</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Play className="size-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {enabledCount}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Enabled</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="size-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {successCount}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Successful</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-red-500/10 flex items-center justify-center">
              <XCircle className="size-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {errorCount}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Errors</p>
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
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize',
                filter === f
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </Card>

      {/* Job List */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Jobs</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {filteredJobs.map((job) => {
              const status = statusConfig[job.status]
              return (
                <div
                  key={job.id}
                  className={cn(
                    'flex items-center gap-4 px-5 py-4 transition-colors',
                    'hover:bg-[var(--color-surface-hover)]',
                    !job.enabled && 'opacity-50'
                  )}
                >
                  <div
                    className={cn(
                      'size-10 rounded-lg flex items-center justify-center shrink-0',
                      job.enabled ? 'bg-[var(--color-accent-subtle)]' : 'bg-[var(--color-surface-elevated)]'
                    )}
                  >
                    <Clock
                      className={cn(
                        'size-5',
                        job.enabled ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-[var(--color-text-primary)]">{job.name}</p>
                      <Badge variant={job.sessionTarget === 'main' ? 'info' : 'default'}>
                        {job.sessionTarget}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-[var(--color-text-muted)] flex items-center gap-1">
                        <Timer className="size-3" />
                        {formatSchedule(job.schedule)}
                      </span>
                      {job.nextRun && (
                        <span className="text-sm text-[var(--color-text-muted)] flex items-center gap-1">
                          <Calendar className="size-3" />
                          Next: {job.nextRun}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <status.icon className={cn('size-4', status.color)} />
                    <span className={cn('text-sm font-medium', status.color)}>{status.label}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
                      <Play className="size-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
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
