import { StatCard } from '@/components/ui/StatCard'
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
  Pause,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { formatDuration, formatBytes } from '@/lib/utils'

// Mock data - will be replaced with real API calls
const mockData = {
  status: 'running' as const,
  uptime: 86400000 * 3 + 3600000 * 5, // 3 days 5 hours
  memory: { used: 256 * 1024 * 1024, total: 512 * 1024 * 1024 },
  cpu: 12,
  version: '1.2.0',
  nodeVersion: 'v25.5.0',
  skills: 62,
  sessions: 15,
  projects: 18,
  memoryFiles: 24,
  cronJobs: 8,
  channels: [
    { name: 'Discord', status: 'connected' as const, messages: 1250 },
    { name: 'Telegram', status: 'connected' as const, messages: 340 },
  ],
  recentActivity: [
    { type: 'session', message: 'New session started', time: '2 min ago' },
    { type: 'cron', message: 'Heartbeat executed', time: '5 min ago' },
    { type: 'memory', message: 'Memory file updated', time: '1 hour ago' },
  ],
}

export function Dashboard() {
  const [data, setData] = useState(mockData)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000))
    setIsRefreshing(false)
  }

  useEffect(() => {
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        uptime: prev.uptime + 30000,
        cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
      }))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Dashboard</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            System overview and real-time status
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={data.status === 'running' ? 'success' : 'error'}>
            {data.status === 'running' ? (
              <>
                <span className="size-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
                Running
              </>
            ) : (
              'Stopped'
            )}
          </Badge>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`size-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Uptime"
          value={formatDuration(data.uptime)}
          subtitle={`Since ${new Date(Date.now() - data.uptime).toLocaleDateString()}`}
          icon={Clock}
          variant="success"
        />
        <StatCard
          title="Memory Usage"
          value={formatBytes(data.memory.used)}
          subtitle={`of ${formatBytes(data.memory.total)}`}
          icon={HardDrive}
          variant={data.memory.used / data.memory.total > 0.8 ? 'warning' : 'default'}
        />
        <StatCard
          title="CPU Usage"
          value={`${Math.round(data.cpu)}%`}
          icon={Cpu}
          variant={data.cpu > 80 ? 'error' : data.cpu > 50 ? 'warning' : 'default'}
        />
        <StatCard
          title="Active Sessions"
          value={data.sessions}
          subtitle="across all channels"
          icon={MessageSquare}
        />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Skills Installed"
          value={data.skills}
          icon={Zap}
        />
        <StatCard
          title="Projects"
          value={data.projects}
          icon={FolderOpen}
        />
        <StatCard
          title="Memory Files"
          value={data.memoryFiles}
          icon={Brain}
        />
        <StatCard
          title="Cron Jobs"
          value={data.cronJobs}
          subtitle="active"
          icon={Clock}
        />
      </div>

      {/* Channels & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Status */}
        <Card>
          <CardHeader>
            <CardTitle>Channel Status</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {data.channels.map((channel) => (
                <div key={channel.name} className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`size-2 rounded-full ${
                        channel.status === 'connected' ? 'bg-green-400' : 'bg-red-400'
                      }`}
                    />
                    <span className="font-medium text-[var(--color-text-primary)]">
                      {channel.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[var(--color-text-muted)]">
                      {channel.messages.toLocaleString()} messages
                    </span>
                    <Badge variant={channel.status === 'connected' ? 'success' : 'error'}>
                      {channel.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {data.recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Activity className="size-4 text-[var(--color-text-muted)]" />
                    <span className="text-[var(--color-text-primary)]">{activity.message}</span>
                  </div>
                  <span className="text-sm text-[var(--color-text-muted)]">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">OpenClaw Version</p>
              <p className="font-medium text-[var(--color-text-primary)] mt-1">v{data.version}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Node.js</p>
              <p className="font-medium text-[var(--color-text-primary)] mt-1">{data.nodeVersion}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Platform</p>
              <p className="font-medium text-[var(--color-text-primary)] mt-1">Darwin arm64</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Workspace</p>
              <p className="font-medium text-[var(--color-text-primary)] mt-1 font-mono text-sm">~/clawd</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary">
              <RefreshCw className="size-4 mr-2" />
              Restart Gateway
            </Button>
            <Button variant="secondary">
              <Play className="size-4 mr-2" />
              Run Heartbeat
            </Button>
            <Button variant="secondary">
              <Pause className="size-4 mr-2" />
              Pause Cron Jobs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
