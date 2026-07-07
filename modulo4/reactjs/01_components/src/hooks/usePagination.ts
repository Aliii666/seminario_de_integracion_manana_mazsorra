// src/hooks/usePagination.ts
import { useState } from 'react'

interface UsePaginationOptions {
  totalItems: number
  pageSize:   number
}

interface UsePaginationReturn {
  currentPage: number
  totalPages:  number
  goToPage:    (page: number) => void
  nextPage:    () => void
  prevPage:    () => void
  startIndex:  number
  endIndex:    number
  canGoNext:   boolean
  canGoPrev:   boolean
}

export function usePagination({
  totalItems,
  pageSize,
}: UsePaginationOptions): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const endIndex   = Math.min(startIndex + pageSize, totalItems)

  function goToPage(page: number) {
    setCurrentPage(Math.min(Math.max(1, page), totalPages))
  }

  return {
    currentPage,
    totalPages,
    goToPage,
    nextPage:  () => goToPage(currentPage + 1),
    prevPage:  () => goToPage(currentPage - 1),
    startIndex,
    endIndex,
    canGoNext: currentPage < totalPages,
    canGoPrev: currentPage > 1,
  }
}
