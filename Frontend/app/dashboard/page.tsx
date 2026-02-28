'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import StatCard from '@/components/ui/StatCard'
import ProgressCard from '@/components/ui/ProgressCard'
import Badge from '@/components/ui/Badge'
import {
  TrendingUp,
  Flame,
  Calendar,
  Clock,
  Award,
  Lock,
  Unlock,
  Calculator,
  Brain,
  MessageSquare,
  Code2,
} from 'lucide-react'
import { studentData } from '@/data/mockData'
import { useLearningProgress } from '@/contexts/LearningProgressContext'
import { aptitudeModule, reasoningModule, verbalModule, pythonModule, getLeafIds } from '@/data/learningModules'

export default function DashboardPage() {
  const { completedIds } = useLearningProgress()
  const aptitudeLeaves = getLeafIds(aptitudeModule)
  const reasoningLeaves = getLeafIds(reasoningModule)
  const verbalLeaves = getLeafIds(verbalModule)
  const pythonLeaves = getLeafIds(pythonModule)
  const progressAptitude = aptitudeLeaves.length
    ? Math.round((aptitudeLeaves.filter((id) => completedIds.has(id)).length / aptitudeLeaves.length) * 100)
    : 0
  const progressReasoning = reasoningLeaves.length
    ? Math.round((reasoningLeaves.filter((id) => completedIds.has(id)).length / reasoningLeaves.length) * 100)
    : 0
  const progressVerbal = verbalLeaves.length
    ? Math.round((verbalLeaves.filter((id) => completedIds.has(id)).length / verbalLeaves.length) * 100)
    : 0
  const progressPython = pythonLeaves.length
    ? Math.round((pythonLeaves.filter((id) => completedIds.has(id)).length / pythonLeaves.length) * 100)
    : 0
  const totalLeaves = aptitudeLeaves.length + reasoningLeaves.length + verbalLeaves.length + pythonLeaves.length
  const overallProgress = totalLeaves
    ? Math.round(
        ((aptitudeLeaves.filter((id) => completedIds.has(id)).length +
          reasoningLeaves.filter((id) => completedIds.has(id)).length +
          verbalLeaves.filter((id) => completedIds.has(id)).length +
          pythonLeaves.filter((id) => completedIds.has(id)).length) /
          totalLeaves) *
          100
      )
    : 0

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {studentData.name}! Here's your learning overview.
          </p>
        </div>

        {/* Module completion % - shown on dashboard */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Module completion</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100">
                <Calculator className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Quantitative Aptitude</p>
                <p className="text-xl font-bold text-gray-900">{progressAptitude}% complete</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100">
                <Brain className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Logical Reasoning</p>
                <p className="text-xl font-bold text-gray-900">{progressReasoning}% complete</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100">
                <MessageSquare className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Verbal Ability</p>
                <p className="text-xl font-bold text-gray-900">{progressVerbal}% complete</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                <Code2 className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Python Programming</p>
                <p className="text-xl font-bold text-gray-900">{progressPython}% complete</p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-500">Overall: {overallProgress}% of all modules complete</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Overall Progress"
            value={`${overallProgress}%`}
            icon={TrendingUp}
            trend="Based on completed modules"
          />
          <StatCard
            title="Study Streak"
            value={`${studentData.studyStreak} days`}
            icon={Flame}
            iconColor="text-orange-600"
            trend="Keep it up!"
          />
          <StatCard
            title="Completed Days"
            value={studentData.completedDays}
            icon={Calendar}
            iconColor="text-green-600"
          />
          <StatCard
            title="Remaining Days"
            value={studentData.remainingDays}
            icon={Clock}
            iconColor="text-blue-600"
          />
          <StatCard
            title="Performance Score"
            value={`${studentData.performanceScore}/100`}
            icon={Award}
            iconColor="text-purple-600"
          />
        </div>

        {/* Priority and Certificate Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Placement Priority Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              Placement Priority
            </h3>
            <div className="mt-4">
              <Badge
                variant={
                  studentData.placementPriority.toLowerCase() as
                    | 'high'
                    | 'medium'
                    | 'low'
                }
              >
                {studentData.placementPriority} Priority
              </Badge>
              <p className="mt-3 text-sm text-gray-600">
                Your current placement priority is{' '}
                <span className="font-semibold text-gray-900">
                  {studentData.placementPriority}
                </span>
                . Continue your daily learning to improve your ranking.
              </p>
            </div>
          </div>

          {/* Certificate Status Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              Certificate Status
            </h3>
            <div className="mt-4 flex items-center gap-4">
              {studentData.certificateStatus === 'Locked' ? (
                <>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <Lock className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Locked</p>
                    <p className="text-sm text-gray-600">
                      Complete the course to unlock your certificate
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <Unlock className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Unlocked</p>
                    <p className="text-sm text-gray-600">
                      Your certificate is ready for download
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Progress Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ProgressCard
            title="Course Completion"
            progress={overallProgress}
            color="bg-primary-600"
          />
          <ProgressCard
            title="Practice Completion"
            progress={75}
            color="bg-green-600"
          />
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="/daily-learning"
              className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center transition-colors hover:bg-gray-100"
            >
              <p className="font-medium text-gray-900">Start Learning</p>
              <p className="mt-1 text-xs text-gray-600">Continue today's module</p>
            </a>
            <a
              href="/progress"
              className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center transition-colors hover:bg-gray-100"
            >
              <p className="font-medium text-gray-900">View Progress</p>
              <p className="mt-1 text-xs text-gray-600">Track your performance</p>
            </a>
            <a
              href="/certificate"
              className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center transition-colors hover:bg-gray-100"
            >
              <p className="font-medium text-gray-900">Certificate</p>
              <p className="mt-1 text-xs text-gray-600">View certificate status</p>
            </a>
            <a
              href="/placement-priority"
              className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center transition-colors hover:bg-gray-100"
            >
              <p className="font-medium text-gray-900">Rankings</p>
              <p className="mt-1 text-xs text-gray-600">See placement priority</p>
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}


