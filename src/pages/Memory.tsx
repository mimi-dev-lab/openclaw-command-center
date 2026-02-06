import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import {
  Brain,
  Search,
  FileText,
  Folder,
  Calendar,
  Clock,
  ChevronRight,
  RefreshCw,
  Plus,
  Sparkles,
  TrendingUp,
  Database,
  Eye,
  Filter,
} from 'lucide-react'

const memoryFiles = [
  {
    name: 'MEMORY.md',
    path: '~/clawd/MEMORY.md',
    type: 'core',
    size: '12.4 KB',
    lines: 450,
    lastModified: '30分钟前',
    preview: '## 重大变更...',
    importance: 'high',
  },
  {
    name: 'HIPPOCAMPUS_CORE.md',
    path: '~/clawd/HIPPOCAMPUS_CORE.md',
    type: 'hippocampus',
    size: '8.2 KB',
    lines: 180,
    lastModified: '1天前',
    preview: '# 核心记忆...',
    importance: 'high',
  },
  {
    name: '2026-02-07.md',
    path: '~/clawd/memory/2026-02-07.md',
    type: 'daily',
    size: '2.1 KB',
    lines: 56,
    lastModified: '刚刚',
    preview: '## 今日记录...',
    importance: 'medium',
  },
  {
    name: '2026-02-06.md',
    path: '~/clawd/memory/2026-02-06.md',
    type: 'daily',
    size: '5.8 KB',
    lines: 145,
    lastModified: '1天前',
    preview: '## 今日记录...',
    importance: 'medium',
  },
  {
    name: 'corrections.md',
    path: '~/clawd/memory/corrections.md',
    type: 'system',
    size: '1.2 KB',
    lines: 35,
    lastModified: '3天前',
    preview: '# 错误追踪...',
    importance: 'low',
  },
]

const memoryStats = {
  totalFiles: 24,
  totalSize: '156 KB',
  totalLines: 2840,
  lastUpdated: '刚刚',
  hippocampusEntries: 42,
  avgImportance: 0.68,
}

const types = [
  { id: 'core', label: '核心', count: 2, icon: Brain },
  { id: 'daily', label: '每日', count: 15, icon: Calendar },
  { id: 'project', label: '项目', count: 4, icon: Folder },
  { id: 'hippocampus', label: '海马体', count: 1, icon: Sparkles },
  { id: 'system', label: '系统', count: 2, icon: Database },
]

export function Memory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredFiles = memoryFiles.filter((file) => {
    if (selectedType && file.type !== selectedType) return false
    if (searchQuery && !file.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">记忆系统</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">浏览和管理记忆文件</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <RefreshCw className="size-4" />
            <span className="hidden sm:inline ml-1.5">同步</span>
          </Button>
          <Button size="sm">
            <Plus className="size-4" />
            <span className="hidden sm:inline ml-1.5">新建</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <FileText className="size-4 text-purple-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-text-primary)] tabular-nums">{memoryStats.totalFiles}</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">文件</p>
            </div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Database className="size-4 text-blue-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-text-primary)]">{memoryStats.totalSize}</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">大小</p>
            </div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-green-500/10 flex items-center justify-center">
              <FileText className="size-4 text-green-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-text-primary)] tabular-nums">{memoryStats.totalLines.toLocaleString()}</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">行数</p>
            </div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Sparkles className="size-4 text-yellow-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-text-primary)] tabular-nums">{memoryStats.hippocampusEntries}</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">海马体</p>
            </div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
              <TrendingUp className="size-4 text-pink-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-text-primary)]">{(memoryStats.avgImportance * 100).toFixed(0)}%</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">重要性</p>
            </div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Clock className="size-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-text-primary)]">{memoryStats.lastUpdated}</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">更新</p>
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
            placeholder="搜索记忆文件..."
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
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="sm:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
        >
          <Filter className="size-4" />
          筛选
        </button>
        <div className="hidden sm:flex items-center gap-2 overflow-x-auto pb-1">
          {types.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
              className={cn(
                'px-3 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5',
                selectedType === type.id
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
              )}
            >
              <type.icon className="size-3.5" />
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="sm:hidden flex flex-wrap gap-2">
          {types.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5',
                selectedType === type.id
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
              )}
            >
              <type.icon className="size-3.5" />
              {type.label} ({type.count})
            </button>
          ))}
        </div>
      )}

      {/* File List */}
      <Card>
        <CardHeader className="pb-2 lg:pb-3 px-4">
          <CardTitle className="text-sm flex items-center gap-2">
            <Brain className="size-4 text-[var(--color-accent)]" />
            记忆文件
            <Badge variant="default" className="ml-1">{filteredFiles.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {filteredFiles.map((file) => {
              const typeConfig = types.find(t => t.id === file.type)
              return (
                <button
                  key={file.path}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[var(--color-surface-hover)] transition-all"
                >
                  <div className="size-9 lg:size-11 rounded-xl bg-[var(--color-surface-elevated)] flex items-center justify-center shrink-0">
                    {typeConfig?.icon && <typeConfig.icon className="size-4 lg:size-5 text-[var(--color-accent)]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-[var(--color-text-primary)] truncate">{file.name}</p>
                      <Badge 
                        variant={file.importance === 'high' ? 'warning' : 'default'}
                        className="text-[10px] hidden sm:inline-flex"
                      >
                        {file.importance === 'high' ? '重要' : '普通'}
                      </Badge>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] truncate">{file.preview}</p>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-[var(--color-text-muted)]">
                      <span>{file.size}</span>
                      <span className="hidden sm:inline">{file.lines} 行</span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="size-2.5" />
                        {file.lastModified}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button className="p-1.5 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
                      <Eye className="size-4" />
                    </button>
                    <ChevronRight className="size-4 text-[var(--color-text-muted)] hidden sm:block" />
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
