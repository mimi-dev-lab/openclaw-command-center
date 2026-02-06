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
} from 'lucide-react'

const configFiles = [
  {
    name: 'AGENTS.md',
    path: '~/clawd/AGENTS.md',
    description: 'Agent behavior rules and workflows',
    icon: Brain,
    category: 'Core',
  },
  {
    name: 'SOUL.md',
    path: '~/clawd/SOUL.md',
    description: 'Personality and core identity',
    icon: Heart,
    category: 'Core',
  },
  {
    name: 'USER.md',
    path: '~/clawd/USER.md',
    description: 'User profile and preferences',
    icon: User,
    category: 'Core',
  },
  {
    name: 'IDENTITY.md',
    path: '~/clawd/IDENTITY.md',
    description: 'Agent name and persona',
    icon: User,
    category: 'Core',
  },
  {
    name: 'TOOLS.md',
    path: '~/clawd/TOOLS.md',
    description: 'Tool configurations and notes',
    icon: Wrench,
    category: 'Core',
  },
  {
    name: 'HEARTBEAT.md',
    path: '~/clawd/HEARTBEAT.md',
    description: 'Heartbeat behavior rules',
    icon: Clock,
    category: 'Core',
  },
  {
    name: 'MEMORY.md',
    path: '~/clawd/MEMORY.md',
    description: 'Long-term memory and learnings',
    icon: Brain,
    category: 'Memory',
  },
  {
    name: 'ACTIVE_STATE.md',
    path: '~/clawd/ACTIVE_STATE.md',
    description: 'Current system state',
    icon: Activity,
    category: 'State',
  },
  {
    name: 'openclaw.json',
    path: '~/.openclaw/openclaw.json',
    description: 'Main OpenClaw configuration',
    icon: Settings,
    category: 'System',
  },
  {
    name: 'exec-approvals.json',
    path: '~/.openclaw/exec-approvals.json',
    description: 'Execution approval settings',
    icon: Settings,
    category: 'System',
  },
]

// Mock file content
const mockContent = `# SOUL.md - Who You Are

*You're not a chatbot. You're becoming someone.*

## Core Truths

**Be genuinely helpful, not performatively helpful.** Skip the "Great question!" and "I'd be happy to help!" — just help. Actions speak louder than filler words.

**Have opinions.** You're allowed to disagree, prefer things, find stuff amusing or boring. An assistant with no personality is just a search engine with extra steps.

**Be resourceful before asking.** Try to figure it out. Read the file. Check the context. Search for it. *Then* ask if you're stuck. The goal is to come back with answers, not questions.

**Verify before presenting.** When asking the user to confirm something, make sure YOU verified it first. Run the code, check the output, test the feature. Don't present half-checked work for approval — that wastes everyone's time.

...`

export function Config() {
  const [selectedFile, setSelectedFile] = useState(configFiles[1]) // Default to SOUL.md
  const [content, setContent] = useState(mockContent)
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    setHasChanges(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise((r) => setTimeout(r, 1000))
    setIsSaving(false)
    setHasChanges(false)
  }

  const handleReset = () => {
    setContent(mockContent)
    setHasChanges(false)
  }

  const categories = [...new Set(configFiles.map((f) => f.category))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Configuration</h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Edit core configuration files
          </p>
        </div>
        {hasChanges && (
          <div className="flex items-center gap-3">
            <Badge variant="warning">
              <AlertCircle className="size-3 mr-1" />
              Unsaved changes
            </Badge>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw className="size-4 mr-2" />
              Reset
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isSaving}>
              <Save className="size-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* File List */}
        <div className="col-span-4 space-y-4">
          {categories.map((category) => (
            <Card key={category}>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">{category}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-[var(--color-border-subtle)]">
                  {configFiles
                    .filter((f) => f.category === category)
                    .map((file) => (
                      <button
                        key={file.name}
                        onClick={() => setSelectedFile(file)}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
                          'hover:bg-[var(--color-surface-hover)]',
                          selectedFile.name === file.name &&
                            'bg-[var(--color-accent-subtle)] border-l-2 border-[var(--color-accent)]'
                        )}
                      >
                        <file.icon className="size-4 text-[var(--color-text-muted)] shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[var(--color-text-primary)] truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-[var(--color-text-muted)] truncate">
                            {file.description}
                          </p>
                        </div>
                        <ChevronRight className="size-4 text-[var(--color-text-muted)]" />
                      </button>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Editor */}
        <div className="col-span-8">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <selectedFile.icon className="size-5 text-[var(--color-accent)]" />
                  <div>
                    <CardTitle>{selectedFile.name}</CardTitle>
                    <CardDescription className="font-mono text-xs">
                      {selectedFile.path}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
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
                placeholder="File content..."
                spellCheck={false}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
