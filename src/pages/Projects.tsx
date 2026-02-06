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
  Rocket,
  Eye,
  MoreVertical,
} from 'lucide-react'

// Mock projects data
const projects = [
  {
    name: 'openclaw-command-center',
    path: '~/clawd/projects/openclaw-command-center',
    type: 'react',
    lastModified: '刚刚',
    gitStatus: 'modified',
    description: 'OpenClaw 可视化管理后台',
    deployed: false,
    stars: 0,
  },
  {
    name: 'mimi-bit',
    path: '~/clawd/projects/mimi-bit',
    type: 'python',
    lastModified: '2天前',
    gitStatus: 'clean',
    description: '加密货币量化交易系统',
    deployed: false,
    stars: 0,
  },
  {
    name: 'fittrack',
    path: '~/clawd/projects/fittrack',
    type: 'nextjs',
    lastModified: '5天前',
    gitStatus: 'clean',
    description: '健身追踪 Web App',
    deployed: true,
    deployUrl: 'https://fittrack.pages.dev',
    stars: 12,
  },
  {
    name: 'gemini-webapi-bridge',
    path: '~/clawd/projects/gemini-webapi-bridge',
    type: 'python',
    lastModified: '1周前',
    gitStatus: 'clean',
    description: 'Gemini Web API 桥接器',
    deployed: false,
    stars: 5,
  },
  {
    name: 'fast-browser-use',
    path: '~/clawd/projects/fast-browser-use',
    type: 'rust',
    lastModified: '2周前',
    gitStatus: 'clean',
    description: '高性能浏览器自动化工具',
    deployed: false,
    stars: 23,
  },
  {
    name: 'yugioh-deck-analyzer',
    path: '~/clawd/projects/yugioh-deck-analyzer',
    type: 'react',
    lastModified: '3周前',
    gitStatus: 'clean',
    description: '游戏王卡组分析器',
    deployed: true,
    deployUrl: 'https://yugioh.pages.dev',
    stars: 8,
  },
]

const typeConfig: Record<string, { icon: typeof Code; color: string; gradient: string; label: string }> = {
  react: { icon: Code, color: 'text-cyan-400', gradient: 'from-cyan-500/20 to-blue-500/20', label: 'React' },
  nextjs: { icon: Globe, color: 'text-white', gradient: 'from-gray-500/20 to-gray-600/20', label: 'Next.js' },
  python: { icon: Terminal, color: 'text-yellow-400', gradient: 'from-yellow-500/20 to-amber-500/20', label: 'Python' },
  rust: { icon: FileCode, color: 'text-orange-400', gradient: 'from-orange-500/20 to-red-500/20', label: 'Rust' },
  node: { icon: Terminal, color: 'text-green-400', gradient: 'from-green-500/20 to-emerald-500/20', label: 'Node.js' },
  other: { icon: FolderOpen, color: 'text-gray-400', gradient: 'from-gray-500/20 to-gray-600/20', label: '其他' },
}

export function Projects() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const types = Object.keys(typeConfig)

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
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">项目</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            管理 ~/clawd/projects 下的本地项目
          </p>
        </div>
        <Button size="sm">
          <Plus className="size-4 mr-2" />
          新建项目
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
              <FolderOpen className="size-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">
                {projects.length}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">项目总数</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
              <Rocket className="size-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">
                {deployedCount}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">已部署</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center">
              <GitBranch className="size-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">
                {modifiedCount}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">有修改</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
              <Code className="size-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">5</p>
              <p className="text-xs text-[var(--color-text-muted)]">语言/框架</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
              <Globe className="size-5 text-pink-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-text-primary)]">mimi-dev-lab</p>
              <p className="text-xs text-[var(--color-text-muted)]">GitHub 组织</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search & Filter */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="搜索项目..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'w-full pl-11 pr-4 py-2.5 rounded-xl',
                'bg-[var(--color-surface-elevated)] border border-[var(--color-border)]',
                'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
                'focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20'
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
                    'px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2',
                    selectedType === type
                      ? 'bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/25'
                      : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
                  )}
                >
                  <config.icon className={cn('size-4', selectedType !== type && config.color)} />
                  {config.label}
                </button>
              )
            })}
          </div>
        </div>
      </Card>

      {/* Project Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredProjects.map((project) => {
          const config = typeConfig[project.type] || typeConfig.other
          return (
            <Card key={project.name} hover className="overflow-hidden group">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'size-14 rounded-xl flex items-center justify-center shrink-0',
                      `bg-gradient-to-br ${config.gradient}`
                    )}
                  >
                    <config.icon className={cn('size-7', config.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-[var(--color-text-primary)]">
                        {project.name}
                      </h3>
                      {project.deployed && (
                        <Badge variant="success" className="text-[10px]">
                          <Rocket className="size-3 mr-1" />
                          已部署
                        </Badge>
                      )}
                      {project.gitStatus === 'modified' && (
                        <Badge variant="warning" className="text-[10px]">有修改</Badge>
                      )}
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1.5">
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
                        className="inline-flex items-center gap-1.5 mt-3 text-sm text-[var(--color-accent)] hover:underline"
                      >
                        <Globe className="size-3.5" />
                        {project.deployUrl.replace('https://', '')}
                        <ExternalLink className="size-3" />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
                      <Eye className="size-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
                      <MoreVertical className="size-4" />
                    </button>
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
