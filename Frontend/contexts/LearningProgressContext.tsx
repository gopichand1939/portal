'use client'

import { createContext, useCallback, useContext, useState, useEffect } from 'react'
import { getCompletedIds, setCompleted as persistCompleted } from '@/data/learningProgress'

const LearningProgressContext = createContext<{
  completedIds: Set<string>
  markComplete: (nodeId: string) => void
  isCompleted: (nodeId: string) => boolean
} | null>(null)

export function LearningProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    setCompletedIds(getCompletedIds())
  }, [])

  /** Mark a node as complete. One-way only; no undo. */
  const markComplete = useCallback((nodeId: string) => {
    const ids = getCompletedIds()
    if (ids.has(nodeId)) return
    ids.add(nodeId)
    persistCompleted(nodeId, true)
    setCompletedIds(new Set(ids))
  }, [])

  const isCompleted = useCallback((nodeId: string) => completedIds.has(nodeId), [completedIds])

  return (
    <LearningProgressContext.Provider value={{ completedIds, markComplete, isCompleted }}>
      {children}
    </LearningProgressContext.Provider>
  )
}

export function useLearningProgress() {
  const ctx = useContext(LearningProgressContext)
  if (!ctx) {
    return {
      completedIds: new Set<string>(),
      markComplete: () => {},
      isCompleted: () => false,
    }
  }
  return ctx
}
