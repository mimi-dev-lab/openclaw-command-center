// Gateway Status
export interface GatewayStatus {
  status: 'running' | 'stopped' | 'error'
  pid?: number
  uptime?: number
  version?: string
  nodeVersion?: string
  memory?: {
    heapUsed: number
    heapTotal: number
    rss: number
  }
}

// Config File
export interface ConfigFile {
  name: string
  path: string
  description: string
  icon: string
  size?: number
  lastModified?: string
  content?: string
}

// Memory Entry
export interface MemoryEntry {
  path: string
  name: string
  type: 'file' | 'directory'
  size?: number
  lastModified?: string
  preview?: string
}

// Skill
export interface Skill {
  name: string
  description: string
  location: string
  enabled: boolean
  version?: string
  metadata?: Record<string, unknown>
}

// Project
export interface Project {
  name: string
  path: string
  type: 'react' | 'nextjs' | 'node' | 'python' | 'rust' | 'other'
  lastModified?: string
  gitStatus?: 'clean' | 'modified' | 'untracked'
  hasPackageJson?: boolean
}

// Output File
export interface OutputFile {
  name: string
  path: string
  type: 'image' | 'document' | 'data' | 'web'
  size: number
  createdAt: string
  mimeType?: string
}

// Cron Job
export interface CronJob {
  id: string
  name: string
  schedule: {
    kind: 'at' | 'every' | 'cron'
    expr?: string
    everyMs?: number
    at?: string
  }
  payload: {
    kind: 'systemEvent' | 'agentTurn'
    text?: string
    message?: string
  }
  sessionTarget: 'main' | 'isolated'
  enabled: boolean
  lastRun?: string
  nextRun?: string
}

// Session
export interface Session {
  sessionKey: string
  kind: string
  label?: string
  created: string
  lastActivity: string
  messageCount: number
  model?: string
}

// Channel Status
export interface ChannelStatus {
  name: string
  type: 'discord' | 'telegram' | 'whatsapp' | 'slack' | 'signal' | 'imessage'
  status: 'connected' | 'disconnected' | 'error'
  messagesIn?: number
  messagesOut?: number
}

// API Response
export interface ApiResponse<T> {
  ok: boolean
  data?: T
  error?: string
}
