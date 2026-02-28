'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { BookOpen, FileText, Brain, TestTube } from 'lucide-react'

const courses = [
  {
    id: 1,
    title: 'Test Based Learning',
    description:
      'Learn with our innovative approach with a unique mix of practice and assessments. Take tests, apply your learning and improve your skills through continuous evaluation.',
    icon: TestTube,
    color: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    id: 2,
    title: 'Quantitative Aptitude',
    description:
      "In this course, you'll learn how to solve aptitude questions based on different concepts including number systems, percentages, time & speed, and more.",
    icon: BookOpen,
    color: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 3,
    title: 'Logical Reasoning',
    description:
      'In this course you will develop a strong foundation in logical reasoning, enabling you to approach complex issues with analytical thinking and problem-solving skills.',
    icon: Brain,
    color: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
]

export default function CourseDetailsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            View All Course Details
          </h1>
          <p className="mt-2 text-gray-600">
            Explore all available courses and learning modules
          </p>
        </div>

        {/* Section Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary-800 uppercase">
            Professional Readiness 
          </h2>
        </div>

        {/* Course Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {courses.map((course) => {
            const Icon = course.icon
            return (
              <div
                key={course.id}
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary-300 hover:shadow-lg"
              >
                {/* Icon/Illustration */}
                <div
                  className={`mb-4 flex h-32 items-center justify-center rounded-lg ${course.color} transition-transform group-hover:scale-105`}
                >
                  <Icon className={`h-16 w-16 ${course.iconColor}`} />
                </div>

                {/* Course Title */}
                <h3 className="mb-3 text-xl font-bold text-primary-800">
                  {course.title}
                </h3>

                {/* Course Description */}
                <p className="text-sm leading-relaxed text-gray-600">
                  {course.description}
                </p>

                {/* View Details Button */}
                <button className="mt-4 w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700">
                  View Details
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
