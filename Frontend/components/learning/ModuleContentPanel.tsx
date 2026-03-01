'use client'

import { memo } from 'react'
import { BookOpen, CheckCircle } from 'lucide-react'
import type { ModuleNode } from '@/data/learningModules'
import type { Subject } from '@/lib/constants'
import { useLearningProgress } from '@/contexts/LearningProgressContext'
import { parseNodeIdToProgress, completeContent } from '@/lib/progressApi'
import CodingPracticePanel from '@/components/learning/CodingPracticePanel'
import ExercisePanel from '@/components/learning/ExercisePanel'
import AssignmentPanel from '@/components/learning/AssignmentPanel'
import StudyContentView from '@/components/learning/StudyContentView'
import {
  studyContentMap,
  exerciseContentMap,
  assignmentContentMap,
} from '@/data/learningModules'

interface ModuleContentPanelProps {
  selectedNode: ModuleNode | null
  path: string[]
  /** Subject for progress API (aptitude | reasoning | verbal | python) */
  chapterKey?: Subject
  /** For Python: whether this module has coding content (completion requires coding when true). */
  moduleHasCoding?: boolean
}

function ModuleContentPanel({
  selectedNode,
  path,
  chapterKey,
  moduleHasCoding,
}: ModuleContentPanelProps) {
  const { isCompleted, refreshProgress } = useLearningProgress()
  const parsed = selectedNode ? parseNodeIdToProgress(selectedNode.id) : null
  const moduleKey = parsed?.moduleKey

  const handleStudyComplete = () => {
    if (!chapterKey || !moduleKey) return
    completeContent({
      subject: chapterKey,
      moduleKey,
      contentType: 'STUDY',
      moduleHasCoding,
    })
      .then((res) => res.ok && refreshProgress())
      .catch(() => {})
  }

  if (!selectedNode) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-12 text-center">
        <BookOpen className="mb-4 h-16 w-16 text-gray-300" />
        <h3 className="text-lg font-semibold text-gray-600">Select a topic</h3>
        <p className="mt-2 text-sm text-gray-500">
          Choose Study Material, Exercise, or Assignment from the sidebar.
        </p>
      </div>
    )
  }

  const isStudy = selectedNode.type === 'study'
  const isExercise = selectedNode.type === 'exercise'
  const isAssignment = selectedNode.type === 'assignment'
  const isCoding = selectedNode.type === 'coding'
  const isLeaf = !!selectedNode.type
  const completed = isLeaf && chapterKey ? isCompleted(selectedNode.id, chapterKey as Subject) : false

  if (isCoding) {
    return (
      <div className="flex flex-1 flex-col rounded-xl border bg-white">
        <CodingPracticePanel
          nodeId={selectedNode.id}
          path={path}
          chapterKey={chapterKey}
        />
      </div>
    )
  }

  const studyContent = isStudy && studyContentMap[selectedNode.id]

  return (
    <div className="flex flex-1 flex-col rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 px-6 py-3">
        <p className="text-xs font-medium text-gray-500">
          {path.join(' → ')}
        </p>
      </div>

      <div className="flex-1 p-6 pb-8">
        {isStudy && studyContent && (
          <>
            <StudyContentView content={studyContent} />
            {isLeaf && (
              <div className="mt-8 flex justify-end border-t border-gray-100 pt-6">
                <button
                  onClick={() => !completed && handleStudyComplete()}
                  disabled={completed}
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors ${
                    completed
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  <CheckCircle className="h-5 w-5" />
                  {completed ? 'Completed' : 'Mark as complete'}
                </button>
              </div>
            )}
          </>
        )}

        {isExercise && exerciseContentMap[selectedNode.id] && chapterKey && moduleKey && (
          <ExercisePanel
            exercise={exerciseContentMap[selectedNode.id]}
            subject={chapterKey}
            moduleKey={moduleKey}
            onProgressComplete={refreshProgress}
            moduleHasCoding={moduleHasCoding}
          />
        )}

        {isAssignment && assignmentContentMap[selectedNode.id] && chapterKey && moduleKey && (
          <AssignmentPanel
            assignment={assignmentContentMap[selectedNode.id]}
            subject={chapterKey}
            moduleKey={moduleKey}
            onProgressComplete={refreshProgress}
            moduleHasCoding={moduleHasCoding}
          />
        )}
      </div>

    </div>
  )
}

export default memo(ModuleContentPanel)
