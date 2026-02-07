import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useGatewayStore } from '@/stores/gateway'
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
  Filter,
} from 'lucide-react'

const projects = [
  { name: 'openclaw-command-center', type: 'react', lastModified: '刚刚', gitStatus: 'modified', description: 'OpenClaw 管理后台', deployed: false },
  { name: 'mimi-bit', type: 'python', lastModified: '2天前', gitStatus: 'clean', description: '量化交易系统', deployed: false },
  { name: 'fittrack', type: 'nextjs', lastModified: '5天前', gitStatus: 'clean', description: '健身追踪', deployed: true, deployUrl: 'fittrack.pages.dev' },
  { name: 'gemini-webapi-bridge', type: 'python', lastModified: '1周前', gitStatus: 'clean', description: 'Gemini 桥接器', deployed: false },
  { name: 'fast-browser-use', type: 'rust', lastModified: '2周前', gitStatus: 'clean', description: '浏览器自动化', deployed: false },
  { name: 'yugioh-deck', type: 'react', lastModified: '3周前', gitStatus: 'clean', description: '卡组分析器', deployed: true, deployUrl: 'yugioh.pages.dev' },
]

const typeConfig: Record<string, { icon: typeof Code; color: string; label: string }> = {
  react: { icon: Code, color: 'from-cyan-500/20 to-blue-500/20', label: 'React' },
  nextjs: { icon: Globe, color: 'from-gray-500/20 to-gray-600/20', label: 'Next.js' },
  python: { icon: Terminal, color: 'from-yellow-500/20 to-amber-500/20', label: 'Python' },
  rust: { icon: FileCode, color: 'from-orange-500/20 to-red-500/20', label: 'Rust' },
}

export function Projects() {
  useGatewayStore() // For future use
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const types = Object.keys(typeConfig)
  const filteredProjects = projects.filter((project) => {
    if (selectedType && project.type !== selectedType) return false
    if (searchQuery && !project.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const deployedCount = projects.filter((p) => p.deployed).length
  const modifiedCount = projects.filter((p) => p.gitStatus === 'modified').length

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">项目</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">本地项目管理</p>
        </div>
        <Button size="sm">
          <Plus className="size-4" />
          <span className="hidden sm:inline ml-1.5">新建</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
              <FolderOpen className="size-4 text-indigo-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-text-primary)] tabular-nums">{projects.length}</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">项目</p>
            </div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
              <Rocket className="size-4 text-green-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-text-primary)] tabular-nums">{deployedCount}</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">已部署</p>
            </div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center">
              <GitBranch className="size-4 text-yellow-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-text-primary)] tabular-nums">{modifiedCount}</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">修改</p>
            </div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
              <Code className="size-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-text-primary)] tabular-nums">{types.length}</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">语言</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
              <Globe className="size-4 text-pink-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--color-text-primary)] truncate">mimi-dev-lab</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">GitHub</p>
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
            placeholder="搜索项目..."
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
          {types.map((type) => {
            const config = typeConfig[type]
            return (
              <button
                key={type}
                onClick={() => setSelectedType(selectedType === type ? null : type)}
                className={cn(
                  'px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5',
                  selectedType === type
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
                )}
              >
                <config.icon className="size-3.5" />
                {config.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="sm:hidden flex flex-wrap gap-2">
          {types.map((type) => {
            const config = typeConfig[type]
            return (
              <button
                key={type}
                onClick={() => setSelectedType(selectedType === type ? null : type)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5',
                  selectedType === type
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
                )}
              >
                <config.icon className="size-3.5" />
                {config.label}
              </button>
            )
          })}
        </div>
      )}

      {/* Project List */}
      <div className="space-y-3">
        {filteredProjects.map((project) => {
          const config = typeConfig[project.type]
          return (
            <Card key={project.name} hover className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn('size-10 lg:size-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br', config.color)}>
                    <config.icon className="size-5 lg:size-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-[var(--color-text-primary)]">{project.name}</h3>
                      {project.deployed && (
                        <Badge variant="success" className="text-[10px]">
                          <Rocket className="size-2.5 mr-0.5" />
                          已部署
                        </Badge>
                      )}
                      {project.gitStatus === 'modified' && (
                        <Badge variant="warning" className="text-[10px]">修改</Badge>
                      )}
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{project.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-[var(--color-text-muted)] flex-wrap">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {project.lastModified}
                      </span>
                      <Badge variant="default" className="text-[10px]">{config.label}</Badge>
                    </div>
                    {project.deployed && project.deployUrl && (
                      <a
                        href={`https://${project.deployUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-xs text-[var(--color-accent)]"
                      >
                        <Globe className="size-3" />
                        {project.deployUrl}
                        <ExternalLink className="size-2.5" />
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
