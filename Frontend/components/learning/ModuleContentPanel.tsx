'use client'

import { memo } from 'react'
import { BookOpen, CheckCircle } from 'lucide-react'
import type { ModuleNode } from '@/data/learningModules'
import { useLearningProgress } from '@/contexts/LearningProgressContext'
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
}

function ModuleContentPanel({
  selectedNode,
  path,
}: ModuleContentPanelProps) {
  const { isCompleted, markComplete } = useLearningProgress()

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
  const completed = isLeaf && isCompleted(selectedNode.id)

  if (isCoding) {
    return (
      <div className="flex flex-1 flex-col rounded-xl border bg-white">
        <CodingPracticePanel
          nodeId={selectedNode.id}
          path={path}
          onMarkComplete={() => {}}
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
                  onClick={() => !completed && markComplete(selectedNode.id)}
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

        {isExercise && exerciseContentMap[selectedNode.id] && (
          <ExercisePanel exercise={exerciseContentMap[selectedNode.id]} />
        )}

        {isAssignment && assignmentContentMap[selectedNode.id] && (
          <AssignmentPanel assignment={assignmentContentMap[selectedNode.id]} />
        )}
      </div>

      {/* Footer for exercise/assignment */}
      {isLeaf && !isStudy && (isExercise || isAssignment) && (
        <div className="border-t border-gray-100 px-6 py-4 flex justify-end">
          <button
            onClick={() => !completed && markComplete(selectedNode.id)}
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
    </div>
  )
}

export default memo(ModuleContentPanel)
