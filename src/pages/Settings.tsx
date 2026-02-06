import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import {
  Save,
  
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Terminal,
  Globe,
  Shield,
  Zap,
  Database,
  Bell,
  Trash2,
  RotateCcw,
} from 'lucide-react'

// Types
interface Setting {
  key: string
  label: string
  value: string | boolean
  type: 'text' | 'select' | 'toggle'
  options?: string[]
  description?: string
}

interface SettingsGroup {
  id: string
  title: string
  icon: typeof Terminal
  description: string
  settings: Setting[]
}

// Mock settings
const settingsGroups: SettingsGroup[] = [
  {
    id: 'gateway',
    title: 'Gateway',
    icon: Terminal,
    description: '核心网关配置',
    settings: [
      { key: 'bind', label: '绑定地址', value: 'lan', type: 'select', options: ['lan', 'localhost'], description: '网络绑定模式' },
      { key: 'port', label: '端口', value: '4445', type: 'text', description: 'Gateway 监听端口' },
      { key: 'logLevel', label: '日志级别', value: 'info', type: 'select', options: ['debug', 'info', 'warn', 'error'] },
    ],
  },
  {
    id: 'channels',
    title: '通道',
    icon: Globe,
    description: '消息通道设置',
    settings: [
      { key: 'discord.enabled', label: 'Discord', value: true, type: 'toggle' },
      { key: 'telegram.enabled', label: 'Telegram', value: true, type: 'toggle' },
      { key: 'whatsapp.enabled', label: 'WhatsApp', value: false, type: 'toggle' },
    ],
  },
  {
    id: 'models',
    title: '模型',
    icon: Zap,
    description: 'AI 模型配置',
    settings: [
      { key: 'defaultModel', label: '默认模型', value: 'claude-opus-4-5', type: 'select', options: ['claude-opus-4-5', 'claude-sonnet-4', 'claude-haiku-4'] },
      { key: 'thinking', label: '思维模式', value: 'low', type: 'select', options: ['off', 'low', 'medium', 'high'] },
    ],
  },
  {
    id: 'security',
    title: '安全',
    icon: Shield,
    description: '访问控制和权限',
    settings: [
      { key: 'exec.security', label: '执行安全', value: 'allowlist', type: 'select', options: ['deny', 'allowlist', 'full'] },
      { key: 'requireApproval', label: '需要审批', value: true, type: 'toggle' },
    ],
  },
  {
    id: 'storage',
    title: '存储',
    icon: Database,
    description: '数据存储路径',
    settings: [
      { key: 'workspace', label: '工作目录', value: '~/clawd', type: 'text' },
      { key: 'mediaPath', label: '媒体路径', value: '~/.openclaw/media', type: 'text' },
    ],
  },
  {
    id: 'notifications',
    title: '通知',
    icon: Bell,
    description: '提醒和通知设置',
    settings: [
      { key: 'heartbeat.enabled', label: '心跳检查', value: true, type: 'toggle' },
      { key: 'heartbeat.interval', label: '心跳间隔', value: '5m', type: 'text' },
    ],
  },
]

export function Settings() {
  const [expandedGroup, setExpandedGroup] = useState<string | null>('gateway')
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsSaving(false)
    setHasChanges(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">设置</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            配置 OpenClaw 行为和集成
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasChanges && (
            <Badge variant="warning" className="animate-pulse">
              <AlertTriangle className="size-3 mr-1" />
              未保存的更改
            </Badge>
          )}
          <Button variant="secondary" size="sm">
            <RotateCcw className="size-4 mr-2" />
            重置
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isSaving || !hasChanges}>
            <Save className="size-4 mr-2" />
            {isSaving ? '保存中...' : '保存更改'}
          </Button>
        </div>
      </div>

      {/* Warning */}
      <Card className="border-yellow-500/30 bg-gradient-to-r from-yellow-500/5 to-orange-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="size-5 text-yellow-400" />
            </div>
            <div>
              <p className="font-semibold text-yellow-400">注意</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                修改这些设置可能会影响系统稳定性。更改需要重启 Gateway 才能生效。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Groups */}
      <div className="space-y-4">
        {settingsGroups.map((group) => (
          <Card key={group.id} className="overflow-hidden">
            <button
              onClick={() => setExpandedGroup(expandedGroup === group.id ? null : group.id)}
              className="w-full flex items-center gap-4 p-5 text-left hover:bg-[var(--color-surface-hover)] transition-all duration-200"
            >
              <div className="size-11 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center shrink-0">
                <group.icon className="size-5 text-indigo-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--color-text-primary)]">{group.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{group.description}</p>
              </div>
              <Badge variant="default" className="mr-2">{group.settings.length} 项</Badge>
              {expandedGroup === group.id ? (
                <ChevronDown className="size-5 text-[var(--color-text-muted)]" />
              ) : (
                <ChevronRight className="size-5 text-[var(--color-text-muted)]" />
              )}
            </button>
            {expandedGroup === group.id && (
              <div className="border-t border-[var(--color-border-subtle)] p-5 space-y-5 bg-[var(--color-surface-elevated)]/30">
                {group.settings.map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">{setting.label}</p>
                      <p className="text-xs text-[var(--color-text-muted)] font-mono mt-0.5">{setting.key}</p>
                      {setting.description && (
                        <p className="text-xs text-[var(--color-text-muted)] mt-1">{setting.description}</p>
                      )}
                    </div>
                    {setting.type === 'toggle' ? (
                      <button
                        onClick={() => setHasChanges(true)}
                        className={cn(
                          'relative w-12 h-7 rounded-full transition-colors',
                          setting.value ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-surface-elevated)]'
                        )}
                      >
                        <span
                          className={cn(
                            'absolute top-1 size-5 rounded-full bg-white transition-transform shadow-md',
                            setting.value ? 'left-6' : 'left-1'
                          )}
                        />
                      </button>
                    ) : setting.type === 'select' ? (
                      <select
                        value={setting.value as string}
                        onChange={() => setHasChanges(true)}
                        className={cn(
                          'px-4 py-2 rounded-xl text-sm',
                          'bg-[var(--color-surface-elevated)] border border-[var(--color-border)]',
                          'text-[var(--color-text-primary)]',
                          'focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20'
                        )}
                      >
                        {setting.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={setting.value as string}
                        onChange={() => setHasChanges(true)}
                        className={cn(
                          'px-4 py-2 rounded-xl text-sm w-56 font-mono',
                          'bg-[var(--color-surface-elevated)] border border-[var(--color-border)]',
                          'text-[var(--color-text-primary)]',
                          'focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20'
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Danger Zone */}
      <Card className="border-red-500/30 overflow-hidden">
        <CardHeader className="bg-red-500/5">
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="size-5" />
            危险区域
          </CardTitle>
          <CardDescription>不可逆操作</CardDescription>
        </CardHeader>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">重置所有设置</p>
              <p className="text-sm text-[var(--color-text-muted)]">
                将所有设置恢复为默认值
              </p>
            </div>
            <Button variant="danger" size="sm">
              <Trash2 className="size-4 mr-2" />
              重置为默认
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
