'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import ProgressCard from '@/components/ui/ProgressCard'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { performanceData, studyConsistency, courseProgress } from '@/data/mockData'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']

export default function ProgressPage() {
  const pieData = [
    { name: 'Completed', value: courseProgress.completedCourses },
    { name: 'In Progress', value: courseProgress.inProgress },
    { name: 'Locked', value: courseProgress.locked },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Progress Tracking</h1>
          <p className="mt-2 text-gray-600">
            Monitor your learning progress and performance metrics
          </p>
        </div>

        {/* Circular Progress Indicator */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">
              Overall Course Progress
            </h3>
            <div className="flex items-center justify-center">
              <div className="relative">
                <svg className="h-48 w-48 -rotate-90 transform">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#e5e7eb"
                    strokeWidth="16"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#3b82f6"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={`${(courseProgress.completedCourses / courseProgress.totalCourses) * 552.92} 552.92`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">
                    {Math.round(
                      (courseProgress.completedCourses /
                        courseProgress.totalCourses) *
                        100
                    )}
                    %
                  </span>
                  <span className="text-sm text-gray-600">Complete</span>
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {courseProgress.completedCourses}
                </p>
                <p className="text-xs text-gray-600">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {courseProgress.inProgress}
                </p>
                <p className="text-xs text-gray-600">In Progress</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-400">
                  {courseProgress.locked}
                </p>
                <p className="text-xs text-gray-600">Locked</p>
              </div>
            </div>
          </div>

          {/* Course Distribution */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">
              Course Distribution
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Graph */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-semibold text-gray-900">
            Performance Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Study Consistency Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-semibold text-gray-900">
            Study Consistency (Hours per Day)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studyConsistency}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="day"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="hours" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ProgressCard
            title="Course Completion"
            progress={60}
            color="bg-primary-600"
          />
          <ProgressCard
            title="Practice Completion"
            progress={75}
            color="bg-green-600"
          />
          <ProgressCard
            title="Test Completion"
            progress={55}
            color="bg-yellow-600"
          />
          <ProgressCard
            title="Overall Performance"
            progress={85}
            color="bg-purple-600"
          />
        </div>
      </div>
    </DashboardLayout>
  )
}


