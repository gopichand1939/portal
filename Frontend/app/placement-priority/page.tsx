'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import Badge from '@/components/ui/Badge'
import { Trophy, TrendingUp, Info } from 'lucide-react'
import { placementRankings, studentData } from '@/data/mockData'

export default function PlacementPriorityPage() {
  const currentStudentRank = placementRankings.findIndex(
    (r) => r.name === studentData.name
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Placement Priority
          </h1>
          <p className="mt-2 text-gray-600">
            View your ranking and placement priority status
          </p>
        </div>

        {/* Current Student Status */}
        <div className="rounded-xl border-2 border-primary-200 bg-gradient-to-r from-primary-50 to-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Your Status</p>
              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                Rank #{currentStudentRank + 1 || 'N/A'}
              </h2>
              <div className="mt-3">
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
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">Score</p>
              <p className="mt-1 text-3xl font-bold text-primary-600">
                {studentData.performanceScore}
              </p>
            </div>
          </div>
        </div>

        {/* Ranking Table */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Student Rankings
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Rankings based on overall performance and progress
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {placementRankings.map((student, index) => {
                  const isCurrentStudent = student.name === studentData.name
                  return (
                    <tr
                      key={student.rank}
                      className={`transition-colors ${
                        isCurrentStudent
                          ? 'bg-primary-50 font-semibold'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          {index < 3 ? (
                            <Trophy
                              className={`h-5 w-5 ${
                                index === 0
                                  ? 'text-yellow-500'
                                  : index === 1
                                  ? 'text-gray-400'
                                  : 'text-orange-600'
                              }`}
                            />
                          ) : (
                            <span className="text-sm font-medium text-gray-900">
                              #{student.rank}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {student.name}
                              {isCurrentStudent && (
                                <span className="ml-2 text-primary-600">
                                  (You)
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium text-gray-900">
                            {student.score}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Badge
                          variant={
                            student.priority.toLowerCase() as
                              | 'high'
                              | 'medium'
                              | 'low'
                          }
                        >
                          {student.priority} Priority
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Priority Explanation Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* High Priority */}
          <div className="rounded-xl border-2 border-red-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <Trophy className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                High Priority
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Students with high priority are top performers with excellent
              scores and consistent progress. They are prioritized for premium
              placement opportunities.
            </p>
            <div className="mt-4">
              <Badge variant="high">Score: 85+</Badge>
            </div>
          </div>

          {/* Medium Priority */}
          <div className="rounded-xl border-2 border-yellow-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Medium Priority
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Students with medium priority show good progress and performance.
              Continue learning to improve your ranking and unlock more
              opportunities.
            </p>
            <div className="mt-4">
              <Badge variant="medium">Score: 70-84</Badge>
            </div>
          </div>

          {/* Low Priority */}
          <div className="rounded-xl border-2 border-green-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Info className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Low Priority
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Students with low priority need to focus on completing daily
              learning modules and improving their performance scores to move
              up in rankings.
            </p>
            <div className="mt-4">
              <Badge variant="low">Score: Below 70</Badge>
            </div>
          </div>
        </div>

        {/* Improvement Tips */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            How to Improve Your Priority
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              'Complete daily learning modules consistently',
              'Maintain a high study streak',
              'Score well in practice tests and assessments',
              'Improve overall course completion percentage',
            ].map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                  <span className="text-xs font-semibold">{index + 1}</span>
                </div>
                <p className="text-sm text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}


