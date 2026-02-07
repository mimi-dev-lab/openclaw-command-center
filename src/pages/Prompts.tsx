import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useGatewayStore } from '@/stores/gateway'
import { cn } from '@/lib/utils'
import {
  Search,
  Plus,
  Image,
  Code,
  FileText,
  MessageSquare,
  Copy,
  Edit,
  Star,
  TrendingUp,
  Play,
  Filter,
} from 'lucide-react'

const prompts = [
  { id: '1', name: '动漫角色', category: 'image', description: '动漫风格插画', uses: 156, starred: true, icon: Image },
  { id: '2', name: '产品照片', category: 'image', description: '专业产品摄影', uses: 89, starred: false, icon: Image },
  { id: '3', name: '代码审查', category: 'code', description: '全面代码审查', uses: 234, starred: true, icon: Code },
  { id: '4', name: '博客文章', category: 'text', description: 'SEO 优化博客', uses: 67, starred: false, icon: FileText },
  { id: '5', name: '聊天人设', category: 'chat', description: '自定义人格', uses: 45, starred: false, icon: MessageSquare },
  { id: '6', name: '信息图表', category: 'image', description: '数据可视化', uses: 34, starred: false, icon: Image },
]

const categoryConfig: Record<string, { color: string; label: string }> = {
  image: { color: 'from-pink-500/20 to-rose-500/20', label: '图片' },
  code: { color: 'from-green-500/20 to-emerald-500/20', label: '代码' },
  text: { color: 'from-blue-500/20 to-cyan-500/20', label: '文本' },
  chat: { color: 'from-purple-500/20 to-violet-500/20', label: '对话' },
}

export function Prompts() {
  useGatewayStore() // For future use
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showStarred, setShowStarred] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const categories = Object.keys(categoryConfig)
  const filteredPrompts = prompts.filter((prompt) => {
    if (selectedCategory && prompt.category !== selectedCategory) return false
    if (showStarred && !prompt.starred) return false
    if (searchQuery && !prompt.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const totalUses = prompts.reduce((sum, p) => sum + p.uses, 0)

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">提示词</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">管理提示词模板</p>
        </div>
        <Button size="sm">
          <Plus className="size-4" />
          <span className="hidden sm:inline ml-1.5">新建</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {categories.map((category) => {
          const config = categoryConfig[category]
          const count = prompts.filter((p) => p.category === category).length
          const Icon = prompts.find(p => p.category === category)?.icon || Image
          return (
            <Card key={category} className="p-3">
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
              <TrendingUp className="size-4 text-amber-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-text-primary)] tabular-nums">{totalUses}</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">使用</p>
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
            placeholder="搜索提示词..."
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
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowStarred(!showStarred)}
            className={cn(
              'px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5',
              showStarred ? 'bg-yellow-500/20 text-yellow-400' : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
            )}
          >
            <Star className={cn('size-4', showStarred && 'fill-current')} />
            <span className="hidden sm:inline">收藏</span>
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden px-3 py-2 rounded-xl bg-[var(--color-surface)] text-[var(--color-text-secondary)] flex items-center gap-1.5"
          >
            <Filter className="size-4" />
            筛选
          </button>
          <div className="hidden sm:flex items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                className={cn(
                  'px-3 py-2 rounded-xl text-sm font-medium transition-all',
                  selectedCategory === category
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
                )}
              >
                {categoryConfig[category].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="sm:hidden flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium',
                selectedCategory === category
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
              )}
            >
              {categoryConfig[category].label}
            </button>
          ))}
        </div>
      )}

      {/* Prompt List */}
      <div className="space-y-3">
        {filteredPrompts.map((prompt) => {
          const config = categoryConfig[prompt.category]
          return (
            <Card key={prompt.id} hover className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn('size-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br', config.color)}>
                    <prompt.icon className="size-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[var(--color-text-primary)]">{prompt.name}</h3>
                      {prompt.starred && <Star className="size-4 text-yellow-400 fill-current" />}
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{prompt.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-[var(--color-text-muted)]">
                      <Badge variant="default" className="text-[10px]">{config.label}</Badge>
                      <span className="flex items-center gap-1">
                        <Play className="size-3" />
                        {prompt.uses} 次
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button className="p-1.5 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
                      <Copy className="size-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
                      <Edit className="size-4" />
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
