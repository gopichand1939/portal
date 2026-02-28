'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Award, Lock, Download, CheckCircle, Unlock } from 'lucide-react'
import { studentData } from '@/data/mockData'

export default function CertificatePage() {
  const [isUnlocked, setIsUnlocked] = useState(
    studentData.certificateStatus === 'Unlocked'
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Certificate</h1>
          <p className="mt-2 text-gray-600">
            View and download your placement preparation certificate
          </p>
        </div>

        {/* Certificate Preview */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-4xl">
            {/* Certificate Card */}
            <div
              className={`relative overflow-hidden rounded-2xl border-4 ${
                isUnlocked
                  ? 'border-primary-600 bg-gradient-to-br from-white to-primary-50'
                  : 'border-gray-300 bg-gray-50'
              } shadow-2xl`}
            >
              {/* Lock Overlay */}
              {!isUnlocked && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/90 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                      <Lock className="h-10 w-10 text-gray-400" />
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      Certificate Locked
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      Complete the course to unlock your certificate
                    </p>
                  </div>
                </div>
              )}

              {/* Certificate Content */}
              <div className="p-12 md:p-16">
                {/* Header */}
                <div className="mb-8 text-center">
                  <div className="mb-6 inline-flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-600 text-white">
                      <Award className="h-12 w-12" />
                    </div>
                  </div>
                  <h2 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
                    Certificate of Completion
                  </h2>
                  <p className="text-lg text-gray-600">
                    Placement Preparation Program
                  </p>
                </div>

                {/* College Name */}
                <div className="mb-8 text-center">
                  <p className="text-xl font-semibold text-gray-700">
                    DR. Lankapalli Bullayya College
                  </p>
                  <p className="text-lg text-gray-600">
                    College of Engineering
                  </p>
                </div>

                {/* Student Name */}
                <div className="mb-8 text-center">
                  <p className="mb-2 text-sm font-medium text-gray-600">
                    This is to certify that
                  </p>
                  <p className="text-3xl font-bold text-primary-600 md:text-4xl">
                    {studentData.name}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Roll Number: {studentData.rollNumber}
                  </p>
                </div>

                {/* Achievement */}
                <div className="mb-8 text-center">
                  <p className="text-base text-gray-700 md:text-lg">
                    has successfully completed the{' '}
                    <span className="font-semibold">
                      Placement Preparation Course
                    </span>{' '}
                    with
                  </p>
                  <div className="mt-4 inline-block rounded-lg bg-primary-100 px-6 py-3">
                    <p className="text-2xl font-bold text-primary-700 md:text-3xl">
                      Grade A
                    </p>
                    <p className="mt-1 text-sm text-primary-600">
                      Performance Score: {studentData.performanceScore}/100
                    </p>
                  </div>
                </div>

                {/* Date and Signature */}
                <div className="mt-12 flex flex-col justify-between border-t border-gray-300 pt-8 md:flex-row">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Date</p>
                    <p className="mt-1 text-gray-600">
                      {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <p className="text-sm font-medium text-gray-700">
                      Authorized Signature
                    </p>
                    <div className="mt-2 h-12 w-32 border-b-2 border-gray-400"></div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-8 text-center">
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      Certificate Unlocked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-800">
                      <Lock className="h-4 w-4" />
                      Certificate Locked
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          {isUnlocked ? (
            <>
              <button className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700">
                <Download className="h-5 w-5" />
                Download Certificate
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50">
                Share Certificate
              </button>
            </>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
              <p className="text-gray-700">
                Complete all course modules to unlock your certificate
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={() => setIsUnlocked(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                >
                  <Unlock className="h-4 w-4" />
                  Unlock Certificate (Demo)
                </button>
                <a
                  href="/daily-learning"
                  className="inline-block rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Continue Learning
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

