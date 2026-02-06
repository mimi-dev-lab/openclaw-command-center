import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
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
  Eye,
  Play,
} from 'lucide-react'

// Mock prompts data
const prompts = [
  {
    id: '1',
    name: '动漫角色',
    category: 'image',
    description: '生成动漫风格的角色插画',
    template: 'A detailed anime character portrait, {{character_description}}, high quality, vibrant colors, studio lighting...',
    uses: 156,
    starred: true,
    tags: ['角色', '动漫', '插画'],
  },
  {
    id: '2',
    name: '产品照片',
    category: 'image',
    description: '专业产品摄影风格',
    template: 'Professional product photography of {{product}}, white background, soft shadows, commercial quality...',
    uses: 89,
    starred: false,
    tags: ['产品', '商业', '摄影'],
  },
  {
    id: '3',
    name: '代码审查',
    category: 'code',
    description: '全面的代码审查模板',
    template: 'Review the following code for: 1) Bugs and errors, 2) Performance issues, 3) Security vulnerabilities...',
    uses: 234,
    starred: true,
    tags: ['代码', '审查', '开发'],
  },
  {
    id: '4',
    name: '博客文章',
    category: 'text',
    description: 'SEO 优化的博客文章结构',
    template: 'Write a comprehensive blog post about {{topic}}. Include: Introduction, Key points, Examples...',
    uses: 67,
    starred: false,
    tags: ['写作', 'SEO', '博客'],
  },
  {
    id: '5',
    name: '聊天人设',
    category: 'chat',
    description: '自定义聊天人格模板',
    template: 'You are {{persona_name}}, a {{description}}. Your communication style is {{style}}...',
    uses: 45,
    starred: false,
    tags: ['人设', '角色扮演', '对话'],
  },
  {
    id: '6',
    name: '信息图表',
    category: 'image',
    description: '数据可视化信息图风格',
    template: 'Create an infographic about {{topic}}, clean modern design, data visualization...',
    uses: 34,
    starred: false,
    tags: ['数据', '可视化', '设计'],
  },
]

const categoryConfig: Record<string, { icon: typeof Image; color: string; gradient: string; label: string }> = {
  image: { icon: Image, color: 'text-pink-400', gradient: 'from-pink-500/20 to-rose-500/20', label: '图片' },
  code: { icon: Code, color: 'text-green-400', gradient: 'from-green-500/20 to-emerald-500/20', label: '代码' },
  text: { icon: FileText, color: 'text-blue-400', gradient: 'from-blue-500/20 to-cyan-500/20', label: '文本' },
  chat: { icon: MessageSquare, color: 'text-purple-400', gradient: 'from-purple-500/20 to-violet-500/20', label: '对话' },
}

export function Prompts() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showStarred, setShowStarred] = useState(false)

  const categories = Object.keys(categoryConfig)

  const filteredPrompts = prompts.filter((prompt) => {
    if (selectedCategory && prompt.category !== selectedCategory) return false
    if (showStarred && !prompt.starred) return false
    if (searchQuery && !prompt.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const totalUses = prompts.reduce((sum, p) => sum + p.uses, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">提示词</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            管理各类任务的提示词模板
          </p>
        </div>
        <Button size="sm">
          <Plus className="size-4 mr-2" />
          新建提示词
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => {
          const config = categoryConfig[category]
          const count = prompts.filter((p) => p.category === category).length
          return (
            <Card key={category} className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'size-11 rounded-xl flex items-center justify-center',
                    `bg-gradient-to-br ${config.gradient}`
                  )}
                >
                  <config.icon className={cn('size-5', config.color)} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">{count}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{config.label}</p>
                </div>
              </div>
            </Card>
          )
        })}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <TrendingUp className="size-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">{totalUses}</p>
              <p className="text-xs text-[var(--color-text-muted)]">总使用次数</p>
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
              placeholder="搜索提示词..."
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
            <button
              onClick={() => setShowStarred(!showStarred)}
              className={cn(
                'px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2',
                showStarred
                  ? 'bg-yellow-500/20 text-yellow-400 shadow-lg shadow-yellow-500/10'
                  : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
              )}
            >
              <Star className={cn('size-4', showStarred && 'fill-current')} />
              收藏
            </button>
            {categories.map((category) => {
              const config = categoryConfig[category]
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  className={cn(
                    'px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2',
                    selectedCategory === category
                      ? 'bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/25'
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

      {/* Prompt List */}
      <div className="grid grid-cols-2 gap-4">
        {filteredPrompts.map((prompt) => {
          const config = categoryConfig[prompt.category]
          return (
            <Card key={prompt.id} hover className="overflow-hidden group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'size-11 rounded-xl flex items-center justify-center shrink-0',
                        `bg-gradient-to-br ${config.gradient}`
                      )}
                    >
                      <config.icon className={cn('size-5', config.color)} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[var(--color-text-primary)]">
                          {prompt.name}
                        </h3>
                        {prompt.starred && (
                          <Star className="size-4 text-yellow-400 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
                        {prompt.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
                      <Eye className="size-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
                      <Copy className="size-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
                      <Edit className="size-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-[var(--color-surface-elevated)] font-mono text-xs text-[var(--color-text-secondary)] line-clamp-2 mb-3">
                  {prompt.template}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {prompt.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="default" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1">
                      <Play className="size-3" />
                      {prompt.uses} 次使用
                    </span>
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
