'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import ProgressCard from '@/components/ui/ProgressCard'
import {
  BookOpen,
  CheckCircle,
  FileText,
  Clock,
  Calendar,
  CheckCircle2,
  Circle,
  ArrowLeft,
} from 'lucide-react'
import Link from 'next/link'
import {
  dailyProgress,
  practiceQuestions,
  testQuestions,
  dailySchedule,
} from '@/data/mockData'

export default function ReasoningDayPage() {
  const params = useParams()
  const day = params?.day as string
  const dayNumber = parseInt(day?.replace('day-', '') || '1')

  const [practiceAnswers, setPracticeAnswers] = useState<{
    [key: number]: string
  }>({})
  const [practiceSubmitted, setPracticeSubmitted] = useState(false)
  const [testAnswers, setTestAnswers] = useState<{ [key: number]: number }>({})
  const [testSubmitted, setTestSubmitted] = useState(false)
  const [currentTestQuestion, setCurrentTestQuestion] = useState(0)

  const overallProgress =
    (dailyProgress.learn.progress +
      dailyProgress.practice.progress +
      dailyProgress.test.progress) /
    3

  const handleTestSubmit = () => {
    setTestSubmitted(true)
  }

  const calculateTestScore = () => {
    let correct = 0
    reasoningTestQuestions.forEach((q) => {
      if (testAnswers[q.id] === q.correct) {
        correct++
      }
    })
    return Math.round((correct / reasoningTestQuestions.length) * 100)
  }

  // Filter questions for Reasoning section
  const reasoningPracticeQuestions = practiceQuestions.filter((q) =>
    ['Blood Relations', 'Coding & Decoding'].includes(q.topic)
  )

  const reasoningTestQuestions = testQuestions.filter((q) =>
    ['Blood Relations', 'Coding & Decoding', 'Series & Sequences'].includes(q.topic)
  )

  return (
    <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/daily-learning/reasoning"
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Reasoning - Day {dayNumber}
            </h1>
            <p className="mt-2 text-gray-600">
              Complete today's reasoning learning modules
            </p>
          </div>
        </div>

        {/* Daily Schedule */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Today's Schedule
            </h2>
          </div>
          <div className="space-y-3">
            {dailySchedule.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4"
              >
                <div className="flex-shrink-0">
                  {item.status === 'completed' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : item.status === 'in-progress' ? (
                    <div className="h-5 w-5 animate-pulse rounded-full bg-primary-600"></div>
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">{item.activity}</p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : item.status === 'in-progress'
                          ? 'bg-primary-100 text-primary-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {item.status === 'completed'
                        ? 'Completed'
                        : item.status === 'in-progress'
                        ? 'In Progress'
                        : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Progress */}
        <ProgressCard
          title="Today's Progress"
          progress={Math.round(overallProgress)}
          color="bg-primary-600"
        />

        {/* Learn Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Learn</h2>
                <p className="text-sm text-gray-600">
                  Study reasoning topics and concepts
                </p>
              </div>
            </div>
            {dailyProgress.learn.completed ? (
              <span className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                <CheckCircle className="h-4 w-4" />
                Completed
              </span>
            ) : (
              <span className="text-xs text-gray-500">In Progress</span>
            )}
          </div>

          {/* Learning Material */}
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Logical Reasoning Topics
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Today you will learn about blood relations, coding-decoding, and series patterns.
              </p>
              <div className="space-y-3">
                <div className="rounded-lg bg-white p-4">
                  <h4 className="mb-2 font-semibold text-gray-900">Blood Relations</h4>
                  <p className="text-sm text-gray-700">
                    Understanding family relationships and solving relationship-based problems.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <h4 className="mb-2 font-semibold text-gray-900">Coding & Decoding</h4>
                  <p className="text-sm text-gray-700">
                    Learn patterns for encoding and decoding words, numbers, and symbols.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <h4 className="mb-2 font-semibold text-gray-900">Series & Sequences</h4>
                  <p className="text-sm text-gray-700">
                    Identify patterns in number and letter series.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Practice
                </h2>
                <p className="text-sm text-gray-600">
                  Solve 5 practice questions (Enter final answer only)
                </p>
              </div>
            </div>
            {dailyProgress.practice.completed ? (
              <span className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                <CheckCircle className="h-4 w-4" />
                Completed
              </span>
            ) : (
              <span className="text-xs text-gray-500">
                {dailyProgress.practice.progress}% Complete
              </span>
            )}
          </div>

          {/* Practice Questions */}
          <div className="space-y-6">
            {reasoningPracticeQuestions.map((q) => (
              <div
                key={q.id}
                className="rounded-lg border border-gray-200 bg-gray-50 p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                    Question {q.id} of {reasoningPracticeQuestions.length}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    5 min
                  </span>
                </div>
                <div className="mb-2">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                    {q.topic}
                  </span>
                </div>
                <h3 className="mb-3 text-base font-semibold text-gray-900">
                  {q.question}
                </h3>
                {!practiceSubmitted ? (
                  <input
                    type="text"
                    value={practiceAnswers[q.id] || ''}
                    onChange={(e) =>
                      setPracticeAnswers({
                        ...practiceAnswers,
                        [q.id]: e.target.value,
                      })
                    }
                    placeholder="Enter final answer..."
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  />
                ) : (
                  <div className="space-y-3">
                    <div className="rounded-lg border-2 border-gray-300 bg-gray-50 p-3">
                      <p className="text-xs font-semibold text-gray-600 mb-1">Your Answer:</p>
                      <p className="text-sm text-gray-900">
                        {practiceAnswers[q.id] || 'Not answered'}
                      </p>
                    </div>
                    <div className="rounded-lg border-2 border-green-300 bg-green-50 p-3">
                      <p className="text-xs font-semibold text-green-700 mb-1">Correct Answer:</p>
                      <p className="text-sm font-semibold text-green-900">{q.correctAnswer}</p>
                    </div>
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                      <p className="text-xs font-semibold text-blue-900 mb-2">Step-by-Step Solution:</p>
                      <ul className="space-y-1.5">
                        {q.solution.map((step, stepIdx) => (
                          <li key={stepIdx} className="flex items-start gap-2 text-sm text-blue-800">
                            <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-blue-600"></span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {!practiceSubmitted ? (
              <button
                onClick={() => setPracticeSubmitted(true)}
                className="w-full rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
              >
                Submit Practice Answers
              </button>
            ) : (
              <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4 text-center">
                <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-600" />
                <p className="text-sm font-semibold text-green-900">Practice Answers Submitted!</p>
                <p className="mt-1 text-xs text-green-700">Review the solutions above.</p>
              </div>
            )}
          </div>
        </div>

        {/* Test Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                <FileText className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Test</h2>
                <p className="text-sm text-gray-600">
                  Take the daily assessment test (20 MCQ questions)
                </p>
              </div>
            </div>
            {testSubmitted ? (
              <span className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                <CheckCircle className="h-4 w-4" />
                Completed
              </span>
            ) : (
              <span className="text-xs text-gray-500">Not Started</span>
            )}
          </div>

          {!testSubmitted ? (
            <>
              {/* Question Navigation */}
              <div className="mb-6 flex flex-wrap gap-2">
                {reasoningTestQuestions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentTestQuestion(idx)}
                    className={`h-10 w-10 rounded-lg text-sm font-semibold transition-colors ${
                      currentTestQuestion === idx
                        ? 'bg-primary-600 text-white'
                        : testAnswers[q.id] !== undefined
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              {/* Current Question */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                    Question {currentTestQuestion + 1} of {reasoningTestQuestions.length}
                  </span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {reasoningTestQuestions[currentTestQuestion].topic}
                  </span>
                </div>
                <h3 className="mb-6 text-lg font-semibold text-gray-900">
                  {reasoningTestQuestions[currentTestQuestion].question}
                </h3>
                <div className="space-y-3">
                  {reasoningTestQuestions[currentTestQuestion].options.map(
                    (option, idx) => (
                      <label
                        key={idx}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                          testAnswers[reasoningTestQuestions[currentTestQuestion].id] ===
                          idx
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`test-${reasoningTestQuestions[currentTestQuestion].id}`}
                          checked={
                            testAnswers[
                              reasoningTestQuestions[currentTestQuestion].id
                            ] === idx
                          }
                          onChange={() =>
                            setTestAnswers({
                              ...testAnswers,
                              [reasoningTestQuestions[currentTestQuestion].id]: idx,
                            })
                          }
                          className="h-4 w-4 text-primary-600"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    )
                  )}
                </div>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() =>
                      setCurrentTestQuestion(Math.max(0, currentTestQuestion - 1))
                    }
                    disabled={currentTestQuestion === 0}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentTestQuestion(
                        Math.min(
                          reasoningTestQuestions.length - 1,
                          currentTestQuestion + 1
                        )
                      )
                    }
                    disabled={currentTestQuestion === reasoningTestQuestions.length - 1}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next Question
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleTestSubmit}
                  className="rounded-lg bg-green-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                >
                  Submit Test
                </button>
              </div>
            </>
          ) : (
            <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6 text-center">
              <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                Test Completed!
              </h3>
              <p className="mb-4 text-lg font-semibold text-gray-700">
                Your Score: {calculateTestScore()}%
              </p>
              <p className="text-sm text-gray-600">
                You answered{' '}
                {
                  reasoningTestQuestions.filter(
                    (q) => testAnswers[q.id] === q.correct
                  ).length
                }{' '}
                out of {reasoningTestQuestions.length} questions correctly.
              </p>
            </div>
          )}
        </div>
      </div>
  )
}


