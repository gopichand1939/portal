'use client'

import { useState } from 'react'
import { ChevronRight, ChevronDown, BookOpen, FileQuestion, ClipboardList, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ModuleNode } from '@/data/learningModules'

interface ModuleTreeNavProps {
  root: ModuleNode
  moduleSlug: 'aptitude' | 'reasoning' | 'verbal'
  selectedId: string | null
  onSelect: (node: ModuleNode, path: string[]) => void
  progressPercent?: number
}

function isLeaf(node: ModuleNode): boolean {
  return !!node.type && !node.children?.length
}

function isFinalAssessment(node: ModuleNode): boolean {
  return node.label === 'Final Assessment'
}

export default function ModuleTreeNav({
  root,
  moduleSlug,
  selectedId,
  onSelect,
  progressPercent = 0,
}: ModuleTreeNavProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set([root.id]))

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-200 bg-white px-4 py-3">
        <h2 className="text-lg font-bold text-gray-900">{root.label}</h2>
        {progressPercent >= 0 && (
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-primary-600 transition-all"
                style={{ width: `${Math.min(100, progressPercent)}%` }}
              />
            </div>
            <span className="text-xs font-medium text-gray-600">{progressPercent}%</span>
          </div>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto py-2" aria-label="Module navigation">
        <TreeNode
          node={root}
          depth={0}
          expandedIds={expandedIds}
          toggle={toggle}
          selectedId={selectedId}
          onSelect={onSelect}
          path={[]}
          moduleSlug={moduleSlug}
        />
      </nav>
    </div>
  )
}

interface TreeNodeProps {
  node: ModuleNode
  depth: number
  expandedIds: Set<string>
  toggle: (id: string) => void
  selectedId: string | null
  onSelect: (node: ModuleNode, path: string[]) => void
  path: string[]
  moduleSlug: 'aptitude' | 'reasoning' | 'verbal'
}

function TreeNode({
  node,
  depth,
  expandedIds,
  toggle,
  selectedId,
  onSelect,
  path,
  moduleSlug,
}: TreeNodeProps) {
  const hasChildren = node.children && node.children.length > 0
  const expanded = expandedIds.has(node.id)
  const isLeafNode = isLeaf(node)
  const isFinal = isFinalAssessment(node)
  const newPath = [...path, node.label]

  if (isLeafNode && node.type) {
    const Icon =
      node.type === 'study'
        ? BookOpen
        : node.type === 'exercise'
          ? FileQuestion
          : ClipboardList
    const isSelected = selectedId === node.id
    return (
      <div style={{ paddingLeft: depth * 16 }} className="py-0.5">
        <button
          type="button"
          onClick={() => onSelect(node, newPath)}
          className={cn(
            'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors',
            isSelected
              ? 'bg-primary-100 text-primary-800'
              : 'text-gray-700 hover:bg-gray-100'
          )}
        >
          <span className="flex w-5 shrink-0 justify-center">
            <CheckCircle className="h-4 w-4 text-gray-400" aria-hidden />
          </span>
          <Icon className="h-4 w-4 shrink-0 text-gray-500" />
          <span className="min-w-0 flex-1 truncate">{node.label}</span>
        </button>
      </div>
    )
  }

  if (hasChildren) {
    return (
      <div className="py-0.5">
        <div
          style={{ paddingLeft: depth * 16 }}
          className="flex items-center gap-1"
        >
          <button
            type="button"
            onClick={() => toggle(node.id)}
            className="flex shrink-0 items-center justify-center rounded p-0.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-expanded={expanded}
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => toggle(node.id)}
            className={cn(
              'flex flex-1 items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium transition-colors',
              isFinal ? 'bg-amber-50 text-amber-900 hover:bg-amber-100' : 'text-gray-800 hover:bg-gray-100'
            )}
          >
            <span className="flex w-5 shrink-0 justify-center">
              <CheckCircle className="h-4 w-4 text-gray-400" aria-hidden />
            </span>
            <span className="min-w-0 flex-1 truncate">{node.label}</span>
          </button>
        </div>
        {expanded &&
          node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedIds={expandedIds}
              toggle={toggle}
              selectedId={selectedId}
              onSelect={onSelect}
              path={newPath}
              moduleSlug={moduleSlug}
            />
          ))}
      </div>
    )
  }

  return null
}
