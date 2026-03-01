'use client'

import { useState, useCallback, useEffect } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'
import AuthGuard from '@/components/layout/AuthGuard'
import { LearningProgressProvider } from '@/contexts/LearningProgressContext'
import { API_AUTH_PROFILE } from '@/lib/constants'

function fetchAndStoreProfile() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  if (!token) return
  fetch(API_AUTH_PROFILE, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (data && typeof data === 'object' && (data.id != null || data.name != null || data.email != null)) {
        typeof window !== 'undefined' && localStorage.setItem('user', JSON.stringify({ id: data.id, name: data.name, email: data.email }))
      }
    })
    .catch(() => {})
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const onClose = useCallback(() => setSidebarOpen(false), [])
  const onMenuClick = useCallback(() => setSidebarOpen(true), [])

  useEffect(() => {
    fetchAndStoreProfile()
  }, [])

  return (
    <AuthGuard>
      <LearningProgressProvider>
        <div className="min-h-screen bg-gray-50">
          <Sidebar isOpen={sidebarOpen} onClose={onClose} />
          <Navbar onMenuClick={onMenuClick} />
          <main className="pt-16 lg:pl-64">
            <div className="p-4 lg:p-6">{children}</div>
          </main>
        </div>
      </LearningProgressProvider>
    </AuthGuard>
  )
}

