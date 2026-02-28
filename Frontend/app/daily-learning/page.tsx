'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import Link from 'next/link'
import {
  Calculator,
  Brain,
  MessageSquare,
  Code2,
  ArrowRight,
  BookOpen,
  PenLine,
  ClipboardCheck,
} from 'lucide-react'
import { useLearningProgress } from '@/contexts/LearningProgressContext'
import {
  aptitudeModule,
  reasoningModule,
  verbalModule,
  pythonModule,
  getLeafIds,
} from '@/data/learningModules'

const SUBJECTS = [
  {
    slug: 'aptitude',
    href: '/daily-learning/aptitude',
    label: 'Aptitude',
    description: 'Numbers, percentages, time & work, ratios, and more',
    icon: Calculator,
    color: 'blue',
    module: aptitudeModule,
  },
  {
    slug: 'reasoning',
    href: '/daily-learning/reasoning',
    label: 'Reasoning',
    description: 'Blood relations, coding, puzzles, syllogisms, and patterns',
    icon: Brain,
    color: 'emerald',
    module: reasoningModule,
  },
  {
    slug: 'verbal',
    href: '/daily-learning/verbal',
    label: 'Verbal Ability',
    description: 'RC, grammar, vocabulary, and sentence correction',
    icon: MessageSquare,
    color: 'violet',
    module: verbalModule,
  },
  {
    slug: 'python',
    href: '/daily-learning/python',
    label: 'Python',
    description: 'Basics, loops, strings, lists, functions, and recursion',
    icon: Code2,
    color: 'amber',
    module: pythonModule,
  },
] as const

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    icon: 'text-blue-600',
    progress: 'bg-blue-500',
    hover: 'hover:border-blue-400 hover:shadow-blue-100',
    badge: 'bg-blue-100 text-blue-700',
  },
  emerald: {
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    icon: 'text-emerald-600',
    progress: 'bg-emerald-500',
    hover: 'hover:border-emerald-400 hover:shadow-emerald-100',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  violet: {
    bg: 'bg-violet-50',
    iconBg: 'bg-violet-100',
    icon: 'text-violet-600',
    progress: 'bg-violet-500',
    hover: 'hover:border-violet-400 hover:shadow-violet-100',
    badge: 'bg-violet-100 text-violet-700',
  },
  amber: {
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    icon: 'text-amber-600',
    progress: 'bg-amber-500',
    hover: 'hover:border-amber-400 hover:shadow-amber-100',
    badge: 'bg-amber-100 text-amber-700',
  },
} as const

export default function DailyLearningPage() {
  const { completedIds } = useLearningProgress()

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Daily Learning
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Choose a subject and follow Study → Exercise → Assignment
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {SUBJECTS.map((subject) => {
            const leafIds = getLeafIds(subject.module)
            const completed = leafIds.filter((id) => completedIds.has(id)).length
            const total = leafIds.length
            const percent = total > 0 ? Math.round((completed / total) * 100) : 0
            const colors = colorClasses[subject.color]
            const Icon = subject.icon

            return (
              <Link
                key={subject.slug}
                href={subject.href}
                className={`group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 ${colors.hover} hover:shadow-lg`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${colors.iconBg} transition-transform group-hover:scale-105`}
                  >
                    <Icon className={`h-7 w-7 ${colors.icon}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {subject.label}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      {subject.description}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${colors.badge}`}
                      >
                        <BookOpen className="h-3.5 w-3" />
                        Study
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${colors.badge}`}
                      >
                        <PenLine className="h-3.5 w-3" />
                        Exercise
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${colors.badge}`}
                      >
                        <ClipboardCheck className="h-3.5 w-3" />
                        Assignment
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Today&apos;s progress</span>
                        <span className="font-medium text-gray-700">
                          {percent}%
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className={`h-full rounded-full ${colors.progress} transition-all duration-500`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="hidden h-5 w-5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-1 sm:block" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
