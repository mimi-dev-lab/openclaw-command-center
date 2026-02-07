import { useState, useEffect } from 'react'
import { useGatewayStore } from '@/stores/gateway'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Wifi, WifiOff, Settings, X, RefreshCw, Loader2 } from 'lucide-react'

interface ConnectionPanelProps {
  compact?: boolean
}

export function ConnectionPanel({ compact = false }: ConnectionPanelProps) {
  const { 
    url, 
    token, 
    isConnected, 
    isLoading,
    error,
    lastRefresh,
    setConfig, 
    loadSavedConfig,
    clearConfig,
    refresh,
    testConnection,
  } = useGatewayStore()
  
  const [showConfig, setShowConfig] = useState(false)
  const [inputUrl, setInputUrl] = useState(url || 'ws://127.0.0.1:18789')
  const [inputToken, setInputToken] = useState(token || '')

  useEffect(() => {
    const hasConfig = loadSavedConfig()
    if (hasConfig) {
      refresh()
    }
  }, [])

  useEffect(() => {
    if (url) setInputUrl(url)
    if (token) setInputToken(token)
  }, [url, token])

  const handleConnect = async () => {
    setConfig(inputUrl, inputToken)
    setShowConfig(false)
    const success = await testConnection()
    if (success) {
      refresh()
    }
  }

  const handleDisconnect = () => {
    clearConfig()
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {isConnected ? (
          <>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-green-500/10 border border-green-500/20">
              <Wifi className="size-3.5 text-green-400" />
              <span className="text-xs text-green-400">已连接</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowConfig(true)}>
              <Settings className="size-4" />
            </Button>
          </>
        ) : (
          <Button variant="secondary" size="sm" onClick={() => setShowConfig(true)}>
            <WifiOff className="size-4 mr-1.5 text-yellow-400" />
            连接 Gateway
          </Button>
        )}

        {showConfig && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Gateway 连接</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowConfig(false)}>
                  <X className="size-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-[var(--color-text-muted)] mb-1 block">
                    Gateway URL
                  </label>
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="ws://127.0.0.1:18789"
                    className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-sm focus:outline-none focus:border-[var(--color-accent)]"
                  />
                </div>
                <div>
                  <label className="text-sm text-[var(--color-text-muted)] mb-1 block">
                    Token
                  </label>
                  <input
                    type="password"
                    value={inputToken}
                    onChange={(e) => setInputToken(e.target.value)}
                    placeholder="运行 openclaw dashboard 获取"
                    className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-sm focus:outline-none focus:border-[var(--color-accent)]"
                  />
                </div>
                {error && (
                  <div className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-lg">
                    {error}
                  </div>
                )}
                <div className="flex gap-2">
                  <Button onClick={handleConnect} disabled={!inputUrl || !inputToken || isLoading} className="flex-1">
                    {isLoading ? <Loader2 className="size-4 animate-spin mr-1.5" /> : <Wifi className="size-4 mr-1.5" />}
                    连接
                  </Button>
                  {isConnected && (
                    <Button variant="secondary" onClick={handleDisconnect}>
                      断开
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          {isConnected ? (
            <Wifi className="size-4 text-green-400" />
          ) : (
            <WifiOff className="size-4 text-yellow-400" />
          )}
          Gateway 连接
        </CardTitle>
        <Badge variant={isConnected ? 'success' : 'warning'}>
          {isConnected ? '已连接' : '未连接'}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected || showConfig ? (
          <>
            <div>
              <label className="text-sm text-[var(--color-text-muted)] mb-1 block">
                Gateway URL
              </label>
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="ws://127.0.0.1:18789"
                className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-sm focus:outline-none focus:border-[var(--color-accent)]"
              />
            </div>
            <div>
              <label className="text-sm text-[var(--color-text-muted)] mb-1 block">
                Token
              </label>
              <input
                type="password"
                value={inputToken}
                onChange={(e) => setInputToken(e.target.value)}
                placeholder="运行 openclaw dashboard 获取"
                className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-sm focus:outline-none focus:border-[var(--color-accent)]"
              />
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                在终端运行 <code className="px-1 py-0.5 rounded bg-[var(--color-surface-elevated)]">openclaw dashboard</code> 获取 token
              </p>
            </div>
            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-lg">
                {error}
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={handleConnect} disabled={!inputUrl || !inputToken || isLoading} className="flex-1">
                {isLoading ? <Loader2 className="size-4 animate-spin mr-1.5" /> : <Wifi className="size-4 mr-1.5" />}
                连接
              </Button>
              {isConnected && (
                <>
                  <Button variant="secondary" onClick={() => setShowConfig(false)}>
                    取消
                  </Button>
                  <Button variant="secondary" onClick={handleDisconnect}>
                    断开
                  </Button>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-text-muted)]">地址</span>
              <span className="text-[var(--color-text-primary)] font-mono text-xs">{url}</span>
            </div>
            {lastRefresh && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">最后刷新</span>
                <span className="text-[var(--color-text-secondary)]">
                  {lastRefresh.toLocaleTimeString()}
                </span>
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => refresh()} disabled={isLoading} className="flex-1">
                <RefreshCw className={`size-4 mr-1.5 ${isLoading ? 'animate-spin' : ''}`} />
                刷新
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowConfig(true)}>
                <Settings className="size-4" />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
