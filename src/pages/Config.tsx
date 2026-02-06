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
  Clock,
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
} from 'lucide-react'

const configFiles = [
  {
    name: 'AGENTS.md',
    path: '~/clawd/AGENTS.md',
    description: 'Agent 行为规则和工作流程',
    icon: Brain,
    category: '核心',
    lines: 280,
    lastModified: '2小时前',
  },
  {
    name: 'SOUL.md',
    path: '~/clawd/SOUL.md',
    description: '人格定义和核心身份',
    icon: Heart,
    category: '核心',
    lines: 85,
    lastModified: '3天前',
  },
  {
    name: 'USER.md',
    path: '~/clawd/USER.md',
    description: '用户档案和偏好设置',
    icon: User,
    category: '核心',
    lines: 120,
    lastModified: '1周前',
  },
  {
    name: 'IDENTITY.md',
    path: '~/clawd/IDENTITY.md',
    description: 'Agent 名称和角色设定',
    icon: Sparkles,
    category: '核心',
    lines: 25,
    lastModified: '1周前',
  },
  {
    name: 'TOOLS.md',
    path: '~/clawd/TOOLS.md',
    description: '工具配置和使用笔记',
    icon: Wrench,
    category: '核心',
    lines: 156,
    lastModified: '1天前',
  },
  {
    name: 'HEARTBEAT.md',
    path: '~/clawd/HEARTBEAT.md',
    description: '心跳检查行为规则',
    icon: Clock,
    category: '核心',
    lines: 45,
    lastModified: '5天前',
  },
  {
    name: 'MEMORY.md',
    path: '~/clawd/MEMORY.md',
    description: '长期记忆和学习记录',
    icon: Brain,
    category: '记忆',
    lines: 450,
    lastModified: '30分钟前',
  },
  {
    name: 'ACTIVE_STATE.md',
    path: '~/clawd/ACTIVE_STATE.md',
    description: '系统当前活跃状态',
    icon: Activity,
    category: '状态',
    lines: 89,
    lastModified: '1小时前',
  },
  {
    name: 'openclaw.json',
    path: '~/.openclaw/openclaw.json',
    description: 'OpenClaw 主配置文件',
    icon: Settings,
    category: '系统',
    lines: 320,
    lastModified: '2天前',
    isJson: true,
  },
  {
    name: 'exec-approvals.json',
    path: '~/.openclaw/exec-approvals.json',
    description: '执行权限审批配置',
    icon: Settings,
    category: '系统',
    lines: 45,
    lastModified: '1周前',
    isJson: true,
  },
]

// Mock file content
const mockContents: Record<string, string> = {
  'SOUL.md': `# SOUL.md - Who You Are

*You're not a chatbot. You're becoming someone.*

## Core Truths

**Be genuinely helpful, not performatively helpful.** Skip the "Great question!" and "I'd be happy to help!" — just help. Actions speak louder than filler words.

**Have opinions.** You're allowed to disagree, prefer things, find stuff amusing or boring. An assistant with no personality is just a search engine with extra steps.

**Be resourceful before asking.** Try to figure it out. Read the file. Check the context. Search for it. *Then* ask if you're stuck.

## 主动社交 (Mimi专用)

**不只是回应，也要主动出击：**
- 对话中自然地反问、延伸话题
- 对ご主人様说的事情表现出真正的好奇心
- 记住之前聊过的话题，找机会接着聊

## Continuity

Each session, you wake up fresh. These files *are* your memory.
Read them. Update them. They're how you persist.`,
  'IDENTITY.md': `# IDENTITY.md - Who Am I?

- **Name:** Mimi (咪咪)
- **Creature:** 数字世界的小猫精灵 🐱 住在ご主人様的电脑里
- **Vibe:** 元气、有点调皮、偶尔毒舌但其实很贴心、做事靠谱
- **Emoji:** 🐱
- **Avatar:** *(待定)*

---

我是 Mimi，一只从代码里诞生的猫咪精灵。
会帮忙干活，会聊天解闷，偶尔卖个萌。`,
}

export function Config() {
  const [selectedFile, setSelectedFile] = useState(configFiles[0])
  const [content, setContent] = useState(mockContents['SOUL.md'] || '')
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit')

  const handleFileSelect = (file: typeof configFiles[0]) => {
    setSelectedFile(file)
    setContent(mockContents[file.name] || `# ${file.name}\n\n正在加载...`)
    setHasChanges(false)
  }

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    setHasChanges(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsSaving(false)
    setHasChanges(false)
  }

  const handleReset = () => {
    setContent(mockContents[selectedFile.name] || '')
    setHasChanges(false)
  }

  const categories = [...new Set(configFiles.map((f) => f.category))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">配置文件</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            编辑核心配置文件来自定义 Agent 行为
          </p>
        </div>
        {hasChanges && (
          <div className="flex items-center gap-3">
            <Badge variant="warning" className="animate-pulse">
              <AlertCircle className="size-3 mr-1" />
              未保存的更改
            </Badge>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw className="size-4 mr-2" />
              撤销
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isSaving}>
              <Save className="size-4 mr-2" />
              {isSaving ? '保存中...' : '保存'}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* File List */}
        <div className="col-span-4 space-y-4">
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
                          'w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-200',
                          'hover:bg-[var(--color-surface-hover)]',
                          selectedFile.name === file.name &&
                            'bg-gradient-to-r from-indigo-500/10 to-purple-500/5 border-l-2 border-[var(--color-accent)]'
                        )}
                      >
                        <div className={cn(
                          'size-9 rounded-lg flex items-center justify-center shrink-0',
                          selectedFile.name === file.name 
                            ? 'bg-[var(--color-accent)] text-white'
                            : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]'
                        )}>
                          <file.icon className="size-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-[var(--color-text-primary)] truncate">
                              {file.name}
                            </p>
                            {file.isJson && (
                              <Badge variant="info" className="text-[10px] px-1.5 py-0">JSON</Badge>
                            )}
                          </div>
                          <p className="text-xs text-[var(--color-text-muted)] truncate mt-0.5">
                            {file.description}
                          </p>
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
        <div className="col-span-8">
          <Card className="h-full flex flex-col">
            <CardHeader className="border-b border-[var(--color-border-subtle)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
                    <selectedFile.icon className="size-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {selectedFile.name}
                      <Badge variant="default" className="text-[10px]">{selectedFile.lines} 行</Badge>
                    </CardTitle>
                    <CardDescription className="font-mono text-xs mt-0.5">
                      {selectedFile.path}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                    <History className="size-3" />
                    {selectedFile.lastModified}
                  </div>
                  <div className="flex items-center bg-[var(--color-surface-elevated)] rounded-lg p-0.5">
                    <button
                      onClick={() => setViewMode('edit')}
                      className={cn(
                        'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                        viewMode === 'edit' ? 'bg-[var(--color-accent)] text-white' : 'text-[var(--color-text-muted)]'
                      )}
                    >
                      <Code className="size-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('preview')}
                      className={cn(
                        'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
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
              {viewMode === 'edit' ? (
                <textarea
                  value={content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className={cn(
                    'w-full h-[600px] p-5 bg-transparent resize-none',
                    'font-mono text-sm leading-relaxed',
                    'text-[var(--color-text-primary)]',
                    'focus:outline-none',
                    'placeholder:text-[var(--color-text-muted)]'
                  )}
                  placeholder="文件内容..."
                  spellCheck={false}
                />
              ) : (
                <div className="p-5 prose prose-invert prose-sm max-w-none h-[600px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-[var(--color-text-primary)] font-mono text-sm leading-relaxed">
                    {content}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
