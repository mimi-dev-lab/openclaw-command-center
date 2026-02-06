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
} from 'lucide-react'

// Mock prompts data
const prompts = [
  {
    id: '1',
    name: 'Anime Character',
    category: 'image',
    description: 'Generate anime-style character illustrations',
    template: 'A detailed anime character portrait, {{character_description}}, high quality, vibrant colors, studio lighting...',
    uses: 156,
    starred: true,
  },
  {
    id: '2',
    name: 'Product Photo',
    category: 'image',
    description: 'Professional product photography style',
    template: 'Professional product photography of {{product}}, white background, soft shadows, commercial quality...',
    uses: 89,
    starred: false,
  },
  {
    id: '3',
    name: 'Code Review',
    category: 'code',
    description: 'Comprehensive code review template',
    template: 'Review the following code for: 1) Bugs and errors, 2) Performance issues, 3) Security vulnerabilities...',
    uses: 234,
    starred: true,
  },
  {
    id: '4',
    name: 'Blog Post',
    category: 'text',
    description: 'SEO-optimized blog post structure',
    template: 'Write a comprehensive blog post about {{topic}}. Include: Introduction, Key points, Examples...',
    uses: 67,
    starred: false,
  },
  {
    id: '5',
    name: 'Chat Persona',
    category: 'chat',
    description: 'Custom chat personality template',
    template: 'You are {{persona_name}}, a {{description}}. Your communication style is {{style}}...',
    uses: 45,
    starred: false,
  },
  {
    id: '6',
    name: 'Infographic',
    category: 'image',
    description: 'Data visualization infographic style',
    template: 'Create an infographic about {{topic}}, clean modern design, data visualization...',
    uses: 34,
    starred: false,
  },
]

const categoryIcons: Record<string, typeof Image> = {
  image: Image,
  code: Code,
  text: FileText,
  chat: MessageSquare,
}

const categoryColors: Record<string, string> = {
  image: 'text-pink-400 bg-pink-500/10',
  code: 'text-green-400 bg-green-500/10',
  text: 'text-blue-400 bg-blue-500/10',
  chat: 'text-purple-400 bg-purple-500/10',
}

export function Prompts() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showStarred, setShowStarred] = useState(false)

  const categories = ['image', 'code', 'text', 'chat']

  const filteredPrompts = prompts.filter((prompt) => {
    if (selectedCategory && prompt.category !== selectedCategory) return false
    if (showStarred && !prompt.starred) return false
    if (searchQuery && !prompt.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Prompts</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Manage prompt templates for various tasks
          </p>
        </div>
        <Button size="sm">
          <Plus className="size-4 mr-2" />
          New Prompt
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        {categories.map((category) => {
          const Icon = categoryIcons[category]
          const count = prompts.filter((p) => p.category === category).length
          return (
            <Card key={category} className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'size-10 rounded-lg flex items-center justify-center',
                    categoryColors[category]
                  )}
                >
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[var(--color-text-primary)]">{count}</p>
                  <p className="text-sm text-[var(--color-text-muted)] capitalize">{category}</p>
                </div>
              </div>
            </Card>
          )
        })}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Star className="size-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {prompts.filter((p) => p.starred).length}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Starred</p>
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
              placeholder="Search prompts..."
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
            <button
              onClick={() => setShowStarred(!showStarred)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2',
                showStarred
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
              )}
            >
              <Star className="size-4" />
              Starred
            </button>
            {categories.map((category) => {
              const Icon = categoryIcons[category]
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 capitalize',
                    selectedCategory === category
                      ? 'bg-[var(--color-accent)] text-white'
                      : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
                  )}
                >
                  <Icon className="size-4" />
                  {category}
                </button>
              )
            })}
          </div>
        </div>
      </Card>

      {/* Prompt List */}
      <div className="grid grid-cols-2 gap-4">
        {filteredPrompts.map((prompt) => {
          const Icon = categoryIcons[prompt.category]
          return (
            <Card key={prompt.id} hover>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'size-10 rounded-lg flex items-center justify-center shrink-0',
                        categoryColors[prompt.category]
                      )}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[var(--color-text-primary)]">
                          {prompt.name}
                        </h3>
                        {prompt.starred && <Star className="size-4 text-yellow-400 fill-current" />}
                      </div>
                      <p className="text-sm text-[var(--color-text-muted)] mt-1">
                        {prompt.description}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <Badge variant="default" className="capitalize">
                          {prompt.category}
                        </Badge>
                        <span className="text-xs text-[var(--color-text-muted)]">
                          Used {prompt.uses} times
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-2 rounded-lg hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]">
                      <Copy className="size-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]">
                      <Edit className="size-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-[var(--color-surface-elevated)] font-mono text-xs text-[var(--color-text-secondary)] line-clamp-2">
                  {prompt.template}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
