import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useGatewayStore } from '@/stores/gateway'
import { cn } from '@/lib/utils'
import {
  User,
  Heart,
  Brain,
  Wrench,
  Activity,
  Settings,
  Save,
  ChevronRight,
  Eye,
  Code,
  FileText,
  ExternalLink,
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
    name: 'TOOLS.md',
    path: '~/clawd/TOOLS.md',
    description: '工具配置',
    icon: Wrench,
    category: '核心',
    lines: 95,
    lastModified: '2天前',
  },
  {
    name: 'HEARTBEAT.md',
    path: '~/clawd/HEARTBEAT.md',
    description: '心跳任务',
    icon: Activity,
    category: '自动化',
    lines: 45,
    lastModified: '5天前',
  },
  {
    name: 'openclaw.json',
    path: '~/.openclaw/openclaw.json',
    description: 'Gateway 配置',
    icon: Settings,
    category: '系统',
    lines: 200,
    lastModified: '1小时前',
  },
]

const categories = ['全部', '核心', '自动化', '系统']

export function Config() {
  const { isConnected } = useGatewayStore()
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [selectedFile, setSelectedFile] = useState<typeof configFiles[0] | null>(null)
  const [viewMode, setViewMode] = useState<'preview' | 'edit'>('preview')

  const filteredFiles = selectedCategory === '全部'
    ? configFiles
    : configFiles.filter(f => f.category === selectedCategory)

  // Mock content for demo
  const mockContent = `# ${selectedFile?.name || 'Config'}

这是配置文件的预览内容。

## 功能说明

在完整版本中，这里会显示实际的文件内容。

## 注意事项

- 文件访问需要本地代理
- 编辑后需要手动保存
`

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">配置</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">核心配置文件</p>
        </div>
        <div className="flex items-center gap-2">
          {selectedFile && (
            <>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setViewMode(viewMode === 'preview' ? 'edit' : 'preview')}
              >
                {viewMode === 'preview' ? <Code className="size-4" /> : <Eye className="size-4" />}
                <span className="hidden sm:inline ml-1.5">{viewMode === 'preview' ? '编辑' : '预览'}</span>
              </Button>
              <Button size="sm" disabled>
                <Save className="size-4" />
                <span className="hidden sm:inline ml-1.5">保存</span>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Local Mode Notice */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
              <FileText className="size-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-blue-400">本地文件预览</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                当前显示的是示例数据。文件编辑功能需要本地代理支持。
                {isConnected && ' Gateway 已连接，但文件系统访问需要额外配置。'}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0" disabled>
              <ExternalLink className="size-4 mr-1.5" />
              配置代理
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
              selectedCategory === cat
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* File List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">配置文件</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {filteredFiles.map((file) => (
                <button
                  key={file.name}
                  onClick={() => setSelectedFile(file)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 text-left transition-all',
                    'hover:bg-[var(--color-surface-hover)]',
                    selectedFile?.name === file.name && 'bg-[var(--color-accent)]/10 border-l-2 border-[var(--color-accent)]'
                  )}
                >
                  <div className={cn(
                    'size-9 rounded-lg flex items-center justify-center shrink-0',
                    selectedFile?.name === file.name 
                      ? 'bg-[var(--color-accent)]/20' 
                      : 'bg-[var(--color-surface-elevated)]'
                  )}>
                    <file.icon className={cn(
                      'size-4',
                      selectedFile?.name === file.name 
                        ? 'text-[var(--color-accent)]' 
                        : 'text-[var(--color-text-muted)]'
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-[var(--color-text-primary)] truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] truncate">
                      {file.description}
                    </p>
                  </div>
                  <ChevronRight className="size-4 text-[var(--color-text-muted)] shrink-0" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Editor/Preview */}
        <Card className="lg:col-span-2">
          {selectedFile ? (
            <>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <selectedFile.icon className="size-4 text-[var(--color-accent)]" />
                    {selectedFile.name}
                  </CardTitle>
                  <CardDescription className="text-xs mt-1">
                    {selectedFile.path} • {selectedFile.lines} 行 • {selectedFile.lastModified}
                  </CardDescription>
                </div>
                <Badge variant="default">{selectedFile.category}</Badge>
              </CardHeader>
              <CardContent>
                {viewMode === 'preview' ? (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <pre className="bg-[var(--color-surface-elevated)] p-4 rounded-lg text-xs overflow-x-auto">
                      {mockContent}
                    </pre>
                  </div>
                ) : (
                  <textarea
                    value={mockContent}
                    readOnly
                    className={cn(
                      'w-full h-80 p-4 rounded-lg font-mono text-xs',
                      'bg-[var(--color-surface-elevated)] border border-[var(--color-border)]',
                      'text-[var(--color-text-primary)]',
                      'focus:outline-none focus:border-[var(--color-accent)]',
                      'resize-y'
                    )}
                  />
                )}
              </CardContent>
            </>
          ) : (
            <CardContent className="p-8 text-center">
              <FileText className="size-12 text-[var(--color-text-muted)] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">
                选择文件
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                从左侧列表选择一个配置文件查看
              </p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
