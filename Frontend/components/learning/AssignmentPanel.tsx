'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, ClipboardCheck, Trophy } from 'lucide-react'
import { MIN_CORRECT_REQUIRED } from '@/lib/constants'
import type { Subject } from '@/lib/constants'
import { completeContent } from '@/lib/progressApi'

interface AssignmentQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
}

interface Assignment {
  title: string
  questions: AssignmentQuestion[]
}

interface AssignmentPanelProps {
  assignment: Assignment
  subject: Subject
  moduleKey: string
  onProgressComplete?: () => void
  moduleHasCoding?: boolean
}

const estimateMinutes = (count: number) => Math.max(5, Math.ceil((count * 1.2)))

export default function AssignmentPanel({
  assignment,
  subject,
  moduleKey,
  onProgressComplete,
  moduleHasCoding,
}: AssignmentPanelProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const total = assignment.questions.length
  const q = assignment.questions[currentIndex]
  const selected = q ? answers[q.id] : undefined
  const correctCount = assignment.questions.filter((q) => answers[q.id] === q.correctIndex).length
  const score = submitted ? correctCount : 0
  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0

  const handleSubmit = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1)
      return
    }
    setSubmitted(true)
    if (correctCount >= MIN_CORRECT_REQUIRED) {
      completeContent({
        subject,
        moduleKey,
        contentType: 'ASSIGNMENT',
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
    const message =
      accuracy >= 80
        ? 'Excellent! You are well prepared for this topic.'
        : accuracy >= 60
          ? 'Good attempt. Review the explanations and try the exercise again.'
          : 'Keep studying the material and retry. You will get better.'

    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
              <Trophy className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Assignment complete</h3>
            <p className="mt-4 text-3xl font-bold text-gray-900">
              {score} / {total}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-500">Score</p>
            <p className="mt-4 rounded-full bg-gray-100 px-4 py-1.5 text-sm font-semibold text-gray-700">
              {accuracy}% accuracy
            </p>
            <p className="mt-6 text-gray-600">{message}</p>
          </div>
        </div>

        {assignment.questions.some((q) => (q as AssignmentQuestion).explanation) && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-700">Review</h4>
            {assignment.questions.map((question, idx) => {
              const q = question as AssignmentQuestion
              const chosen = answers[q.id]
              const correct = chosen === q.correctIndex
              return (
                <div
                  key={q.id}
                  className="rounded-xl border border-gray-200 bg-white p-4"
                >
                  <p className="text-sm font-medium text-gray-900">
                    Q{idx + 1}. {q.question}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Your answer: {chosen !== undefined ? q.options[chosen] : '—'}
                    {!correct && (
                      <span className="ml-2 font-medium text-primary-600">
                        Correct: {q.options[q.correctIndex]}
                      </span>
                    )}
                  </p>
                  {q.explanation && (
                    <p className="mt-2 text-sm text-gray-500">{q.explanation}</p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50/80 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
            <ClipboardCheck className="h-5 w-5 text-amber-700" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{assignment.title}</h2>
            <p className="text-sm text-gray-600">Evaluation — attempt all questions</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-gray-600">
            <Clock className="h-4 w-4" />
            ~{estimateMinutes(total)} min
          </span>
          <span className="font-medium text-gray-700">{total} questions</span>
        </div>
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
          {q.options.map((opt, idx) => (
            <label
              key={idx}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                selected === idx
                  ? 'border-primary-400 bg-primary-50 text-primary-900'
                  : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50/50'
              }`}
            >
              <input
                type="radio"
                name={`assignment-${q.id}`}
                checked={selected === idx}
                onChange={() => setAnswers({ ...answers, [q.id]: idx })}
                className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-gray-800">{opt}</span>
            </label>
          ))}
        </div>
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
        <button
          type="button"
          onClick={handleSubmit}
          disabled={selected === undefined}
          className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {currentIndex < total - 1 ? 'Next question' : 'Submit assignment'}
        </button>
      </div>
    </div>
  )
}
