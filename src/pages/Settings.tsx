import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import {
  Save,
  RefreshCw,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Terminal,
  Globe,
  Shield,
  Zap,
  Database,
  Bell,
} from 'lucide-react'

// Types
interface Setting {
  key: string
  label: string
  value: string | boolean
  type: 'text' | 'select' | 'toggle'
  options?: string[]
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
    description: 'Core gateway configuration',
    settings: [
      { key: 'bind', label: 'Bind Address', value: 'lan', type: 'select', options: ['lan', 'localhost'] },
      { key: 'port', label: 'Port', value: '4445', type: 'text' },
      { key: 'logLevel', label: 'Log Level', value: 'info', type: 'select', options: ['debug', 'info', 'warn', 'error'] },
    ],
  },
  {
    id: 'channels',
    title: 'Channels',
    icon: Globe,
    description: 'Messaging channel settings',
    settings: [
      { key: 'discord.enabled', label: 'Discord', value: true, type: 'toggle' },
      { key: 'telegram.enabled', label: 'Telegram', value: true, type: 'toggle' },
      { key: 'whatsapp.enabled', label: 'WhatsApp', value: false, type: 'toggle' },
    ],
  },
  {
    id: 'models',
    title: 'Models',
    icon: Zap,
    description: 'AI model configuration',
    settings: [
      { key: 'defaultModel', label: 'Default Model', value: 'claude-opus-4-5', type: 'select', options: ['claude-opus-4-5', 'claude-sonnet-4', 'claude-haiku-4'] },
      { key: 'thinking', label: 'Thinking Mode', value: 'low', type: 'select', options: ['off', 'low', 'medium', 'high'] },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    icon: Shield,
    description: 'Access control and permissions',
    settings: [
      { key: 'exec.security', label: 'Exec Security', value: 'allowlist', type: 'select', options: ['deny', 'allowlist', 'full'] },
      { key: 'requireApproval', label: 'Require Approval', value: true, type: 'toggle' },
    ],
  },
  {
    id: 'storage',
    title: 'Storage',
    icon: Database,
    description: 'Data storage paths',
    settings: [
      { key: 'workspace', label: 'Workspace', value: '~/clawd', type: 'text' },
      { key: 'mediaPath', label: 'Media Path', value: '~/.openclaw/media', type: 'text' },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    description: 'Alert and notification settings',
    settings: [
      { key: 'heartbeat.enabled', label: 'Heartbeat', value: true, type: 'toggle' },
      { key: 'heartbeat.interval', label: 'Heartbeat Interval', value: '5m', type: 'text' },
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
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Settings</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Configure OpenClaw behavior and integrations
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasChanges && (
            <Badge variant="warning">
              <AlertTriangle className="size-3 mr-1" />
              Unsaved changes
            </Badge>
          )}
          <Button variant="secondary" size="sm">
            <RefreshCw className="size-4 mr-2" />
            Reset
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isSaving || !hasChanges}>
            <Save className="size-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Warning */}
      <Card className="border-yellow-500/30 bg-yellow-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-400">Caution</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                Modifying these settings may affect system stability. Changes require a gateway restart to take effect.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Groups */}
      <div className="space-y-4">
        {settingsGroups.map((group) => (
          <Card key={group.id}>
            <button
              onClick={() => setExpandedGroup(expandedGroup === group.id ? null : group.id)}
              className="w-full flex items-center gap-4 p-5 text-left hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              <div className="size-10 rounded-lg bg-[var(--color-accent-subtle)] flex items-center justify-center shrink-0">
                <group.icon className="size-5 text-[var(--color-accent)]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--color-text-primary)]">{group.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{group.description}</p>
              </div>
              {expandedGroup === group.id ? (
                <ChevronDown className="size-5 text-[var(--color-text-muted)]" />
              ) : (
                <ChevronRight className="size-5 text-[var(--color-text-muted)]" />
              )}
            </button>
            {expandedGroup === group.id && (
              <div className="border-t border-[var(--color-border-subtle)] p-5 space-y-4">
                {group.settings.map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">{setting.label}</p>
                      <p className="text-xs text-[var(--color-text-muted)] font-mono">{setting.key}</p>
                    </div>
                    {setting.type === 'toggle' ? (
                      <button
                        onClick={() => setHasChanges(true)}
                        className={cn(
                          'relative w-11 h-6 rounded-full transition-colors',
                          setting.value ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-surface-elevated)]'
                        )}
                      >
                        <span
                          className={cn(
                            'absolute top-1 size-4 rounded-full bg-white transition-transform',
                            setting.value ? 'left-6' : 'left-1'
                          )}
                        />
                      </button>
                    ) : setting.type === 'select' ? (
                      <select
                        value={setting.value as string}
                        onChange={() => setHasChanges(true)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-sm',
                          'bg-[var(--color-surface-elevated)] border border-[var(--color-border)]',
                          'text-[var(--color-text-primary)]',
                          'focus:outline-none focus:border-[var(--color-accent)]'
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
                          'px-3 py-1.5 rounded-lg text-sm w-48',
                          'bg-[var(--color-surface-elevated)] border border-[var(--color-border)]',
                          'text-[var(--color-text-primary)]',
                          'focus:outline-none focus:border-[var(--color-accent)]'
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
      <Card className="border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Reset All Settings</p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Reset all settings to their default values
              </p>
            </div>
            <Button variant="danger" size="sm">
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
