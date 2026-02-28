const STORAGE_KEY = 'learning-completed'

export function getCompletedIds(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw) as string[]
    return new Set(Array.isArray(arr) ? arr : [])
  } catch {
    return new Set()
  }
}

export function setCompleted(nodeId: string, completed: boolean): void {
  if (typeof window === 'undefined') return
  const ids = getCompletedIds()
  if (completed) ids.add(nodeId)
  else ids.delete(nodeId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)))
}

export function isCompleted(nodeId: string): boolean {
  return getCompletedIds().has(nodeId)
}
