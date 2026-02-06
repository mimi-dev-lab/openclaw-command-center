import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn, formatBytes } from '@/lib/utils'
import {
  FileOutput,
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
} from 'lucide-react'

// Mock output files
const outputFiles = [
  {
    name: 'anime_character_001.png',
    path: '~/clawd/output/images/anime_character_001.png',
    type: 'image',
    size: 524288,
    createdAt: '2026-02-07 03:30',
    mimeType: 'image/png',
  },
  {
    name: 'product_photo_final.jpg',
    path: '~/clawd/output/images/product_photo_final.jpg',
    type: 'image',
    size: 1048576,
    createdAt: '2026-02-06 18:45',
    mimeType: 'image/jpeg',
  },
  {
    name: 'meeting_notes.md',
    path: '~/clawd/output/documents/meeting_notes.md',
    type: 'document',
    size: 8192,
    createdAt: '2026-02-06 14:20',
    mimeType: 'text/markdown',
  },
  {
    name: 'scraped_data.json',
    path: '~/clawd/output/data/scraped_data.json',
    type: 'data',
    size: 262144,
    createdAt: '2026-02-05 22:00',
    mimeType: 'application/json',
  },
  {
    name: 'website_snapshot.html',
    path: '~/clawd/output/web/website_snapshot.html',
    type: 'web',
    size: 131072,
    createdAt: '2026-02-05 16:30',
    mimeType: 'text/html',
  },
  {
    name: 'analysis_report.pdf',
    path: '~/clawd/output/documents/analysis_report.pdf',
    type: 'document',
    size: 2097152,
    createdAt: '2026-02-04 10:15',
    mimeType: 'application/pdf',
  },
]

const typeConfig: Record<string, { icon: typeof Image; color: string; label: string }> = {
  image: { icon: Image, color: 'text-pink-400 bg-pink-500/10', label: 'Images' },
  document: { icon: FileText, color: 'text-blue-400 bg-blue-500/10', label: 'Documents' },
  data: { icon: Database, color: 'text-green-400 bg-green-500/10', label: 'Data' },
  web: { icon: Globe, color: 'text-purple-400 bg-purple-500/10', label: 'Web' },
}

export function Output() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const types = Object.keys(typeConfig)

  const filteredFiles = outputFiles.filter((file) => {
    if (selectedType && file.type !== selectedType) return false
    if (searchQuery && !file.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const totalSize = outputFiles.reduce((sum, f) => sum + f.size, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Output</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Browse generated files in ~/clawd/output
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <FolderOpen className="size-4 mr-2" />
            Open in Finder
          </Button>
          <Button variant="danger" size="sm">
            <Trash2 className="size-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        {types.map((type) => {
          const config = typeConfig[type]
          const count = outputFiles.filter((f) => f.type === type).length
          return (
            <Card key={type} className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn('size-10 rounded-lg flex items-center justify-center', config.color)}>
                  <config.icon className="size-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[var(--color-text-primary)]">{count}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{config.label}</p>
                </div>
              </div>
            </Card>
          )
        })}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-[var(--color-accent-subtle)] flex items-center justify-center">
              <FileOutput className="size-5 text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {formatBytes(totalSize)}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Total Size</p>
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
              placeholder="Search files..."
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
            {types.map((type) => {
              const config = typeConfig[type]
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2',
                    selectedType === type
                      ? 'bg-[var(--color-accent)] text-white'
                      : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
                  )}
                >
                  <config.icon className="size-4" />
                  {config.label}
                </button>
              )
            })}
          </div>
        </div>
      </Card>

      {/* File List */}
      <Card>
        <CardHeader>
          <CardTitle>Files</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {filteredFiles.map((file) => {
              const config = typeConfig[file.type]
              return (
                <div
                  key={file.path}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-[var(--color-surface-hover)] transition-colors"
                >
                  <div
                    className={cn(
                      'size-10 rounded-lg flex items-center justify-center shrink-0',
                      config.color
                    )}
                  >
                    <config.icon className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--color-text-primary)] truncate">
                      {file.name}
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)] font-mono truncate">
                      {file.path}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {formatBytes(file.size)}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1 justify-end">
                      <Calendar className="size-3" />
                      {file.createdAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
                      <Eye className="size-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
                      <Download className="size-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-500/10 text-[var(--color-text-muted)] hover:text-red-400">
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
