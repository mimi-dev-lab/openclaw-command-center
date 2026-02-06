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
} from 'lucide-react'

// Mock skills data
const skills = [
  {
    name: 'github',
    description: '使用 gh CLI 与 GitHub 交互',
    location: '/opt/homebrew/lib/node_modules/openclaw/skills/github',
    enabled: true,
    category: '开发',
    icon: Code,
    uses: 234,
    trend: 12,
    source: 'builtin',
  },
  {
    name: 'image-generation',
    description: '🎨 图片生成统一入口！支持 API 和浏览器两种方式',
    location: '~/clawd/skills/image-generation',
    enabled: true,
    category: '创意',
    icon: Image,
    uses: 189,
    trend: 28,
    source: 'custom',
  },
  {
    name: 'gog',
    description: 'Google Workspace CLI (Gmail, Calendar, Drive)',
    location: '/opt/homebrew/lib/node_modules/openclaw/skills/gog',
    enabled: true,
    category: '效率',
    icon: Calendar,
    uses: 156,
    trend: -5,
    source: 'builtin',
  },
  {
    name: 'cloudflare',
    description: '管理 Cloudflare Workers, KV, D1, R2',
    location: '~/clawd/skills/wrangler',
    enabled: true,
    category: '基础设施',
    icon: Globe,
    uses: 98,
    trend: 15,
    source: 'custom',
  },
  {
    name: 'coding-agent',
    description: '运行 Claude Code 进行编程任务',
    location: '~/clawd/skills/coding-agent',
    enabled: true,
    category: '开发',
    icon: Terminal,
    uses: 145,
    trend: 32,
    source: 'custom',
  },
  {
    name: 'gemini-subagent',
    description: '通过 /gemini 命令调用 Gemini 完成特定任务',
    location: '~/clawd/skills/gemini-subagent',
    enabled: true,
    category: 'AI',
    icon: Zap,
    uses: 87,
    trend: 45,
    source: 'custom',
  },
  {
    name: 'hippocampus',
    description: 'AI Agent 的后台记忆器官',
    location: '~/clawd/skills/hippocampus-memory',
    enabled: true,
    category: '记忆',
    icon: Brain,
    uses: 312,
    trend: 8,
    source: 'custom',
  },
  {
    name: 'discord',
    description: 'Discord 消息发送和频道管理',
    location: '/opt/homebrew/lib/node_modules/openclaw/skills/discord',
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
  { id: '基础设施', label: '基础设施', count: 8 },
  { id: 'AI', label: 'AI', count: 5 },
  { id: '记忆', label: '记忆', count: 3 },
]

export function Skills() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredSkills = skills.filter((skill) => {
    if (selectedCategory !== 'all' && skill.category !== selectedCategory) return false
    if (searchQuery && !skill.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const totalUses = skills.reduce((sum, s) => sum + s.uses, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">技能库</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            管理已安装的技能和能力扩展
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <RefreshCw className="size-4 mr-2" />
            检查更新
          </Button>
          <Button size="sm">
            <Download className="size-4 mr-2" />
            安装技能
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
              <Zap className="size-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">62</p>
              <p className="text-sm text-[var(--color-text-muted)]">已安装技能</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
              <Play className="size-6 text-green-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">58</p>
              <p className="text-sm text-[var(--color-text-muted)]">已启用</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
              <Package className="size-6 text-blue-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">23</p>
              <p className="text-sm text-[var(--color-text-muted)]">来自 ClawdHub</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <TrendingUp className="size-6 text-amber-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--color-text-primary)] tabular-nums">{totalUses.toLocaleString()}</p>
              <p className="text-sm text-[var(--color-text-muted)]">总调用次数</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Categories */}
        <div className="lg:col-span-3">
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
                      'w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200',
                      'hover:bg-[var(--color-surface-hover)]',
                      selectedCategory === category.id &&
                        'bg-gradient-to-r from-indigo-500/10 to-purple-500/5 border-l-2 border-[var(--color-accent)]'
                    )}
                  >
                    <span className={cn(
                      'font-medium',
                      selectedCategory === category.id ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)]'
                    )}>
                      {category.label}
                    </span>
                    <span className={cn(
                      'text-sm px-2 py-0.5 rounded-md',
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
        <div className="lg:col-span-9 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="搜索技能..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'w-full pl-11 pr-4 py-3 rounded-xl',
                'bg-[var(--color-surface)] border border-[var(--color-border)]',
                'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
                'focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20'
              )}
            />
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 gap-4">
            {filteredSkills.map((skill) => (
              <Card key={skill.name} hover className="overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'size-12 rounded-xl flex items-center justify-center shrink-0',
                      'bg-gradient-to-br from-indigo-500/20 to-purple-500/20'
                    )}>
                      <skill.icon className="size-6 text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-[var(--color-text-primary)]">
                          {skill.name}
                        </p>
                        {skill.enabled ? (
                          <Badge variant="success" className="text-[10px]">启用</Badge>
                        ) : (
                          <Badge variant="default" className="text-[10px]">禁用</Badge>
                        )}
                        {skill.source === 'custom' && (
                          <Badge variant="info" className="text-[10px]">自定义</Badge>
                        )}
                      </div>
                      <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-2">
                        {skill.description}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                          <Play className="size-3" />
                          <span className="tabular-nums">{skill.uses}</span> 次调用
                        </div>
                        <div className={cn(
                          'flex items-center gap-1 text-xs font-medium',
                          skill.trend >= 0 ? 'text-green-400' : 'text-red-400'
                        )}>
                          <TrendingUp className={cn('size-3', skill.trend < 0 && 'rotate-180')} />
                          {skill.trend >= 0 ? '+' : ''}{skill.trend}%
                        </div>
                        <button className="ml-auto text-xs text-[var(--color-accent)] hover:underline flex items-center gap-1">
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
    </div>
  )
}
