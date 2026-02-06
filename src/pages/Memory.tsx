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
} from 'lucide-react'

// Mock memory data
const memoryFiles = [
  {
    name: 'MEMORY.md',
    path: '~/clawd/MEMORY.md',
    type: 'core',
    size: '12.4 KB',
    lines: 450,
    lastModified: '30分钟前',
    preview: '## 🔄 重大变更\n### 2026-02-06：Clawdbot → OpenClaw 迁移...',
    importance: 'high',
  },
  {
    name: 'HIPPOCAMPUS_CORE.md',
    path: '~/clawd/HIPPOCAMPUS_CORE.md',
    type: 'hippocampus',
    size: '8.2 KB',
    lines: 180,
    lastModified: '1天前',
    preview: '# 核心记忆 (重要性 ≥ 0.75)\n自动从 Hippocampus 系统同步...',
    importance: 'high',
  },
  {
    name: '2026-02-07.md',
    path: '~/clawd/memory/2026-02-07.md',
    type: 'daily',
    size: '2.1 KB',
    lines: 56,
    lastModified: '刚刚',
    preview: '## 今日记录\n- OpenClaw Command Center 项目启动\n- 完成全部 10 个模块...',
    importance: 'medium',
  },
  {
    name: '2026-02-06.md',
    path: '~/clawd/memory/2026-02-06.md',
    type: 'daily',
    size: '5.8 KB',
    lines: 145,
    lastModified: '1天前',
    preview: '## 今日记录\n- 完成 OpenClaw 迁移\n- Hippocampus 记忆系统上线...',
    importance: 'medium',
  },
  {
    name: 'corrections.md',
    path: '~/clawd/memory/corrections.md',
    type: 'system',
    size: '1.2 KB',
    lines: 35,
    lastModified: '3天前',
    preview: '# 错误追踪\n记录被纠正的错误和教训...',
    importance: 'low',
  },
  {
    name: 'project-fittrack.md',
    path: '~/clawd/memory/project-fittrack.md',
    type: 'project',
    size: '3.4 KB',
    lines: 89,
    lastModified: '5天前',
    preview: '# FitTrack 项目\n健身追踪 Web App，已部署到 Cloudflare Pages...',
    importance: 'medium',
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
  { id: 'core', label: '核心', count: 2, color: 'bg-purple-500/10 text-purple-400', icon: Brain },
  { id: 'daily', label: '每日', count: 15, color: 'bg-blue-500/10 text-blue-400', icon: Calendar },
  { id: 'project', label: '项目', count: 4, color: 'bg-green-500/10 text-green-400', icon: Folder },
  { id: 'hippocampus', label: '海马体', count: 1, color: 'bg-yellow-500/10 text-yellow-400', icon: Sparkles },
  { id: 'system', label: '系统', count: 2, color: 'bg-gray-500/10 text-gray-400', icon: Database },
]

export function Memory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<typeof memoryFiles[0] | null>(null)

  const filteredFiles = memoryFiles.filter((file) => {
    if (selectedType && file.type !== selectedType) return false
    if (searchQuery && !file.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">记忆系统</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            浏览和管理 AI Agent 的记忆文件
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <RefreshCw className="size-4 mr-2" />
            同步海马体
          </Button>
          <Button size="sm">
            <Plus className="size-4 mr-2" />
            新建记忆
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="p-4 col-span-1">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <FileText className="size-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">
                {memoryStats.totalFiles}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">文件总数</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 col-span-1">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Database className="size-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {memoryStats.totalSize}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">总大小</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 col-span-1">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <FileText className="size-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">
                {memoryStats.totalLines.toLocaleString()}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">总行数</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 col-span-1">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <Sparkles className="size-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">
                {memoryStats.hippocampusEntries}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">海马体条目</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 col-span-1">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
              <TrendingUp className="size-5 text-pink-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {(memoryStats.avgImportance * 100).toFixed(0)}%
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">平均重要性</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 col-span-1">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <Clock className="size-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-text-primary)]">
                {memoryStats.lastUpdated}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">最后更新</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search & Filter */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="搜索记忆文件..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'w-full pl-10 pr-4 py-2.5 rounded-xl',
                'bg-[var(--color-surface-elevated)] border border-[var(--color-border)]',
                'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
                'focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20'
              )}
            />
          </div>
          <div className="flex items-center gap-2">
            {types.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
                className={cn(
                  'px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2',
                  selectedType === type.id
                    ? 'bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/25'
                    : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
                )}
              >
                <type.icon className="size-4" />
                {type.label}
                <span className={cn(
                  'text-xs px-1.5 py-0.5 rounded-md',
                  selectedType === type.id ? 'bg-white/20' : 'bg-[var(--color-surface-hover)]'
                )}>
                  {type.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* File List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Brain className="size-4 text-[var(--color-accent)]" />
            记忆文件
            <Badge variant="default" className="ml-2">{filteredFiles.length} 个文件</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {filteredFiles.map((file) => {
              const typeConfig = types.find(t => t.id === file.type)
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={cn(
                    'w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-200',
                    'hover:bg-[var(--color-surface-hover)]',
                    selectedFile?.path === file.path && 'bg-gradient-to-r from-indigo-500/10 to-purple-500/5'
                  )}
                >
                  <div className={cn(
                    'size-11 rounded-xl flex items-center justify-center shrink-0',
                    typeConfig?.color || 'bg-gray-500/10 text-gray-400'
                  )}>
                    {typeConfig?.icon && <typeConfig.icon className="size-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-[var(--color-text-primary)]">{file.name}</p>
                      <Badge 
                        variant={file.importance === 'high' ? 'warning' : file.importance === 'medium' ? 'info' : 'default'}
                        className="text-[10px]"
                      >
                        {file.importance === 'high' ? '重要' : file.importance === 'medium' ? '普通' : '低'}
                      </Badge>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] truncate mt-0.5">
                      {file.preview}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-[var(--color-text-muted)]">
                      <span>{file.size}</span>
                      <span>{file.lines} 行</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {file.lastModified}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
                      <Eye className="size-4" />
                    </button>
                    <ChevronRight className="size-4 text-[var(--color-text-muted)]" />
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
