'use client'

import { Suspense, useMemo } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import ModuleContentPanel from '@/components/learning/ModuleContentPanel'
import { reasoningModule, findNodeById } from '@/data/learningModules'
import type { ModuleNode } from '@/data/learningModules'

function ReasoningContent() {
  const searchParams = useSearchParams()
  const nodeId = searchParams.get('node')
  const { selectedNode, selectedPath } = useMemo(() => {
    if (!nodeId) return { selectedNode: null as ModuleNode | null, selectedPath: [] as string[] }
    const found = findNodeById(reasoningModule, nodeId)
    return found
      ? { selectedNode: found.node, selectedPath: found.path }
      : { selectedNode: null, selectedPath: [] }
  }, [nodeId])
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
            Logical Reasoning
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
        />
      </div>
    </div>
  )
}

export default function ReasoningPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-6 text-gray-500">Loading…</div>}>
        <ReasoningContent />
      </Suspense>
    </DashboardLayout>
  )
}
