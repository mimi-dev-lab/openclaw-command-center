import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useGatewayStore } from '@/stores/gateway'
import { cn } from '@/lib/utils'
import {
  Brain,
  Search,
  FileText,
  Folder,
  Calendar,
  ChevronRight,
  RefreshCw,
  Plus,
  Sparkles,
  TrendingUp,
  Database,
} from 'lucide-react'

const memoryFiles = [
  {
    name: 'MEMORY.md',
    path: '~/clawd/MEMORY.md',
    type: 'core',
    size: '12.4 KB',
    lines: 450,
    lastModified: '30分钟前',
    preview: '## 重大变更\n- 2026-02-06: Clawdbot → OpenClaw 迁移...',
    importance: 'high',
  },
  {
    name: 'HIPPOCAMPUS_CORE.md',
    path: '~/clawd/HIPPOCAMPUS_CORE.md',
    type: 'hippocampus',
    size: '8.2 KB',
    lines: 180,
    lastModified: '1天前',
    preview: '# 核心记忆\n高重要性记忆自动同步...',
    importance: 'high',
  },
  {
    name: '2026-02-07.md',
    path: '~/clawd/memory/2026-02-07.md',
    type: 'daily',
    size: '2.1 KB',
    lines: 56,
    lastModified: '刚刚',
    preview: '# 2026-02-07\n\n## OpenClaw Command Center 开发...',
    importance: 'medium',
  },
  {
    name: '2026-02-06.md',
    path: '~/clawd/memory/2026-02-06.md',
    type: 'daily',
    size: '4.8 KB',
    lines: 175,
    lastModified: '昨天',
    preview: '# 2026-02-06 Daily Notes\n\n## React 19 Lint 修复...',
    importance: 'medium',
  },
  {
    name: 'corrections.md',
    path: '~/clawd/memory/corrections.md',
    type: 'learning',
    size: '1.2 KB',
    lines: 35,
    lastModified: '3天前',
    preview: '# 错误追踪\n记录被纠正的错误...',
    importance: 'low',
  },
  {
    name: 'project-fittrack.md',
    path: '~/clawd/memory/project-fittrack.md',
    type: 'project',
    size: '3.4 KB',
    lines: 89,
    lastModified: '1周前',
    preview: '# FitTrack 项目\n健身追踪应用...',
    importance: 'medium',
  },
]

const typeConfig: Record<string, { label: string; color: string; icon: typeof Brain }> = {
  core: { label: '核心', color: 'text-purple-400', icon: Brain },
  hippocampus: { label: '海马体', color: 'text-pink-400', icon: Sparkles },
  daily: { label: '每日', color: 'text-blue-400', icon: Calendar },
  learning: { label: '学习', color: 'text-green-400', icon: TrendingUp },
  project: { label: '项目', color: 'text-amber-400', icon: Folder },
}

export function Memory() {
  useGatewayStore() // For future use
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [selectedFile, setSelectedFile] = useState<typeof memoryFiles[0] | null>(null)

  const filteredFiles = memoryFiles.filter((file) => {
    if (filterType !== 'all' && file.type !== filterType) return false
    if (searchQuery && !file.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const stats = {
    total: memoryFiles.length,
    core: memoryFiles.filter(f => f.type === 'core').length,
    daily: memoryFiles.filter(f => f.type === 'daily').length,
    totalLines: memoryFiles.reduce((sum, f) => sum + f.lines, 0),
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">记忆</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">浏览和搜索记忆系统</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" disabled>
            <RefreshCw className="size-4" />
          </Button>
          <Button size="sm" disabled>
            <Plus className="size-4" />
            <span className="hidden sm:inline ml-1.5">新建</span>
          </Button>
        </div>
      </div>

      {/* Local Mode Notice */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
              <Database className="size-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-blue-400">记忆系统预览</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                当前显示的是示例数据。完整的记忆搜索和编辑功能需要本地代理支持。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Brain className="size-5 lg:size-6 text-purple-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{stats.total}</p>
              <p className="text-xs text-[var(--color-text-muted)]">记忆文件</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
              <Calendar className="size-5 lg:size-6 text-blue-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{stats.daily}</p>
              <p className="text-xs text-[var(--color-text-muted)]">每日记录</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
              <FileText className="size-5 lg:size-6 text-green-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{stats.totalLines}</p>
              <p className="text-xs text-[var(--color-text-muted)]">总行数</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <Sparkles className="size-5 lg:size-6 text-amber-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{stats.core}</p>
              <p className="text-xs text-[var(--color-text-muted)]">核心记忆</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="搜索记忆..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              'w-full pl-10 pr-4 py-2.5 rounded-xl',
              'bg-[var(--color-surface)] border border-[var(--color-border)]',
              'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
              'focus:outline-none focus:border-[var(--color-accent)]'
            )}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          {['all', 'core', 'daily', 'project'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={cn(
                'px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
                filterType === type
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
              )}
            >
              {type === 'all' ? '全部' : typeConfig[type]?.label || type}
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* File List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Folder className="size-4 text-[var(--color-accent)]" />
              记忆文件
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--color-border-subtle)] max-h-96 overflow-y-auto">
              {filteredFiles.map((file) => {
                const config = typeConfig[file.type]
                return (
                  <button
                    key={file.name}
                    onClick={() => setSelectedFile(file)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 text-left transition-all',
                      'hover:bg-[var(--color-surface-hover)]',
                      selectedFile?.name === file.name && 'bg-[var(--color-accent)]/10 border-l-2 border-[var(--color-accent)]'
                    )}
                  >
                    <div className={cn(
                      'size-9 rounded-lg flex items-center justify-center shrink-0',
                      selectedFile?.name === file.name 
                        ? 'bg-[var(--color-accent)]/20' 
                        : 'bg-[var(--color-surface-elevated)]'
                    )}>
                      {config && <config.icon className={cn('size-4', config.color)} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-[var(--color-text-primary)] truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {file.size} • {file.lastModified}
                      </p>
                    </div>
                    <ChevronRight className="size-4 text-[var(--color-text-muted)] shrink-0" />
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="lg:col-span-2">
          {selectedFile ? (
            <>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="size-4 text-[var(--color-accent)]" />
                    {selectedFile.name}
                  </CardTitle>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    {selectedFile.path} • {selectedFile.lines} 行
                  </p>
                </div>
                <Badge 
                  variant={selectedFile.importance === 'high' ? 'warning' : 'default'}
                >
                  {typeConfig[selectedFile.type]?.label}
                </Badge>
              </CardHeader>
              <CardContent>
                <pre className="bg-[var(--color-surface-elevated)] p-4 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap font-mono">
                  {selectedFile.preview}
                </pre>
              </CardContent>
            </>
          ) : (
            <CardContent className="p-8 text-center">
              <Brain className="size-12 text-[var(--color-text-muted)] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">
                选择记忆文件
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                从左侧列表选择一个文件查看内容
              </p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
