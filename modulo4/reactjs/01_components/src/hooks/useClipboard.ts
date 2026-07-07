// src/hooks/useClipboard.ts
import { useState, useCallback } from 'react'

interface UseClipboardReturn {
  copy:   (text: string) => Promise<void>
  copied: boolean
}

export function useClipboard(resetDelay = 2000): UseClipboardReturn {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), resetDelay)
    } catch {
      console.warn('useClipboard: no se pudo copiar al portapapeles')
    }
  }, [resetDelay])

  return { copy, copied }
}
