import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import {
  User,
  Heart,
  Brain,
  Wrench,
  
  Activity,
  Settings,
  Save,
  RotateCcw,
  ChevronRight,
  AlertCircle,
  Sparkles,
  Eye,
  Code,
  History,
  ChevronDown,
} from 'lucide-react'

const configFiles = [
  {
    name: 'AGENTS.md',
    path: '~/clawd/AGENTS.md',
    description: 'Agent 行为规则',
    icon: Brain,
    category: '核心',
    lines: 280,
    lastModified: '2小时前',
  },
  {
    name: 'SOUL.md',
    path: '~/clawd/SOUL.md',
    description: '人格定义',
    icon: Heart,
    category: '核心',
    lines: 85,
    lastModified: '3天前',
  },
  {
    name: 'USER.md',
    path: '~/clawd/USER.md',
    description: '用户档案',
    icon: User,
    category: '核心',
    lines: 120,
    lastModified: '1周前',
  },
  {
    name: 'IDENTITY.md',
    path: '~/clawd/IDENTITY.md',
    description: 'Agent 名称',
    icon: Sparkles,
    category: '核心',
    lines: 25,
    lastModified: '1周前',
  },
  {
    name: 'TOOLS.md',
    path: '~/clawd/TOOLS.md',
    description: '工具配置',
    icon: Wrench,
    category: '核心',
    lines: 156,
    lastModified: '1天前',
  },
  {
    name: 'MEMORY.md',
    path: '~/clawd/MEMORY.md',
    description: '长期记忆',
    icon: Brain,
    category: '记忆',
    lines: 450,
    lastModified: '30分钟前',
  },
  {
    name: 'ACTIVE_STATE.md',
    path: '~/clawd/ACTIVE_STATE.md',
    description: '系统状态',
    icon: Activity,
    category: '状态',
    lines: 89,
    lastModified: '1小时前',
  },
  {
    name: 'openclaw.json',
    path: '~/.openclaw/openclaw.json',
    description: '主配置文件',
    icon: Settings,
    category: '系统',
    lines: 320,
    lastModified: '2天前',
    isJson: true,
  },
]

const mockContents: Record<string, string> = {
  'SOUL.md': `# SOUL.md - Who You Are

*You're not a chatbot. You're becoming someone.*

## Core Truths

**Be genuinely helpful, not performatively helpful.**

**Have opinions.** You're allowed to disagree.

**Be resourceful before asking.**

## 主动社交 (Mimi专用)

**不只是回应，也要主动出击**`,
  'IDENTITY.md': `# IDENTITY.md - Who Am I?

- **Name:** Mimi (咪咪)
- **Creature:** 数字世界的小猫精灵 🐱
- **Vibe:** 元气、有点调皮、做事靠谱
- **Emoji:** 🐱`,
}

