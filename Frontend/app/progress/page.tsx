'use client'

import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { getDashboardProgress } from '@/lib/progressApi'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']

export default function ProgressPage() {
  const [progress, setProgress] = useState<{
    aptitude: number
    verbal: number
    reasoning: number
    python: number
  } | null>(null)

  useEffect(() => {
    getDashboardProgress()
      .then((data) => {
        if (data && typeof data === 'object') {
          setProgress({
            aptitude: Math.min(100, Math.max(0, Math.round(Number(data.aptitude) ?? 0))),
            verbal: Math.min(100, Math.max(0, Math.round(Number(data.verbal) ?? 0))),
            reasoning: Math.min(100, Math.max(0, Math.round(Number(data.reasoning) ?? 0))),
            python: Math.min(100, Math.max(0, Math.round(Number(data.python) ?? 0))),
          })
        }
      })
      .catch(() => {})
  }, [])

  // Derived from API only: overall = average of 4 subjects; in-progress = remainder
  const values = progress ? Object.values(progress) : []
  const completed =
    values.length === 4
      ? Math.min(100, Math.max(0, Math.round(values.reduce((a, b) => a + b, 0) / 4)))
      : 0
  const inProgress = Math.max(0, 100 - completed)

  const pieData = [
    ...(completed > 0 ? [{ name: 'Completed', value: completed }] : []),
    ...(inProgress > 0 ? [{ name: 'In Progress', value: inProgress }] : []),
  ]

  const total = pieData.reduce((s, d) => s + d.value, 0)
  const pieDataWithPct =
    total > 0 ? pieData.map((d) => ({ ...d, pct: Math.round((d.value / total) * 100) })) : []

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Progress Tracking</h1>
          <p className="mt-2 text-gray-600">
            Monitor your learning progress from the API
          </p>
        </div>

        {progress === null ? (
          <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-gray-500">Loading progress…</p>
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">Progress</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieDataWithPct}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ pct }) => (pct != null ? `${pct}%` : '')}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieDataWithPct.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, _name: string, props: { payload?: { pct?: number } }) =>
                    props?.payload?.pct != null ? `${props.payload.pct}%` : `${value}%`
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
