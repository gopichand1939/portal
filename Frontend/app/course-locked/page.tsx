'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import RazorpayCheckoutButton from '@/components/payment/RazorpayCheckoutButton'
import { Lock, AlertCircle } from 'lucide-react'

export default function CourseLockedPage() {
  const router = useRouter()

  useEffect(() => {
    try {
      const unlocked = localStorage.getItem('courseUnlocked') === 'true'
      if (unlocked) router.replace('/course-details')
    } catch {}
  }, [router])

  return (
    <DashboardLayout>
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <div className="w-full max-w-2xl">
          {/* Locked Course Card */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
            {/* Blur Overlay */}
            <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm">
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                {/* Lock Icon */}
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                  <Lock className="h-12 w-12 text-gray-400" />
                </div>

                {/* Message */}
                <h2 className="text-2xl font-bold text-gray-900">
                  Course Locked
                </h2>
                <p className="mt-3 max-w-md text-gray-600">
                  Complete Payment to Unlock Placement Course
                </p>

                {/* Payment Button */}
                <RazorpayCheckoutButton />

                {/* Info Message */}
                <div className="mt-6 flex items-start gap-3 rounded-lg border border-primary-200 bg-primary-50 p-4 text-left">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
                  <div>
                    <p className="text-sm font-semibold text-primary-900">
                      Payment Required
                    </p>
                    <p className="mt-1 text-xs text-primary-700">
                      Access to the full placement course requires payment
                      completion. Once payment is verified, you'll have full
                      access to all learning modules, practice tests, and
                      certificates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Blurred Course Content (Behind Overlay) */}
            <div className="p-8 opacity-30 blur-sm">
              <div className="mb-6">
                <div className="mb-4 h-8 w-3/4 rounded bg-gray-200"></div>
                <div className="h-4 w-1/2 rounded bg-gray-200"></div>
              </div>

              <div className="mb-6 aspect-video rounded-lg bg-gray-200"></div>

              <div className="space-y-3">
                <div className="h-4 rounded bg-gray-200"></div>
                <div className="h-4 rounded bg-gray-200"></div>
                <div className="h-4 w-5/6 rounded bg-gray-200"></div>
                <div className="h-4 w-4/6 rounded bg-gray-200"></div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="h-32 rounded-lg bg-gray-200"></div>
                <div className="h-32 rounded-lg bg-gray-200"></div>
              </div>
            </div>
          </div>

          {/* Course Info */}
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              What's Included
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary-600"></div>
                Complete placement preparation course
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary-600"></div>
                Daily learning modules and practice tests
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary-600"></div>
                Performance tracking and analytics
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary-600"></div>
                Placement priority assessment
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary-600"></div>
                Certificate of completion
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}


