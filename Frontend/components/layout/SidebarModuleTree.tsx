'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ChevronRight, ChevronDown, BookOpen, FileQuestion, ClipboardList, Code2, CheckCircle, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ModuleNode } from '@/data/learningModules'
import { getLeafIdsUnder } from '@/data/learningModules'
import { useLearningProgress } from '@/contexts/LearningProgressContext'
import type { Subject } from '@/lib/constants'

type ModuleSlug = 'aptitude' | 'reasoning' | 'verbal' | 'python'

interface SidebarModuleTreeProps {
  root: ModuleNode
  moduleSlug: ModuleSlug
  onClose?: () => void
}

function isLeaf(node: ModuleNode): boolean {
  return !!node.type && !node.children?.length
}

function isFinalAssessment(node: ModuleNode): boolean {
  return node.label === 'Final Assessment'
}

export default function SidebarModuleTree({
  root,
  moduleSlug,
  onClose,
}: SidebarModuleTreeProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentNodeId = searchParams.get('node') ?? ''
  const basePath = `/daily-learning/${moduleSlug}`
  const isActiveModule = pathname === basePath || pathname?.startsWith(basePath + '/')
  const { isCompleted, dashboardProgress } = useLearningProgress()
  const chapterKey = moduleSlug
  const chapterProgress: Record<string, number> = {
    aptitude: dashboardProgress.aptitude,
    verbal: dashboardProgress.verbal,
    reasoning: dashboardProgress.reasoning,
    python: dashboardProgress.python,
  }
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() =>
    new Set([root.id])
  )

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="mt-1 space-y-0.5 border-l-2 border-gray-200 pl-2">
      <SidebarTreeNode
        node={root}
        depth={0}
        basePath={basePath}
        expandedIds={expandedIds}
        toggle={toggle}
        currentNodeId={currentNodeId}
        onClose={onClose}
        isActiveModule={isActiveModule}
        isCompleted={isCompleted}
        chapterKey={chapterKey}
        chapterProgress={chapterProgress}
      />
    </div>
  )
}

interface SidebarTreeNodeProps {
  node: ModuleNode
  depth: number
  basePath: string
  expandedIds: Set<string>
  toggle: (id: string) => void
  currentNodeId: string
  onClose?: () => void
  isActiveModule: boolean
  isCompleted: (nodeId: string, subject: Subject) => boolean
  chapterKey: ModuleSlug
  chapterProgress: Record<string, number>
}

function SidebarTreeNode({
  node,
  depth,
  basePath,
  expandedIds,
  toggle,
  currentNodeId,
  onClose,
  isActiveModule,
  isCompleted,
  chapterKey,
  chapterProgress,
}: SidebarTreeNodeProps) {
  const hasChildren = node.children && node.children.length > 0
  const expanded = expandedIds.has(node.id)
  const isLeafNode = isLeaf(node)
  const isFinal = isFinalAssessment(node)
  const isSelected = isActiveModule && currentNodeId === node.id
  const leafIdsUnder = getLeafIdsUnder(node)
  const isRootSection = depth === 0 && hasChildren
  const completed = isLeafNode
    ? isCompleted(node.id, chapterKey)
    : leafIdsUnder.length > 0 && leafIdsUnder.every((id) => isCompleted(id, chapterKey))
  const completionPct = isRootSection ? (chapterProgress[chapterKey] ?? 0) : 0

  if (isLeafNode && node.type) {
    const Icon =
      node.type === 'study'
        ? BookOpen
        : node.type === 'exercise'
          ? FileQuestion
          : node.type === 'coding'
            ? Code2
            : ClipboardList
    const href = `${basePath}?node=${encodeURIComponent(node.id)}`
    return (
      <div style={{ paddingLeft: depth * 12 }} className="py-0.5">
        <Link
          href={href}
          onClick={onClose}
          className={cn(
            'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors',
            isSelected
              ? 'bg-primary-100 text-primary-800'
              : 'text-gray-600 hover:bg-gray-100'
          )}
        >
          <span className="flex w-4 shrink-0 justify-center">
            {completed ? (
              <CheckCircle className="h-3.5 w-3 text-green-600" aria-hidden />
            ) : (
              <Circle className="h-3.5 w-3 text-gray-400" aria-hidden />
            )}
          </span>
          <Icon className="h-3.5 w-3 shrink-0 text-gray-500" />
          <span className="min-w-0 flex-1 truncate text-xs">{node.label}</span>
        </Link>
      </div>
    )
  }

  if (hasChildren) {
    return (
      <div className="py-0.5">
        <button
          type="button"
          onClick={() => toggle(node.id)}
          style={{ paddingLeft: depth * 12 }}
          className={cn(
            'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium transition-colors',
            isFinal
              ? 'bg-amber-50 text-amber-900 hover:bg-amber-100'
              : 'text-gray-700 hover:bg-gray-100'
          )}
          aria-expanded={expanded}
        >
          <span className="flex shrink-0 items-center justify-center">
            {expanded ? (
              <ChevronDown className="h-3.5 w-3 text-gray-500" />
            ) : (
              <ChevronRight className="h-3.5 w-3 text-gray-500" />
            )}
          </span>
          {!isRootSection && (
            <span className="flex h-6 w-6 shrink-0 items-center justify-center">
              {completed ? (
                <CheckCircle className="h-3.5 w-3 text-green-600" aria-hidden />
              ) : (
                <Circle className="h-3.5 w-3 text-gray-400" aria-hidden />
              )}
            </span>
          )}
          <span className="min-w-0 flex-1 truncate text-xs">{node.label}</span>
          {isRootSection && (
            <span
              className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold',
                completed ? 'bg-green-100 text-green-700' : 'border-2 border-gray-300 bg-gray-50 text-gray-600'
              )}
              aria-label={`${completionPct}% complete`}
            >
              {completionPct}%
            </span>
          )}
        </button>
        {expanded &&
          node.children!.map((child) => (
            <SidebarTreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              basePath={basePath}
              expandedIds={expandedIds}
              toggle={toggle}
              currentNodeId={currentNodeId}
              onClose={onClose}
              isActiveModule={isActiveModule}
              isCompleted={isCompleted}
              chapterKey={chapterKey}
              chapterProgress={chapterProgress}
            />
          ))}
      </div>
    )
  }

  return null
}
