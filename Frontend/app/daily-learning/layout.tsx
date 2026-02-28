'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'

export default function DailyLearningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
