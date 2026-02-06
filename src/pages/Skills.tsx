import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import {
  Zap,
  Search,
  Download,
  RefreshCw,
  Settings,
  Code,
  Image,
  Calendar,
  MessageSquare,
  Terminal,
  Globe,
  Brain,
  TrendingUp,
  Package,
  Play,
  Filter,
} from 'lucide-react'

const skills = [
  {
    name: 'github',
    description: '使用 gh CLI 与 GitHub 交互',
    enabled: true,
    category: '开发',
    icon: Code,
    uses: 234,
    trend: 12,
    source: 'builtin',
  },
  {
    name: 'image-generation',
    description: '🎨 图片生成统一入口',
    enabled: true,
    category: '创意',
    icon: Image,
    uses: 189,
    trend: 28,
    source: 'custom',
  },
  {
    name: 'gog',
    description: 'Google Workspace CLI',
    enabled: true,
    category: '效率',
    icon: Calendar,
    uses: 156,
    trend: -5,
    source: 'builtin',
  },
  {
    name: 'cloudflare',
    description: '管理 Workers, KV, D1',
    enabled: true,
    category: '基础设施',
    icon: Globe,
    uses: 98,
    trend: 15,
    source: 'custom',
  },
  {
    name: 'coding-agent',
    description: '运行 Claude Code',
    enabled: true,
    category: '开发',
    icon: Terminal,
    uses: 145,
    trend: 32,
    source: 'custom',
  },
  {
    name: 'gemini-subagent',
    description: '调用 Gemini 任务',
    enabled: true,
    category: 'AI',
    icon: Zap,
    uses: 87,
    trend: 45,
    source: 'custom',
  },
  {
    name: 'hippocampus',
    description: 'AI 记忆器官',
    enabled: true,
    category: '记忆',
    icon: Brain,
    uses: 312,
    trend: 8,
    source: 'custom',
  },
  {
    name: 'discord',
    description: 'Discord 消息管理',
    enabled: true,
    category: '通讯',
    icon: MessageSquare,
    uses: 567,
    trend: 3,
    source: 'builtin',
  },
]

const categories = [
  { id: 'all', label: '全部', count: 62 },
  { id: '开发', label: '开发', count: 12 },
  { id: '创意', label: '创意', count: 8 },
  { id: '效率', label: '效率', count: 10 },
  { id: '通讯', label: '通讯', count: 6 },
  { id: 'AI', label: 'AI', count: 5 },
]

export function Skills() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const filteredSkills = skills.filter((skill) => {
    if (selectedCategory !== 'all' && skill.category !== selectedCategory) return false
    if (searchQuery && !skill.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const totalUses = skills.reduce((sum, s) => sum + s.uses, 0)

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">技能库</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">管理已安装技能</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <RefreshCw className="size-4" />
            <span className="hidden sm:inline ml-1.5">检查更新</span>
          </Button>
          <Button size="sm">
            <Download className="size-4" />
            <span className="hidden sm:inline ml-1.5">安装</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
              <Zap className="size-5 lg:size-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">62</p>
              <p className="text-xs text-[var(--color-text-muted)]">已安装</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
              <Play className="size-5 lg:size-6 text-green-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">58</p>
              <p className="text-xs text-[var(--color-text-muted)]">已启用</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
              <Package className="size-5 lg:size-6 text-blue-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">23</p>
              <p className="text-xs text-[var(--color-text-muted)]">ClawdHub</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <TrendingUp className="size-5 lg:size-6 text-amber-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{totalUses.toLocaleString()}</p>
              <p className="text-xs text-[var(--color-text-muted)]">总调用</p>
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
            placeholder="搜索技能..."
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
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="sm:hidden flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                selectedCategory === category.id
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
              )}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        {/* Desktop Categories */}
        <div className="hidden lg:block lg:col-span-3">
          <Card>
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-sm text-[var(--color-text-muted)]">分类</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--color-border-subtle)]">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-3 text-left transition-all',
                      'hover:bg-[var(--color-surface-hover)]',
                      selectedCategory === category.id &&
                        'bg-gradient-to-r from-indigo-500/10 to-purple-500/5 border-l-2 border-[var(--color-accent)]'
                    )}
                  >
                    <span className={cn(
                      'font-medium text-sm',
                      selectedCategory === category.id ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)]'
                    )}>
                      {category.label}
                    </span>
                    <span className={cn(
                      'text-xs px-2 py-0.5 rounded-md',
                      selectedCategory === category.id 
                        ? 'bg-[var(--color-accent)] text-white'
                        : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]'
                    )}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skill List */}
        <div className="lg:col-span-9 space-y-3">
          {filteredSkills.map((skill) => (
            <Card key={skill.name} hover className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center shrink-0">
                    <skill.icon className="size-5 lg:size-6 text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-[var(--color-text-primary)]">{skill.name}</p>
                      {skill.enabled && <Badge variant="success" className="text-[10px]">启用</Badge>}
                      {skill.source === 'custom' && <Badge variant="info" className="text-[10px]">自定义</Badge>}
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] mt-0.5 line-clamp-1">
                      {skill.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                      <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                        <Play className="size-3" />
                        {skill.uses} 次
                      </span>
                      <span className={cn(
                        'text-xs font-medium flex items-center gap-0.5',
                        skill.trend >= 0 ? 'text-green-400' : 'text-red-400'
                      )}>
                        <TrendingUp className={cn('size-3', skill.trend < 0 && 'rotate-180')} />
                        {skill.trend >= 0 ? '+' : ''}{skill.trend}%
                      </span>
                      <button className="text-xs text-[var(--color-accent)] flex items-center gap-1">
                        <Settings className="size-3" />
                        配置
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
