'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import Link from 'next/link'
import { Calculator, Brain, MessageSquare, Code2, ArrowRight } from 'lucide-react'

export default function DailyLearningPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daily Learning</h1>
          <p className="mt-2 text-gray-600">
            Select a section to start your daily learning
          </p>
        </div>

        {/* Section Selection Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Aptitude Section */}
          <Link
            href="/daily-learning/aptitude"
            className="group rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary-500 hover:shadow-lg"
          >
            <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200">
              <Calculator className="h-16 w-16 text-blue-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Aptitude
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Quantitative aptitude covering number systems, percentages, time & speed, and more
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-primary-600 group-hover:text-primary-700">
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>

          {/* Reasoning Section */}
          <Link
            href="/daily-learning/reasoning"
            className="group rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary-500 hover:shadow-lg"
          >
            <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-green-100 group-hover:bg-green-200">
              <Brain className="h-16 w-16 text-green-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Reasoning
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Logical reasoning including blood relations, coding-decoding, series, and patterns
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-primary-600 group-hover:text-primary-700">
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>

          {/* Verbal Ability Section */}
          <Link
            href="/daily-learning/verbal"
            className="group rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary-500 hover:shadow-lg"
          >
            <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-purple-100 group-hover:bg-purple-200">
              <MessageSquare className="h-16 w-16 text-purple-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Verbal Ability
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Reading comprehension, vocabulary, grammar, and verbal reasoning skills
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-primary-600 group-hover:text-primary-700">
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>

          {/* Python Programming Section */}
          <Link
            href="/daily-learning/python"
            className="group rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary-500 hover:shadow-lg"
          >
            <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-amber-100 group-hover:bg-amber-200">
              <Code2 className="h-16 w-16 text-amber-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Python Programming
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Introduction to Python, I/O, operators, loops, strings, lists, functions, and recursion
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-primary-600 group-hover:text-primary-700">
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