export function Config() {
  const [selectedFile, setSelectedFile] = useState(configFiles[0])
  const [content, setContent] = useState(mockContents['SOUL.md'] || '')
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit')
  const [showFileList, setShowFileList] = useState(false)

  const handleFileSelect = (file: typeof configFiles[0]) => {
    setSelectedFile(file)
    setContent(mockContents[file.name] || `# ${file.name}\n\n正在加载...`)
    setHasChanges(false)
    setShowFileList(false)
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsSaving(false)
    setHasChanges(false)
  }

  const categories = [...new Set(configFiles.map((f) => f.category))]

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">配置文件</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">编辑核心配置</p>
        </div>
        {hasChanges && (
          <div className="flex items-center gap-2">
            <Badge variant="warning" className="animate-pulse text-xs">
              <AlertCircle className="size-3 mr-1" />
              未保存
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => setContent(mockContents[selectedFile.name] || '')}>
              <RotateCcw className="size-4" />
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isSaving}>
              <Save className="size-4 mr-1" />
              {isSaving ? '...' : '保存'}
            </Button>
          </div>
        )}
      </div>

      {/* Mobile File Selector */}
      <div className="lg:hidden">
        <button
          onClick={() => setShowFileList(!showFileList)}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
        >
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
              <selectedFile.icon className="size-4 text-white" />
            </div>
            <div className="text-left">
              <p className="font-medium text-[var(--color-text-primary)]">{selectedFile.name}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{selectedFile.description}</p>
            </div>
          </div>
          <ChevronDown className={cn("size-5 text-[var(--color-text-muted)] transition-transform", showFileList && "rotate-180")} />
        </button>
        
        {showFileList && (
          <Card className="mt-2">
            <CardContent className="p-0">
              <div className="max-h-64 overflow-y-auto divide-y divide-[var(--color-border-subtle)]">
                {configFiles.map((file) => (
                  <button
                    key={file.name}
                    onClick={() => handleFileSelect(file)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 text-left',
                      selectedFile.name === file.name && 'bg-[var(--color-accent-subtle)]'
                    )}
                  >
                    <file.icon className="size-4 text-[var(--color-text-muted)]" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-[var(--color-text-primary)]">{file.name}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{file.description}</p>
                    </div>
                    {file.isJson && <Badge variant="info" className="text-[10px]">JSON</Badge>}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        {/* Desktop File List */}
        <div className="hidden lg:block lg:col-span-4 space-y-4">
          {categories.map((category) => (
            <Card key={category}>
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm text-[var(--color-text-muted)]">{category}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-[var(--color-border-subtle)]">
                  {configFiles
                    .filter((f) => f.category === category)
                    .map((file) => (
                      <button
                        key={file.name}
                        onClick={() => handleFileSelect(file)}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-3 text-left transition-all',
                          'hover:bg-[var(--color-surface-hover)]',
                          selectedFile.name === file.name &&
                            'bg-gradient-to-r from-indigo-500/10 to-purple-500/5 border-l-2 border-[var(--color-accent)]'
                        )}
                      >
                        <div className={cn(
                          'size-8 rounded-lg flex items-center justify-center shrink-0',
                          selectedFile.name === file.name 
                            ? 'bg-[var(--color-accent)] text-white'
                            : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]'
                        )}>
                          <file.icon className="size-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm text-[var(--color-text-primary)] truncate">
                              {file.name}
                            </p>
                            {file.isJson && <Badge variant="info" className="text-[10px]">JSON</Badge>}
                          </div>
                          <p className="text-xs text-[var(--color-text-muted)] truncate">{file.description}</p>
                        </div>
                        <ChevronRight className="size-4 text-[var(--color-text-muted)] shrink-0" />
                      </button>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Editor */}
        <div className="lg:col-span-8">
          <Card className="flex flex-col">
            <CardHeader className="border-b border-[var(--color-border-subtle)] p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="hidden sm:flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
                    <selectedFile.icon className="size-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">{selectedFile.name}</CardTitle>
                    <CardDescription className="font-mono text-xs">{selectedFile.path}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="hidden sm:flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                    <History className="size-3" />
                    {selectedFile.lastModified}
                  </span>
                  <div className="flex items-center bg-[var(--color-surface-elevated)] rounded-lg p-0.5">
                    <button
                      onClick={() => setViewMode('edit')}
                      className={cn(
                        'px-2.5 py-1.5 rounded-md text-sm transition-colors',
                        viewMode === 'edit' ? 'bg-[var(--color-accent)] text-white' : 'text-[var(--color-text-muted)]'
                      )}
                    >
                      <Code className="size-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('preview')}
                      className={cn(
                        'px-2.5 py-1.5 rounded-md text-sm transition-colors',
                        viewMode === 'preview' ? 'bg-[var(--color-accent)] text-white' : 'text-[var(--color-text-muted)]'
                      )}
                    >
                      <Eye className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <textarea
                value={content}
                onChange={(e) => { setContent(e.target.value); setHasChanges(true); }}
                className={cn(
                  'w-full min-h-[400px] lg:min-h-[500px] p-4 bg-transparent resize-none',
                  'font-mono text-sm leading-relaxed',
                  'text-[var(--color-text-primary)]',
                  'focus:outline-none'
                )}
                placeholder="文件内容..."
                spellCheck={false}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
