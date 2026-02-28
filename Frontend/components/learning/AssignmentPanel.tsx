'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

export default function AssignmentPanel({ assignment }: any) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = submitted
    ? assignment.questions.filter(
        (q: any) => answers[q.id] === q.correctIndex
      ).length
    : 0

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold">{assignment.title}</h3>

      {assignment.questions.map((q: any, index: number) => (
        <div
          key={q.id}
          className="rounded-lg border border-gray-200 bg-gray-50 p-6"
        >
          <div className="mb-2 text-sm text-gray-600">
            Question {index + 1} of {assignment.questions.length}
          </div>

          <p className="mb-4 font-semibold text-gray-900">{q.question}</p>

          <div className="space-y-3">
            {q.options.map((opt: string, idx: number) => {
              const selected = answers[q.id] === idx
              const correct = q.correctIndex === idx

              let style = 'border-gray-200 bg-white'
              if (submitted) {
                if (correct) style = 'border-green-400 bg-green-50'
                else if (selected) style = 'border-red-400 bg-red-50'
              } else if (selected) {
                style = 'border-primary-500 bg-primary-50'
              }

              return (
                <label
                  key={idx}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 ${style}`}
                >
                  <input
                    type="radio"
                    name={`assignment-${q.id}`}
                    checked={selected}
                    disabled={submitted}
                    onChange={() =>
                      setAnswers({ ...answers, [q.id]: idx })
                    }
                    className="h-4 w-4 text-primary-600"
                  />
                  <span>{opt}</span>
                </label>
              )
            })}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          className="w-full rounded-lg bg-primary-600 py-3 font-semibold text-white hover:bg-primary-700"
        >
          Submit Assignment
        </button>
      ) : (
        <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6 text-center">
          <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-600" />
          <p className="text-lg font-bold">
            Score: {score} / {assignment.questions.length}
          </p>
        </div>
      )}
    </div>
  )
}
