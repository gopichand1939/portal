'use client'

import { Suspense, useMemo } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import ModuleContentPanel from '@/components/learning/ModuleContentPanel'
import { pythonModule, findNodeById } from '@/data/learningModules'
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
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link
          href="/daily-learning"
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Python Programming
          </h1>
          <p className="mt-1 text-gray-600">
            Module-wise learning — select a topic from the sidebar
          </p>
        </div>
      </div>

      <div className="min-h-[400px]">
<ModuleContentPanel
  selectedNode={selectedNode}
  path={selectedPath}
/>

      </div>
    </div>
  )
}

export default function PythonPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-6 text-gray-500">Loading…</div>}>
        <PythonContent />
      </Suspense>
    </DashboardLayout>
  )
}
