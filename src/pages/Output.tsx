import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useGatewayStore } from '@/stores/gateway'
import { cn, formatBytes } from '@/lib/utils'
import {
  Search,
  Image,
  FileText,
  Database,
  Globe,
  Download,
  Trash2,
  Eye,
  Calendar,
  FolderOpen,
  HardDrive,
  Filter,
  FileOutput,
} from 'lucide-react'

const outputFiles = [
  { name: 'anime_001.png', type: 'image', size: 524288, createdAt: '03:30', icon: Image },
  { name: 'product.jpg', type: 'image', size: 1048576, createdAt: '昨天 18:45', icon: Image },
  { name: 'notes.md', type: 'document', size: 8192, createdAt: '昨天 14:20', icon: FileText },
  { name: 'data.json', type: 'data', size: 262144, createdAt: '2天前', icon: Database },
  { name: 'snapshot.html', type: 'web', size: 131072, createdAt: '2天前', icon: Globe },
  { name: 'report.pdf', type: 'document', size: 2097152, createdAt: '3天前', icon: FileText },
]

const typeConfig: Record<string, { color: string; label: string }> = {
  image: { color: 'from-pink-500/20 to-rose-500/20', label: '图片' },
  document: { color: 'from-blue-500/20 to-cyan-500/20', label: '文档' },
  data: { color: 'from-green-500/20 to-emerald-500/20', label: '数据' },
  web: { color: 'from-purple-500/20 to-violet-500/20', label: '网页' },
}

export function Output() {
  useGatewayStore() // For future use
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const types = Object.keys(typeConfig)
  const filteredFiles = outputFiles.filter((file) => {
    if (selectedType && file.type !== selectedType) return false
    if (searchQuery && !file.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const totalSize = outputFiles.reduce((sum, f) => sum + f.size, 0)

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">输出文件</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">浏览生成文件</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <FolderOpen className="size-4" />
            <span className="hidden sm:inline ml-1.5">打开</span>
          </Button>
          <Button variant="danger" size="sm">
            <Trash2 className="size-4" />
            <span className="hidden sm:inline ml-1.5">清空</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {types.map((type) => {
          const config = typeConfig[type]
          const count = outputFiles.filter((f) => f.type === type).length
          const Icon = outputFiles.find(f => f.type === type)?.icon || FileText
          return (
            <Card key={type} className="p-3">
              <div className="flex items-center gap-2">
                <div className={cn('size-8 rounded-lg flex items-center justify-center bg-gradient-to-br', config.color)}>
                  <Icon className="size-4 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-[var(--color-text-primary)] tabular-nums">{count}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)]">{config.label}</p>
                </div>
              </div>
            </Card>
          )
        })}
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <HardDrive className="size-4 text-amber-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-text-primary)]">{formatBytes(totalSize)}</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">总大小</p>
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
            placeholder="搜索文件..."
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
          className="sm:hidden px-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] flex items-center justify-center gap-2"
        >
          <Filter className="size-4" />
          筛选
        </button>
        <div className="hidden sm:flex items-center gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(selectedType === type ? null : type)}
              className={cn(
                'px-3 py-2 rounded-xl text-sm font-medium transition-all',
                selectedType === type
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
              )}
            >
              {typeConfig[type].label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="sm:hidden flex flex-wrap gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(selectedType === type ? null : type)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium',
                selectedType === type
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
              )}
            >
              {typeConfig[type].label}
            </button>
          ))}
        </div>
      )}

      {/* File List */}
      <Card>
        <CardHeader className="pb-2 lg:pb-3 px-4">
          <CardTitle className="text-sm flex items-center gap-2">
            <FileOutput className="size-4 text-[var(--color-accent)]" />
            文件列表
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {filteredFiles.map((file, i) => {
              const config = typeConfig[file.type]
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-surface-hover)] transition-all"
                >
                  <div className={cn('size-9 lg:size-11 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br', config.color)}>
                    <file.icon className="size-4 lg:size-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-[var(--color-text-primary)] truncate">{file.name}</p>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-[var(--color-text-muted)]">
                      <span>{formatBytes(file.size)}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {file.createdAt}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button className="p-1.5 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
                      <Eye className="size-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
                      <Download className="size-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--color-text-muted)] hover:text-red-400">
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
