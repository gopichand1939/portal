'use client'

import { Suspense, useMemo } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, Award } from 'lucide-react'
import ModuleContentPanel from '@/components/learning/ModuleContentPanel'
import { verbalModule, findNodeById } from '@/data/learningModules'
import type { ModuleNode } from '@/data/learningModules'

function VerbalContent() {
  const searchParams = useSearchParams()
  const nodeId = searchParams.get('node')
  const { selectedNode, selectedPath } = useMemo(() => {
    if (!nodeId) return { selectedNode: null as ModuleNode | null, selectedPath: [] as string[] }
    const found = findNodeById(verbalModule, nodeId)
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
            Verbal Ability
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

      {/* <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
              <Award className="h-7 w-7 text-amber-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-900">Final Assessment</h3>
              <p className="text-sm text-amber-800">
                Complete the final assessment to finish this module
              </p>
            </div>
          </div>
          <Link
            href="/daily-learning/verbal?node=verbal-final-study"
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-700"
          >
            Open Final Assessment
          </Link>
        </div>
      </div> */}
    </div>
  )
}

export default function VerbalPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-6 text-gray-500">Loading…</div>}>
        <VerbalContent />
      </Suspense>
    </DashboardLayout>
  )
}
