'use client'

import { Suspense, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import ModuleContentPanel from '@/components/learning/ModuleContentPanel'
import { pythonModule, findNodeById, getLeafIds } from '@/data/learningModules'
import { parseNodeIdToProgress } from '@/lib/progressApi'
import type { ModuleNode } from '@/data/learningModules'

function PythonContent() {
  const searchParams = useSearchParams()
  const nodeId = searchParams.get('node')
  const { selectedNode, selectedPath } = useMemo(() => {
    if (!nodeId) return { selectedNode: null as ModuleNode | null, selectedPath: [] as string[] }
    const found = findNodeById(pythonModule, nodeId)
    return found
      ? { selectedNode: found.node, selectedPath: found.path }
      : { selectedNode: null, selectedPath: [] }
  }, [nodeId])
  const moduleKey = selectedNode ? parseNodeIdToProgress(selectedNode.id)?.moduleKey : undefined
  const pythonLeafIds = useMemo(() => getLeafIds(pythonModule), [])
  const moduleHasCoding = moduleKey ? pythonLeafIds.includes(moduleKey + '-coding') : false
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/daily-learning"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Daily Learning
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            Python Programming
          </h1>
          <p className="mt-1 text-gray-600">
            Study → Exercise → Assignment. Pick a topic from the sidebar.
          </p>
        </div>
      </div>

      <div className="min-h-[420px]">
        <ModuleContentPanel
          selectedNode={selectedNode}
          path={selectedPath}
          chapterKey="python"
          moduleHasCoding={moduleHasCoding}
        />
      </div>
    </div>
  )
}

export default function PythonPage() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-500">Loading…</div>}>
      <PythonContent />
    </Suspense>
  )
}
