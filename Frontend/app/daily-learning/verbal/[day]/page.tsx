'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
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
  dailySchedule,
} from '@/data/mockData'

export default function VerbalDayPage() {
  const params = useParams()
  const day = params?.day as string
  const dayNumber = parseInt(day?.replace('day-', '') || '1')

  const overallProgress =
    (dailyProgress.learn.progress +
      dailyProgress.practice.progress +
      dailyProgress.test.progress) /
    3

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/daily-learning/verbal"
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Verbal Ability - Day {dayNumber}
            </h1>
            <p className="mt-2 text-gray-600">
              Complete today's verbal ability learning modules
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Learn</h2>
                <p className="text-sm text-gray-600">
                  Study verbal ability topics and concepts
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
                Verbal Ability Topics
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Today you will learn about reading comprehension, vocabulary, grammar, and verbal reasoning.
              </p>
              <div className="space-y-3">
                <div className="rounded-lg bg-white p-4">
                  <h4 className="mb-2 font-semibold text-gray-900">Reading Comprehension</h4>
                  <p className="text-sm text-gray-700">
                    Understanding and analyzing written passages to answer questions.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <h4 className="mb-2 font-semibold text-gray-900">Vocabulary</h4>
                  <p className="text-sm text-gray-700">
                    Building vocabulary through word meanings, synonyms, and antonyms.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <h4 className="mb-2 font-semibold text-gray-900">Grammar</h4>
                  <p className="text-sm text-gray-700">
                    Rules of English grammar including tenses, parts of speech, and sentence structure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Message */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-center py-8">
            <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Practice & Test Sections
            </h3>
            <p className="text-sm text-gray-600">
              Practice questions and test sections for Verbal Ability will be available soon.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}


