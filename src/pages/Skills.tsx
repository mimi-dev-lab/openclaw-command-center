import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useGatewayStore } from '@/stores/gateway'
import { cn } from '@/lib/utils'
import {
  Zap,
  Search,
  Download,
  RefreshCw,
  Code,
  Image,
  Calendar,
  Terminal,
  Globe,
  Brain,
  TrendingUp,
  Package,
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight,
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
    uses: 89,
    trend: 15,
    source: 'builtin',
  },
  {
    name: 'stock-analysis',
    description: '股票分析和投资组合',
    enabled: true,
    category: '金融',
    icon: TrendingUp,
    uses: 67,
    trend: 45,
    source: 'custom',
  },
  {
    name: 'hippocampus',
    description: '长期记忆系统',
    enabled: true,
    category: '核心',
    icon: Brain,
    uses: 1247,
    trend: 8,
    source: 'custom',
  },
  {
    name: 'coding-agent',
    description: '运行 Claude Code / Codex',
    enabled: true,
    category: '开发',
    icon: Terminal,
    uses: 45,
    trend: 0,
    source: 'custom',
  },
  {
    name: 'remind-me',
    description: '自然语言设置提醒',
    enabled: true,
    category: '效率',
    icon: Calendar,
    uses: 123,
    trend: 5,
    source: 'custom',
  },
]

const categories = ['全部', '核心', '开发', '效率', '创意', '金融', '基础设施']

export function Skills() {
  useGatewayStore() // For future use
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [selectedSkill, setSelectedSkill] = useState<typeof skills[0] | null>(null)

  const filteredSkills = skills.filter((skill) => {
    if (selectedCategory !== '全部' && skill.category !== selectedCategory) return false
    if (searchQuery && !skill.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const stats = {
    total: skills.length,
    enabled: skills.filter(s => s.enabled).length,
    builtin: skills.filter(s => s.source === 'builtin').length,
    custom: skills.filter(s => s.source === 'custom').length,
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">技能</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">浏览和管理 Skills</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" disabled>
            <RefreshCw className="size-4" />
          </Button>
          <Button size="sm" disabled>
            <Download className="size-4" />
            <span className="hidden sm:inline ml-1.5">安装</span>
          </Button>
        </div>
      </div>

      {/* Info Card */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
              <Package className="size-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-blue-400">Skill 市场</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                当前显示已安装的 Skills。访问 ClawdHub 安装更多 Skills。
              </p>
            </div>
            <a 
              href="https://clawdhub.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              <ExternalLink className="size-4" />
              ClawdHub
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
              <Zap className="size-5 lg:size-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{stats.total}</p>
              <p className="text-xs text-[var(--color-text-muted)]">已安装</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
              <Zap className="size-5 lg:size-6 text-green-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{stats.enabled}</p>
              <p className="text-xs text-[var(--color-text-muted)]">启用</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
              <Package className="size-5 lg:size-6 text-blue-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{stats.builtin}</p>
              <p className="text-xs text-[var(--color-text-muted)]">内置</p>
            </div>
          </div>
        </Card>
        <Card className="p-3 lg:p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 lg:size-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <Code className="size-5 lg:size-6 text-amber-400" />
            </div>
            <div>
              <p className="text-xl lg:text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{stats.custom}</p>
              <p className="text-xs text-[var(--color-text-muted)]">自定义</p>
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
            placeholder="搜索 Skills..."
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
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
                selectedCategory === cat
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <Card 
            key={skill.name}
            className={cn(
              'overflow-hidden cursor-pointer transition-all hover:border-[var(--color-accent)]/50',
              selectedSkill?.name === skill.name && 'border-[var(--color-accent)]'
            )}
            onClick={() => setSelectedSkill(skill)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={cn(
                  'size-11 rounded-xl flex items-center justify-center shrink-0',
                  skill.enabled 
                    ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20' 
                    : 'bg-[var(--color-surface-elevated)]'
                )}>
                  <skill.icon className={cn(
                    'size-5',
                    skill.enabled ? 'text-indigo-400' : 'text-[var(--color-text-muted)]'
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-[var(--color-text-primary)] truncate">
                      {skill.name}
                    </h3>
                    <Badge 
                      variant={skill.source === 'builtin' ? 'info' : 'default'} 
                      className="text-[10px] shrink-0"
                    >
                      {skill.source === 'builtin' ? '内置' : '自定义'}
                    </Badge>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-2">
                    {skill.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-border-subtle)]">
                <span className="text-xs text-[var(--color-text-muted)]">
                  {skill.uses} 次使用
                </span>
                <div className={cn(
                  'flex items-center gap-0.5 text-xs font-medium',
                  skill.trend >= 0 ? 'text-green-400' : 'text-red-400'
                )}>
                  {skill.trend >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                  {Math.abs(skill.trend)}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <Zap className="size-12 text-[var(--color-text-muted)] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">
              没有匹配的 Skills
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              尝试调整搜索条件或分类筛选
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
