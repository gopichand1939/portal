import { API_BASE_URL } from '@/lib/constants'
import type { Subject } from '@/lib/constants'

/** Leaf nodeId format: topicId-study | topicId-exercise | topicId-assignment | topicId-coding */
const CONTENT_SUFFIXES = ['-study', '-exercise', '-assignment', '-coding'] as const
export const CONTENT_TYPE_API = ['STUDY', 'EXERCISE', 'ASSIGNMENT', 'CODING'] as const
export type ContentTypeApi = (typeof CONTENT_TYPE_API)[number]

export function parseNodeIdToProgress(
  nodeId: string
): { moduleKey: string; contentType: ContentTypeApi } | null {
  for (let i = 0; i < CONTENT_SUFFIXES.length; i++) {
    const suffix = CONTENT_SUFFIXES[i]
    if (nodeId.endsWith(suffix)) {
      const moduleKey = nodeId.slice(0, -suffix.length)
      const contentType = CONTENT_TYPE_API[i]
      return { moduleKey, contentType }
    }
  }
  return null
}

function getAuthHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (token) (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
  return headers
}

export async function completeContent({
  subject,
  moduleKey,
  contentType,
  correctCount,
  moduleHasCoding,
}: {
  subject: Subject
  moduleKey: string
  contentType: 'STUDY' | 'EXERCISE' | 'ASSIGNMENT' | 'CODING'
  correctCount?: number
  /** When true, Python module completion requires coding_completed. Inferred from tree when omitted. */
  moduleHasCoding?: boolean
}): Promise<Response> {
  return fetch(`${API_BASE_URL}/api/progress/${subject}/complete`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ moduleKey, contentType, correctCount, moduleHasCoding }),
    cache: 'no-store',
  })
}

export async function getSubjectProgress(subject: Subject): Promise<{ subject: string; progress: number }> {
  const res = await fetch(`${API_BASE_URL}/api/progress/${subject}/overall`, {
    headers: getAuthHeaders(),
    cache: 'no-store',
  })
  return res.json()
}

export async function getDashboardProgress(): Promise<{
  aptitude: number
  verbal: number
  reasoning: number
  python: number
}> {
  const res = await fetch(`${API_BASE_URL}/api/progress`, {
    headers: getAuthHeaders(),
    cache: 'no-store',
  })
  return res.json()
}

export type ModuleProgressRow = {
  study_completed: boolean
  exercise_completed: boolean
  assignment_completed: boolean
  coding_completed: boolean
  module_completed: boolean
}

export async function getModulesProgress(): Promise<{
  aptitude: Array<{ module_key: string } & ModuleProgressRow>
  verbal: Array<{ module_key: string } & ModuleProgressRow>
  reasoning: Array<{ module_key: string } & ModuleProgressRow>
  python: Array<{ module_key: string } & ModuleProgressRow>
}> {
  const res = await fetch(`${API_BASE_URL}/api/progress/modules`, {
    headers: getAuthHeaders(),
    cache: 'no-store',
  })
  return res.json()
}
