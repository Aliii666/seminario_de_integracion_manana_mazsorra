// src/hooks/useFetchData.ts
import { useState, useEffect, useCallback } from 'react'

interface FetchState<T> {
  data:    T | null
  loading: boolean
  error:   string | null
  refetch: () => void
}

export function useFetchData<T>(url: string, timeoutMs = 8000): FetchState<T> {
  const [data,    setData]    = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)
  const [trigger, setTrigger] = useState(0)

  const refetch = useCallback(() => setTrigger(t => t + 1), [])

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    // Abort request if it exceeds timeout duration (Proposed Exercise)
    const timeoutId = setTimeout(() => {
      controller.abort()
    }, timeoutMs)

    setLoading(true)
    setError(null)

    async function load() {
      try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json: T = await res.json()
        if (!cancelled) {
          setData(json)
          setLoading(false)
        }
      } catch (err: any) {
        if (!cancelled) {
          if (err.name === 'AbortError') {
            setError(`Request timed out after ${timeoutMs}ms`)
          } else {
            setError(err instanceof Error ? err.message : 'Error desconocido')
          }
          setLoading(false)
        }
      } finally {
        clearTimeout(timeoutId)
      }
    }

    load()
    return () => {
      cancelled = true
      controller.abort()
      clearTimeout(timeoutId)
    }
  }, [url, trigger, timeoutMs])

  return { data, loading, error, refetch }
}
