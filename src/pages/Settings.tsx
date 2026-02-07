import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useGatewayStore } from '@/stores/gateway'
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
  Bell,
  RotateCcw,
  WifiOff,
  RefreshCw,
  Code,
  Copy,
  Check,
} from 'lucide-react'

export function Settings() {
  const { isConnected, restartGateway } = useGatewayStore()
  
  const [config, setConfig] = useState<Record<string, unknown> | null>(null)
  const [configHash, setConfigHash] = useState<string>('')
  const [isLoadingConfig, setIsLoadingConfig] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  const [expandedGroup, setExpandedGroup] = useState<string | null>('gateway')
  const [showRawJson, setShowRawJson] = useState(false)
  const [rawJson, setRawJson] = useState('')
  const [copied, setCopied] = useState(false)

  const { url, token } = useGatewayStore()

  // Load config on mount
  useEffect(() => {
    if (isConnected) {
      loadConfig()
    }
  }, [isConnected])

  const loadConfig = async () => {
    if (!url || !token) return
    
    setIsLoadingConfig(true)
    setError(null)
    
    try {
      const { gatewayCall } = await import('@/lib/gateway-client')
      const result = await gatewayCall<{ payload: string; hash: string }>(
        { url, token },
        'config.get',
        {}
      )
      const parsed = JSON.parse(result.payload || '{}')
      setConfig(parsed)
      setConfigHash(result.hash)
      setRawJson(JSON.stringify(parsed, null, 2))
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载配置失败')
    } finally {
      setIsLoadingConfig(false)
    }
  }

  const handleSave = async () => {
    if (!url || !token || !configHash) return
    
    setIsSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const { gatewayCall } = await import('@/lib/gateway-client')
      
      // Parse the raw JSON to validate
      const newConfig = JSON.parse(rawJson)
      
      await gatewayCall(
        { url, token },
        'config.apply',
        { 
          raw: rawJson,
          baseHash: configHash,
          restartDelayMs: 2000
        }
      )
      
      setSuccess('配置已保存，Gateway 正在重启...')
      setConfig(newConfig)
      
      // Reload config after restart
      setTimeout(() => {
        loadConfig()
        setSuccess(null)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存失败')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(rawJson)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRestart = async () => {
    setIsSaving(true)
    const success = await restartGateway()
    if (success) {
      setSuccess('Gateway 正在重启...')
      setTimeout(() => {
        loadConfig()
        setSuccess(null)
        setIsSaving(false)
      }, 3000)
    } else {
      setError('重启失败')
      setIsSaving(false)
    }
  }

  // Config groups for display
  const configGroups = [
    {
      id: 'gateway',
      title: 'Gateway',
      icon: Terminal,
      description: '核心网关配置',
      path: 'gateway',
    },
    {
      id: 'channels',
      title: '通道',
      icon: Globe,
      description: '消息通道设置',
      path: 'channels',
    },
    {
      id: 'agents',
      title: 'Agents',
      icon: Zap,
      description: 'AI Agent 配置',
      path: 'agents',
    },
    {
      id: 'security',
      title: '安全',
      icon: Shield,
      description: '访问控制和权限',
      path: 'security',
    },
    {
      id: 'heartbeat',
      title: '心跳',
      icon: Bell,
      description: '心跳检查设置',
      path: 'heartbeat',
    },
  ]

  const getConfigSection = (path: string): unknown => {
    if (!config) return null
    return (config as Record<string, unknown>)[path]
  }

  const renderValue = (value: unknown, depth = 0): React.ReactNode => {
    if (value === null || value === undefined) {
      return <span className="text-[var(--color-text-muted)]">null</span>
    }
    if (typeof value === 'boolean') {
      return (
        <Badge variant={value ? 'success' : 'default'}>
          {value ? 'true' : 'false'}
        </Badge>
      )
    }
    if (typeof value === 'number') {
      return <span className="text-blue-400 font-mono">{value}</span>
    }
    if (typeof value === 'string') {
      if (value.length > 50) {
        return <span className="text-green-400 font-mono text-xs break-all">"{value.slice(0, 50)}..."</span>
      }
      return <span className="text-green-400 font-mono">"{value}"</span>
    }
    if (Array.isArray(value)) {
      if (value.length === 0) return <span className="text-[var(--color-text-muted)]">[]</span>
      return (
        <div className="space-y-1">
          {value.slice(0, 5).map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[var(--color-text-muted)]">[{i}]</span>
              {renderValue(item, depth + 1)}
            </div>
          ))}
          {value.length > 5 && (
            <span className="text-[var(--color-text-muted)]">...and {value.length - 5} more</span>
          )}
        </div>
      )
    }
    if (typeof value === 'object') {
      const entries = Object.entries(value as Record<string, unknown>)
      if (entries.length === 0) return <span className="text-[var(--color-text-muted)]">{'{}'}</span>
      if (depth > 1) {
        return <span className="text-[var(--color-text-muted)]">{`{${entries.length} keys}`}</span>
      }
      return (
        <div className="space-y-2 pl-4 border-l border-[var(--color-border-subtle)]">
          {entries.slice(0, 10).map(([k, v]) => (
            <div key={k} className="flex items-start gap-2">
              <span className="text-purple-400 font-mono shrink-0">{k}:</span>
              {renderValue(v, depth + 1)}
            </div>
          ))}
          {entries.length > 10 && (
            <span className="text-[var(--color-text-muted)]">...and {entries.length - 10} more</span>
          )}
        </div>
      )
    }
    return <span>{String(value)}</span>
  }

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">设置</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">配置 OpenClaw</p>
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">设置</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
            配置 OpenClaw 行为和集成
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => setShowRawJson(!showRawJson)}
          >
            <Code className="size-4" />
            <span className="hidden sm:inline ml-1.5">{showRawJson ? '视图' : 'JSON'}</span>
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={loadConfig}
            disabled={isLoadingConfig}
          >
            <RefreshCw className={`size-4 ${isLoadingConfig ? 'animate-spin' : ''}`} />
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={handleRestart}
            disabled={isSaving}
          >
            <RotateCcw className="size-4" />
            <span className="hidden sm:inline ml-1.5">重启</span>
          </Button>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
          <AlertTriangle className="size-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
          <Check className="size-4" />
          <span className="text-sm">{success}</span>
        </div>
      )}

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
                修改配置需要重启 Gateway 才能生效。请确保配置正确，否则可能导致系统无法启动。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading */}
      {isLoadingConfig && !config && (
        <Card>
          <CardContent className="p-8 text-center">
            <RefreshCw className="size-8 text-[var(--color-accent)] mx-auto mb-4 animate-spin" />
            <p className="text-[var(--color-text-muted)]">加载配置中...</p>
          </CardContent>
        </Card>
      )}

      {/* Raw JSON Editor */}
      {showRawJson && config && (
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Code className="size-4 text-[var(--color-accent)]" />
              原始配置 (JSON)
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? <Check className="size-4 text-green-400" /> : <Copy className="size-4" />}
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isSaving}>
                <Save className="size-4 mr-1.5" />
                {isSaving ? '保存中...' : '保存'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <textarea
              value={rawJson}
              onChange={(e) => setRawJson(e.target.value)}
              className={cn(
                'w-full h-96 p-4 rounded-lg font-mono text-xs',
                'bg-[var(--color-surface-elevated)] border border-[var(--color-border)]',
                'text-[var(--color-text-primary)]',
                'focus:outline-none focus:border-[var(--color-accent)]',
                'resize-y'
              )}
              spellCheck={false}
            />
          </CardContent>
        </Card>
      )}

      {/* Config Groups (Visual View) */}
      {!showRawJson && config && (
        <div className="space-y-4">
          {configGroups.map((group) => {
            const section = getConfigSection(group.path)
            const hasContent = section !== null && section !== undefined
            
            return (
              <Card key={group.id} className="overflow-hidden">
                <button
                  onClick={() => setExpandedGroup(expandedGroup === group.id ? null : group.id)}
                  className="w-full flex items-center gap-4 p-4 lg:p-5 text-left hover:bg-[var(--color-surface-hover)] transition-all duration-200"
                >
                  <div className="size-10 lg:size-11 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center shrink-0">
                    <group.icon className="size-4 lg:size-5 text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--color-text-primary)]">{group.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] truncate">{group.description}</p>
                  </div>
                  <Badge variant={hasContent ? 'success' : 'default'} className="mr-2 shrink-0">
                    {hasContent ? '已配置' : '默认'}
                  </Badge>
                  {expandedGroup === group.id ? (
                    <ChevronDown className="size-5 text-[var(--color-text-muted)] shrink-0" />
                  ) : (
                    <ChevronRight className="size-5 text-[var(--color-text-muted)] shrink-0" />
                  )}
                </button>
                {expandedGroup === group.id && (
                  <div className="border-t border-[var(--color-border-subtle)] p-4 lg:p-5 bg-[var(--color-surface-elevated)]/30">
                    {hasContent ? (
                      <div className="text-sm">
                        {renderValue(section)}
                      </div>
                    ) : (
                      <p className="text-sm text-[var(--color-text-muted)]">
                        使用默认配置。切换到 JSON 视图编辑。
                      </p>
                    )}
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}

      {/* Connection Info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">连接信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-text-muted)]">Gateway URL</span>
            <span className="font-mono text-xs text-[var(--color-text-primary)]">{url}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-text-muted)]">Config Hash</span>
            <span className="font-mono text-xs text-[var(--color-text-secondary)]">
              {configHash ? configHash.slice(0, 12) + '...' : '--'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
