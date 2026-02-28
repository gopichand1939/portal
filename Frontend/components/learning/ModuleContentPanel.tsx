'use client'

import { BookOpen, CheckCircle } from 'lucide-react'
import type { ModuleNode } from '@/data/learningModules'
import { useLearningProgress } from '@/contexts/LearningProgressContext'
import CodingPracticePanel from '@/components/learning/CodingPracticePanel'
import ExercisePanel from '@/components/learning/ExercisePanel'
import AssignmentPanel from '@/components/learning/AssignmentPanel'
import {
  studyContentMap,
  exerciseContentMap,
  assignmentContentMap,
} from '@/data/learningModules'

interface ModuleContentPanelProps {
  selectedNode: ModuleNode | null
  path: string[]
}

export default function ModuleContentPanel({
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

  return (
    <div className="flex flex-1 flex-col rounded-xl border bg-white p-6 shadow-sm">
      {/* HEADER */}
      <div className="mb-4 border-b pb-4">
        <p className="text-sm text-gray-500">{path.join(' → ')}</p>
        <h2 className="text-xl font-bold text-gray-900">
          {selectedNode.label}
        </h2>
      </div>

      {/* CONTENT */}
      <div className="flex-1 space-y-6">

        {isStudy && studyContentMap[selectedNode.id] && (
          <div>
            <h3 className="text-2xl font-bold">
              {studyContentMap[selectedNode.id].title}
            </h3>
            <p className="mt-2 text-gray-600">
              {studyContentMap[selectedNode.id].description}
            </p>

            {studyContentMap[selectedNode.id].sections.map(
              (sec: any, i: number) => (
                <div key={i} className="mt-4">
                  <h4 className="font-semibold">{sec.heading}</h4>
                  <ul className="list-disc pl-6">
                    {sec.points.map((p: string, j: number) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        )}

        {isExercise && exerciseContentMap[selectedNode.id] && (
          <ExercisePanel exercise={exerciseContentMap[selectedNode.id]} />
        )}

        {isAssignment && assignmentContentMap[selectedNode.id] && (
          <AssignmentPanel assignment={assignmentContentMap[selectedNode.id]} />
        )}
      </div>

      {/* FOOTER */}
      {isLeaf && (
        <div className="mt-6 border-t pt-4 flex justify-end">
          <button
            onClick={() => !completed && markComplete(selectedNode.id)}
            disabled={completed}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
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
