'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, CheckCircle, HelpCircle } from 'lucide-react'
import { MIN_CORRECT_REQUIRED } from '@/lib/constants'
import type { Subject } from '@/lib/constants'
import { completeContent } from '@/lib/progressApi'

interface ExerciseQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
}

interface Exercise {
  title: string
  questions: ExerciseQuestion[]
}

interface ExercisePanelProps {
  exercise: Exercise
  subject: Subject
  moduleKey: string
  onProgressComplete?: () => void
  moduleHasCoding?: boolean
}

export default function ExercisePanel({
  exercise,
  subject,
  moduleKey,
  onProgressComplete,
  moduleHasCoding,
}: ExercisePanelProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const q = exercise.questions[currentIndex]
  const total = exercise.questions.length
  const selected = q ? answers[q.id] : undefined
  const showFeedback = selected !== undefined
  const isCorrect = q && selected === q.correctIndex

  const correctCount = exercise.questions.filter((q) => answers[q.id] === q.correctIndex).length
  const score = submitted ? correctCount : 0

  const handleFinishOrNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1)
      return
    }
    setSubmitted(true)
    if (correctCount >= MIN_CORRECT_REQUIRED) {
      completeContent({
        subject,
        moduleKey,
        contentType: 'EXERCISE',
        correctCount,
        moduleHasCoding,
      })
        .then((res) => {
          if (res.ok) onProgressComplete?.()
        })
        .catch(() => {})
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Practice complete</h3>
          <p className="mt-2 text-gray-600">
            You got <span className="font-semibold text-gray-900">{score}</span> of{' '}
            <span className="font-semibold text-gray-900">{total}</span> correct.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Keep revising the study material and try again to improve.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{exercise.title}</h2>
        <p className="mt-1 text-sm text-gray-500">
          Practice — no pressure. Answer and see feedback, then move to the next.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-primary-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-600">
          {currentIndex + 1} / {total}
        </span>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 sm:p-8">
        <p className="mb-6 text-lg font-medium leading-relaxed text-gray-900">
          {q.question}
        </p>

        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            const chosen = selected === idx
            const correct = q.correctIndex === idx
            let style =
              'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50/50'
            if (showFeedback) {
              if (correct) style = 'border-emerald-300 bg-emerald-50/80 text-emerald-900'
              else if (chosen && !correct) style = 'border-amber-300 bg-amber-50/80 text-amber-900'
            } else if (chosen) {
              style = 'border-primary-400 bg-primary-50 text-primary-900'
            }

            return (
              <label
                key={idx}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all ${style} ${
                  showFeedback ? 'cursor-default' : ''
                }`}
              >
                <input
                  type="radio"
                  name={`exercise-${q.id}`}
                  checked={chosen}
                  disabled={showFeedback}
                  onChange={() => setAnswers({ ...answers, [q.id]: idx })}
                  className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-800">{opt}</span>
              </label>
            )
          })}
        </div>

        {showFeedback && (
          <div
            className={`mt-6 flex items-start gap-3 rounded-xl p-4 ${
              isCorrect ? 'bg-emerald-50' : 'bg-amber-50'
            }`}
          >
            {isCorrect ? (
              <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600" />
            ) : (
              <HelpCircle className="h-5 w-5 shrink-0 text-amber-600" />
            )}
            <p className={`text-sm font-medium ${isCorrect ? 'text-emerald-800' : 'text-amber-800'}`}>
              {isCorrect ? 'Correct. Well done!' : 'Not quite. Review the study material and try again.'}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>
        {!submitted ? (
          <button
            type="button"
            onClick={handleFinishOrNext}
            disabled={selected === undefined}
            className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {currentIndex < total - 1 ? 'Next question' : 'Finish practice'}
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              currentIndex < total - 1
                ? setCurrentIndex((i) => i + 1)
                : setSubmitted(true)
            }
            className="flex items-center gap-1 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            {currentIndex < total - 1 ? 'Next' : 'See results'}
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
