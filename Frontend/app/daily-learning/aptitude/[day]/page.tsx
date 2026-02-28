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
import { aptitudeDailyContent } from '@/data/aptitude'
import {
  dailyProgress,
  dailySchedule,
} from '@/data/mockData'
import type { AptitudeDayContent } from '@/data/aptitude'

export default function AptitudeDayPage() {
  const params = useParams()
  const day = params?.day as string
  const dayNumber = parseInt(day?.replace('day-', '') || '1')

  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, string | number>>(
    {}
  )
  const [practiceSubmitted, setPracticeSubmitted] = useState(false)
  const [testAnswers, setTestAnswers] = useState<{ [key: number]: number }>({})
  const [testSubmitted, setTestSubmitted] = useState(false)
  const [currentTestQuestion, setCurrentTestQuestion] = useState(0)

  const dayContent: AptitudeDayContent =
    (aptitudeDailyContent as Record<number, AptitudeDayContent>)[dayNumber] ??
    aptitudeDailyContent[1]

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
    aptitudeTestQuestions.forEach((q) => {
      if (testAnswers[q.id] === q.correct) {
        correct++
      }
    })
    return Math.round((correct / aptitudeTestQuestions.length) * 100)
  }

  const aptitudeTopics = dayContent.topics
  const aptitudePracticeQuestions = dayContent.practiceQuestions
  const aptitudeTestQuestions = dayContent.testQuestions

  return (
    <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/daily-learning/aptitude"
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Aptitude - Day {dayNumber}
            </h1>
            <p className="mt-2 text-gray-600">
              Complete today's aptitude learning modules
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
{dailySchedule.map((item: any, index: number) => (
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Learn</h2>
                <p className="text-sm text-gray-600">
                  Study aptitude topics and concepts
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
{aptitudeTopics.map((topic: any) => (
              <div
                key={topic.id}
                className="rounded-lg border border-gray-200 bg-gray-50 p-6 transition-all hover:border-primary-300 hover:shadow-md"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {topic.description}
                  </p>
                </div>

                <div className="space-y-4 border-t border-gray-200 pt-4">
                  {/* Key Concepts */}
                  <div>
                    <h4 className="mb-4 text-lg font-semibold text-gray-900">
                      Key Concepts:
                    </h4>
                    <div className="space-y-6">
{topic.concepts.map((concept: any, idx: number) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                        >
                          <h5 className="mb-3 text-base font-semibold text-primary-700">
                            {typeof concept === 'string' ? concept : concept.name}
                          </h5>
                          
                          {typeof concept !== 'string' && (
                            <>
                              {/* Explanation */}
                              <div className="mb-4">
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  {concept.explanation}
                                </p>
                              </div>

                              {/* Important Formulas */}
                              <div className="mb-4 rounded-lg bg-blue-50 p-4">
                                <h6 className="mb-2 text-sm font-semibold text-blue-900">
                                  Important Formulas:
                                </h6>
                                <ul className="space-y-1.5">
{concept.formulas.map((formula: string, fIdx: number) => (
                                    <li
                                      key={fIdx}
                                      className="flex items-start gap-2 text-sm text-blue-800"
                                    >
                                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-blue-600"></span>
                                      <span className="font-mono">{formula}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Notes */}
                              <div className="rounded-lg bg-yellow-50 p-4">
                                <h6 className="mb-2 text-sm font-semibold text-yellow-900">
                                  Important Notes:
                                </h6>
                                <ul className="space-y-1.5">
{concept.notes.map((note: string, nIdx: number) => (
                                    <li
                                      key={nIdx}
                                      className="flex items-start gap-2 text-sm text-yellow-800"
                                    >
                                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-yellow-600"></span>
                                      <span>{note}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Study Materials */}
                  <div>
                    <h4 className="mb-3 text-sm font-semibold text-gray-900">
                      Study Materials:
                    </h4>
                    <div className="space-y-2">
{topic.materials.map((material: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 rounded-md bg-white p-3 text-sm text-gray-700 shadow-sm"
                        >
                          <FileText className="h-4 w-4 text-primary-600" />
                          {material}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                  Solve {aptitudePracticeQuestions.length} practice questions
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
{aptitudePracticeQuestions.map((q: any) => {
              const anyQ = q as any
              const isMcq = Array.isArray(anyQ.options)
              const correctOptionIndex =
                typeof anyQ.correctOptionIndex === 'number'
                  ? (anyQ.correctOptionIndex as number)
                  : undefined
              const selectedOptionIndex =
                typeof practiceAnswers[q.id] === 'number'
                  ? (practiceAnswers[q.id] as number)
                  : undefined

              return (
                <div
                  key={q.id}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                      Question {q.id} of {aptitudePracticeQuestions.length}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      5 min
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                      {q.topic}
                    </span>
                  </div>
                  <h3 className="mb-3 text-base font-semibold text-gray-900">
                    {q.question}
                  </h3>

                  {!practiceSubmitted ? (
                    isMcq ? (
                      <div className="space-y-3">
                        {anyQ.options.map((option: string, idx: number) => (
                          <label
                            key={idx}
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                              selectedOptionIndex === idx
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`practice-${q.id}`}
                              checked={selectedOptionIndex === idx}
                              onChange={() =>
                                setPracticeAnswers({
                                  ...practiceAnswers,
                                  [q.id]: idx,
                                })
                              }
                              className="h-4 w-4 text-primary-600"
                            />
                            <span className="text-sm text-gray-700">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={(practiceAnswers[q.id] as string) || ''}
                        onChange={(e) =>
                          setPracticeAnswers({
                            ...practiceAnswers,
                            [q.id]: e.target.value,
                          })
                        }
                        placeholder="Enter final answer..."
                        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                      />
                    )
                  ) : (
                    <div className="space-y-3">
                      <div className="rounded-lg border-2 border-gray-300 bg-gray-50 p-3">
                        <p className="text-xs font-semibold text-gray-600 mb-1">
                          Your Answer:
                        </p>
                        <p className="text-sm text-gray-900">
                          {isMcq
                            ? selectedOptionIndex !== undefined
                              ? anyQ.options[selectedOptionIndex]
                              : 'Not answered'
                            : (practiceAnswers[q.id] as string) ||
                              'Not answered'}
                        </p>
                      </div>
                      <div className="rounded-lg border-2 border-green-300 bg-green-50 p-3">
                        <p className="text-xs font-semibold text-green-700 mb-1">
                          Correct Answer:
                        </p>
                        <p className="text-sm font-semibold text-green-900">
                          {isMcq && correctOptionIndex !== undefined
                            ? anyQ.options[correctOptionIndex]
                            : q.correctAnswer}
                        </p>
                      </div>
                      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                        <p className="text-xs font-semibold text-blue-900 mb-2">
                          Step-by-Step Solution:
                        </p>
                        <ul className="space-y-1.5">
{q.solution.map((step: string, stepIdx: number) => (
                            <li
                              key={stepIdx}
                              className="flex items-start gap-2 text-sm text-blue-800"
                            >
                              <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-blue-600"></span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
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
                  Take the daily assessment test ({aptitudeTestQuestions.length} MCQ questions)
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
{aptitudeTestQuestions.map((q: any, idx: number) => (
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
                    Question {currentTestQuestion + 1} of {aptitudeTestQuestions.length}
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {aptitudeTestQuestions[currentTestQuestion].topic}
                  </span>
                </div>
                <h3 className="mb-6 text-lg font-semibold text-gray-900">
                  {aptitudeTestQuestions[currentTestQuestion].question}
                </h3>
                <div className="space-y-3">
{aptitudeTestQuestions[currentTestQuestion].options.map(
  (option: string, idx: number) => (

                      <label
                        key={idx}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                          testAnswers[aptitudeTestQuestions[currentTestQuestion].id] ===
                          idx
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`test-${aptitudeTestQuestions[currentTestQuestion].id}`}
                          checked={
                            testAnswers[
                              aptitudeTestQuestions[currentTestQuestion].id
                            ] === idx
                          }
                          onChange={() =>
                            setTestAnswers({
                              ...testAnswers,
                              [aptitudeTestQuestions[currentTestQuestion].id]: idx,
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
                          aptitudeTestQuestions.length - 1,
                          currentTestQuestion + 1
                        )
                      )
                    }
                    disabled={currentTestQuestion === aptitudeTestQuestions.length - 1}
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
                  aptitudeTestQuestions.filter(
                    (q) => testAnswers[q.id] === q.correct
                  ).length
                }{' '}
                out of {aptitudeTestQuestions.length} questions correctly.
              </p>
            </div>
          )}
        </div>
      </div>
  )
}


