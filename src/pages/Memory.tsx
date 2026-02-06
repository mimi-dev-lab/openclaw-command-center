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
} from 'lucide-react'

// Mock memory data
const memoryFiles = [
  {
    name: 'MEMORY.md',
    path: '~/clawd/MEMORY.md',
    type: 'core',
    size: '12.4 KB',
    lastModified: '2 hours ago',
    preview: '## 🔄 重大变更\n### 2026-02-06：Clawdbot → OpenClaw 迁移...',
  },
  {
    name: 'HIPPOCAMPUS_CORE.md',
    path: '~/clawd/HIPPOCAMPUS_CORE.md',
    type: 'hippocampus',
    size: '8.2 KB',
    lastModified: '1 day ago',
    preview: '# 核心记忆 (重要性 ≥ 0.75)\n自动生成...',
  },
  {
    name: '2026-02-07.md',
    path: '~/clawd/memory/2026-02-07.md',
    type: 'daily',
    size: '2.1 KB',
    lastModified: '30 min ago',
    preview: '## 今日记录\n- OpenClaw Command Center 项目启动...',
  },
  {
    name: '2026-02-06.md',
    path: '~/clawd/memory/2026-02-06.md',
    type: 'daily',
    size: '5.8 KB',
    lastModified: '1 day ago',
    preview: '## 今日记录\n- 完成 OpenClaw 迁移...',
  },
  {
    name: 'corrections.md',
    path: '~/clawd/memory/corrections.md',
    type: 'system',
    size: '1.2 KB',
    lastModified: '3 days ago',
    preview: '# 错误追踪\n记录被纠正的错误...',
  },
  {
    name: 'project-fittrack.md',
    path: '~/clawd/memory/project-fittrack.md',
    type: 'project',
    size: '3.4 KB',
    lastModified: '5 days ago',
    preview: '# FitTrack 项目\n健身追踪 Web App...',
  },
]

const memoryStats = {
  totalFiles: 24,
  totalSize: '156 KB',
  lastUpdated: '30 min ago',
  hippocampusEntries: 42,
}

export function Memory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<typeof memoryFiles[0] | null>(null)

  const types = [
    { id: 'core', label: 'Core', count: 2, color: 'text-purple-400' },
    { id: 'daily', label: 'Daily', count: 15, color: 'text-blue-400' },
    { id: 'project', label: 'Projects', count: 4, color: 'text-green-400' },
    { id: 'hippocampus', label: 'Hippocampus', count: 1, color: 'text-yellow-400' },
    { id: 'system', label: 'System', count: 2, color: 'text-gray-400' },
  ]

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
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Memory</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Browse and search memory files
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <RefreshCw className="size-4 mr-2" />
            Sync Hippocampus
          </Button>
          <Button size="sm">
            <Plus className="size-4 mr-2" />
            New Entry
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <FileText className="size-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {memoryStats.totalFiles}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Total Files</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Folder className="size-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {memoryStats.totalSize}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Total Size</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Clock className="size-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {memoryStats.lastUpdated}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Last Updated</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Brain className="size-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {memoryStats.hippocampusEntries}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Hippocampus Entries</p>
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
              placeholder="Search memory files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'w-full pl-10 pr-4 py-2 rounded-lg',
                'bg-[var(--color-surface-elevated)] border border-[var(--color-border)]',
                'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
                'focus:outline-none focus:border-[var(--color-accent)]'
              )}
            />
          </div>
          <div className="flex items-center gap-2">
            {types.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  selectedType === type.id
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
                )}
              >
                {type.label}
                <span className="ml-1.5 opacity-60">{type.count}</span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* File List */}
      <Card>
        <CardHeader>
          <CardTitle>Memory Files</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {filteredFiles.map((file) => (
              <button
                key={file.path}
                onClick={() => setSelectedFile(file)}
                className={cn(
                  'w-full flex items-center gap-4 px-5 py-4 text-left transition-colors',
                  'hover:bg-[var(--color-surface-hover)]',
                  selectedFile?.path === file.path && 'bg-[var(--color-accent-subtle)]'
                )}
              >
                <div className="size-10 rounded-lg bg-[var(--color-surface-elevated)] flex items-center justify-center shrink-0">
                  {file.type === 'daily' ? (
                    <Calendar className="size-5 text-blue-400" />
                  ) : file.type === 'hippocampus' ? (
                    <Brain className="size-5 text-yellow-400" />
                  ) : (
                    <FileText className="size-5 text-[var(--color-text-muted)]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-[var(--color-text-primary)]">{file.name}</p>
                    <Badge variant="default">{file.type}</Badge>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] truncate mt-0.5">
                    {file.preview}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm text-[var(--color-text-secondary)]">{file.size}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{file.lastModified}</p>
                </div>
                <ChevronRight className="size-4 text-[var(--color-text-muted)]" />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
