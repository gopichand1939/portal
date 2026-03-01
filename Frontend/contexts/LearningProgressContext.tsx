'use client'

import { createContext, useCallback, useContext, useState, useEffect } from 'react'
import type { Subject } from '@/lib/constants'
import {
  getDashboardProgress,
  getModulesProgress,
  parseNodeIdToProgress,
  type ContentTypeApi,
  type ModuleProgressRow,
} from '@/lib/progressApi'

export type DashboardProgress = {
  aptitude: number
  verbal: number
  reasoning: number
  python: number
}

/** moduleProgressMap[subject][moduleKey] = row from backend. Student-scoped, API-only. */
export type ModuleProgressMap = Record<Subject, Record<string, ModuleProgressRow>>

const CONTENT_TO_COLUMN: Record<ContentTypeApi, keyof ModuleProgressRow> = {
  STUDY: 'study_completed',
  EXERCISE: 'exercise_completed',
  ASSIGNMENT: 'assignment_completed',
  CODING: 'coding_completed',
}

function buildModuleProgressMap(data: Awaited<ReturnType<typeof getModulesProgress>>): ModuleProgressMap {
  const map: ModuleProgressMap = {
    aptitude: {},
    verbal: {},
    reasoning: {},
    python: {},
  }
  const subjects: Subject[] = ['aptitude', 'verbal', 'reasoning', 'python']
  for (const subject of subjects) {
    const rows = data[subject]
    if (!Array.isArray(rows)) continue
    for (const m of rows) {
      const mk = m.module_key
      map[subject][mk] = {
        study_completed: !!m.study_completed,
        exercise_completed: !!m.exercise_completed,
        assignment_completed: !!m.assignment_completed,
        coding_completed: !!m.coding_completed,
        module_completed: !!m.module_completed,
      }
    }
  }
  return map
}

const LearningProgressContext = createContext<{
  dashboardProgress: DashboardProgress
  moduleProgressMap: ModuleProgressMap
  isCompleted: (nodeId: string, subject: Subject) => boolean
  refreshProgress: () => void
} | null>(null)

export function LearningProgressProvider({ children }: { children: React.ReactNode }) {
  const [dashboardProgress, setDashboardProgress] = useState<DashboardProgress>({
    aptitude: 0,
    verbal: 0,
    reasoning: 0,
    python: 0,
  })
  const [moduleProgressMap, setModuleProgressMap] = useState<ModuleProgressMap>({
    aptitude: {},
    verbal: {},
    reasoning: {},
    python: {},
  })

  const refreshProgress = useCallback(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (!token) return

    Promise.all([getDashboardProgress(), getModulesProgress()])
      .then(([dashboard, modules]) => {
        setDashboardProgress({
          aptitude: Math.min(100, Math.max(0, Math.round(Number(dashboard.aptitude) ?? 0))),
          verbal: Math.min(100, Math.max(0, Math.round(Number(dashboard.verbal) ?? 0))),
          reasoning: Math.min(100, Math.max(0, Math.round(Number(dashboard.reasoning) ?? 0))),
          python: Math.min(100, Math.max(0, Math.round(Number(dashboard.python) ?? 0))),
        })
        setModuleProgressMap(buildModuleProgressMap(modules))
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    refreshProgress()
  }, [refreshProgress])

  const isCompleted = useCallback(
    (nodeId: string, subject: Subject) => {
      const parsed = parseNodeIdToProgress(nodeId)
      if (!parsed) return false
      const row = moduleProgressMap[subject]?.[parsed.moduleKey]
      if (!row) return false
      const col = CONTENT_TO_COLUMN[parsed.contentType]
      return row[col] === true
    },
    [moduleProgressMap]
  )

  return (
    <LearningProgressContext.Provider
      value={{
        dashboardProgress,
        moduleProgressMap,
        isCompleted,
        refreshProgress,
      }}
    >
      {children}
    </LearningProgressContext.Provider>
  )
}

export function useLearningProgress() {
  const ctx = useContext(LearningProgressContext)
  if (!ctx) {
    return {
      dashboardProgress: {
        aptitude: 0,
        verbal: 0,
        reasoning: 0,
        python: 0,
      } as DashboardProgress,
      moduleProgressMap: {
        aptitude: {},
        verbal: {},
        reasoning: {},
        python: {},
      } as ModuleProgressMap,
      isCompleted: (_nodeId: string, _subject: Subject) => false,
      refreshProgress: () => {},
    }
  }
  return ctx
}
