import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import {
  FolderOpen,
  Search,
  Plus,
  ExternalLink,
  GitBranch,
  Clock,
  Code,
  Globe,
  Terminal,
  FileCode,
} from 'lucide-react'

// Mock projects data
const projects = [
  {
    name: 'openclaw-command-center',
    path: '~/clawd/projects/openclaw-command-center',
    type: 'react',
    lastModified: 'Just now',
    gitStatus: 'modified',
    hasPackageJson: true,
    description: 'OpenClaw 管理后台',
    deployed: false,
  },
  {
    name: 'mimi-bit',
    path: '~/clawd/projects/mimi-bit',
    type: 'python',
    lastModified: '2 days ago',
    gitStatus: 'clean',
    hasPackageJson: false,
    description: '加密货币量化交易系统',
    deployed: false,
  },
  {
    name: 'fittrack',
    path: '~/clawd/projects/fittrack',
    type: 'nextjs',
    lastModified: '5 days ago',
    gitStatus: 'clean',
    hasPackageJson: true,
    description: '健身追踪 Web App',
    deployed: true,
    deployUrl: 'https://fittrack.pages.dev',
  },
  {
    name: 'gemini-webapi-bridge',
    path: '~/clawd/projects/gemini-webapi-bridge',
    type: 'python',
    lastModified: '1 week ago',
    gitStatus: 'clean',
    hasPackageJson: false,
    description: 'Gemini Web API 桥接器',
    deployed: false,
  },
  {
    name: 'fast-browser-use',
    path: '~/clawd/projects/fast-browser-use',
    type: 'rust',
    lastModified: '2 weeks ago',
    gitStatus: 'clean',
    hasPackageJson: false,
    description: '高性能浏览器自动化工具',
    deployed: false,
  },
  {
    name: 'yugioh-deck-analyzer',
    path: '~/clawd/projects/yugioh-deck-analyzer',
    type: 'react',
    lastModified: '3 weeks ago',
    gitStatus: 'clean',
    hasPackageJson: true,
    description: '游戏王卡组分析器',
    deployed: true,
    deployUrl: 'https://yugioh.pages.dev',
  },
]

const typeIcons: Record<string, typeof Code> = {
  react: Code,
  nextjs: Globe,
  python: Terminal,
  rust: FileCode,
  node: Terminal,
  other: FolderOpen,
}

const typeColors: Record<string, string> = {
  react: 'text-cyan-400',
  nextjs: 'text-white',
  python: 'text-yellow-400',
  rust: 'text-orange-400',
  node: 'text-green-400',
  other: 'text-gray-400',
}

export function Projects() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const types = ['react', 'nextjs', 'python', 'rust', 'node']

  const filteredProjects = projects.filter((project) => {
    if (selectedType && project.type !== selectedType) return false
    if (searchQuery && !project.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const deployedCount = projects.filter((p) => p.deployed).length
  const modifiedCount = projects.filter((p) => p.gitStatus === 'modified').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Projects</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Local projects in ~/clawd/projects
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm">
            <Plus className="size-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-[var(--color-accent-subtle)] flex items-center justify-center">
              <FolderOpen className="size-5 text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {projects.length}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Total Projects</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Globe className="size-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {deployedCount}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Deployed</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <GitBranch className="size-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {modifiedCount}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Modified</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Code className="size-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">5</p>
              <p className="text-sm text-[var(--color-text-muted)]">Languages</p>
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
              placeholder="Search projects..."
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
              const Icon = typeIcons[type]
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
                  <Icon className={cn('size-4', selectedType !== type && typeColors[type])} />
                  {type}
                </button>
              )
            })}
          </div>
        </div>
      </Card>

      {/* Project Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredProjects.map((project) => {
          const Icon = typeIcons[project.type] || FolderOpen
          return (
            <Card key={project.name} hover>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'size-12 rounded-xl flex items-center justify-center shrink-0',
                      'bg-[var(--color-surface-elevated)]'
                    )}
                  >
                    <Icon className={cn('size-6', typeColors[project.type])} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[var(--color-text-primary)]">
                        {project.name}
                      </h3>
                      {project.deployed && (
                        <Badge variant="success">
                          <Globe className="size-3 mr-1" />
                          Deployed
                        </Badge>
                      )}
                      {project.gitStatus === 'modified' && (
                        <Badge variant="warning">Modified</Badge>
                      )}
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                        <Clock className="size-3" />
                        {project.lastModified}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)] font-mono">
                        {project.path}
                      </span>
                    </div>
                    {project.deployed && project.deployUrl && (
                      <a
                        href={project.deployUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-xs text-[var(--color-accent)] hover:underline"
                      >
                        <ExternalLink className="size-3" />
                        {project.deployUrl}
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
