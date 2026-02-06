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
  Star,
  Code,
  Image,
  Calendar,
  MessageSquare,
  Database,
  Terminal,
} from 'lucide-react'

// Mock skills data
const skills = [
  {
    name: 'github',
    description: 'Interact with GitHub using the gh CLI',
    location: '/opt/homebrew/lib/node_modules/openclaw/skills/github',
    enabled: true,
    category: 'Development',
    icon: Code,
  },
  {
    name: 'image-generation',
    description: '🎨 图片生成统一入口！支持 API 和浏览器两种方式',
    location: '~/clawd/skills/image-generation',
    enabled: true,
    category: 'Creative',
    icon: Image,
  },
  {
    name: 'gog',
    description: 'Google Workspace CLI for Gmail, Calendar, Drive',
    location: '/opt/homebrew/lib/node_modules/openclaw/skills/gog',
    enabled: true,
    category: 'Productivity',
    icon: Calendar,
  },
  {
    name: 'discord',
    description: 'Discord messaging and channel management',
    location: '/opt/homebrew/lib/node_modules/openclaw/skills/discord',
    enabled: true,
    category: 'Communication',
    icon: MessageSquare,
  },
  {
    name: 'cloudflare',
    description: 'Manage Cloudflare Workers, KV, D1, R2',
    location: '~/clawd/skills/wrangler',
    enabled: true,
    category: 'Infrastructure',
    icon: Database,
  },
  {
    name: 'coding-agent',
    description: 'Run Codex CLI, Claude Code for programmatic control',
    location: '~/clawd/skills/coding-agent',
    enabled: true,
    category: 'Development',
    icon: Terminal,
  },
  {
    name: 'gemini-subagent',
    description: '通过 /gemini 命令调用 Gemini 完成特定任务',
    location: '~/clawd/skills/gemini-subagent',
    enabled: true,
    category: 'AI',
    icon: Zap,
  },
  {
    name: 'hippocampus',
    description: 'Background memory organ for AI agents',
    location: '~/clawd/skills/hippocampus-memory',
    enabled: true,
    category: 'Memory',
    icon: Zap,
  },
]

const categories = [
  { id: 'all', label: 'All', count: 62 },
  { id: 'Development', label: 'Development', count: 12 },
  { id: 'Creative', label: 'Creative', count: 8 },
  { id: 'Productivity', label: 'Productivity', count: 10 },
  { id: 'Communication', label: 'Communication', count: 6 },
  { id: 'Infrastructure', label: 'Infrastructure', count: 8 },
  { id: 'AI', label: 'AI', count: 5 },
  { id: 'Memory', label: 'Memory', count: 3 },
]

export function Skills() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredSkills = skills.filter((skill) => {
    if (selectedCategory !== 'all' && skill.category !== selectedCategory) return false
    if (searchQuery && !skill.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Skills</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Manage installed skills and capabilities
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <RefreshCw className="size-4 mr-2" />
            Check Updates
          </Button>
          <Button size="sm">
            <Download className="size-4 mr-2" />
            Install Skill
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-[var(--color-accent-subtle)] flex items-center justify-center">
              <Zap className="size-5 text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">62</p>
              <p className="text-sm text-[var(--color-text-muted)]">Total Skills</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Zap className="size-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">58</p>
              <p className="text-sm text-[var(--color-text-muted)]">Enabled</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Download className="size-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">23</p>
              <p className="text-sm text-[var(--color-text-muted)]">From ClawdHub</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Star className="size-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">15</p>
              <p className="text-sm text-[var(--color-text-muted)]">Custom Skills</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Categories */}
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--color-border-subtle)]">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-3 text-left transition-colors',
                      'hover:bg-[var(--color-surface-hover)]',
                      selectedCategory === category.id &&
                        'bg-[var(--color-accent-subtle)] border-l-2 border-[var(--color-accent)]'
                    )}
                  >
                    <span className="font-medium text-[var(--color-text-primary)]">
                      {category.label}
                    </span>
                    <span className="text-sm text-[var(--color-text-muted)]">{category.count}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skill List */}
        <div className="col-span-9 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'w-full pl-10 pr-4 py-2.5 rounded-lg',
                'bg-[var(--color-surface)] border border-[var(--color-border)]',
                'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
                'focus:outline-none focus:border-[var(--color-accent)]'
              )}
            />
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 gap-4">
            {filteredSkills.map((skill) => (
              <Card key={skill.name} hover>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-lg bg-[var(--color-surface-elevated)] flex items-center justify-center shrink-0">
                      <skill.icon className="size-5 text-[var(--color-accent)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-[var(--color-text-primary)]">
                          {skill.name}
                        </p>
                        {skill.enabled ? (
                          <Badge variant="success">Enabled</Badge>
                        ) : (
                          <Badge variant="default">Disabled</Badge>
                        )}
                      </div>
                      <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-2">
                        {skill.description}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <Badge variant="default">{skill.category}</Badge>
                        <button className="text-xs text-[var(--color-accent)] hover:underline flex items-center gap-1">
                          <Settings className="size-3" />
                          Configure
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
