import { useState, useEffect, useCallback } from 'react'

interface UseApiOptions<T> {
  initialData?: T
  autoFetch?: boolean
  refreshInterval?: number
}

interface UseApiResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useApi<T>(
  fetcher: () => Promise<T>,
  options: UseApiOptions<T> = {}
): UseApiResult<T> {
  const { initialData = null, autoFetch = true, refreshInterval } = options
  const [data, setData] = useState<T | null>(initialData)
  const [loading, setLoading] = useState(autoFetch)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetcher()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [fetcher])

  useEffect(() => {
    if (autoFetch) {
      refetch()
    }
  }, [autoFetch, refetch])

  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(refetch, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [refreshInterval, refetch])

  return { data, loading, error, refetch }
}

// API Client
const API_BASE = '/api'

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  }
  return res.json()
}

export const api = {
  // Gateway
  getStatus: () => fetchJson<{ status: string; pid?: number; uptime?: number }>('/status'),
  restart: () => fetchJson<{ ok: boolean }>('/restart', { method: 'POST' }),
  
  // Sessions
  getSessions: () => fetchJson<{ sessions: unknown[] }>('/sessions'),
  
  // Cron
  getCronJobs: () => fetchJson<{ jobs: unknown[] }>('/cron'),
  
  // Files (mock for now - will be replaced with real API)
  getFiles: (path: string) => fetchJson<{ files: unknown[] }>(`/files?path=${encodeURIComponent(path)}`),
}
