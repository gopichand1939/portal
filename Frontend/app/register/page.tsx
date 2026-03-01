'use client'

import { useState, useLayoutEffect, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Lock, Mail, User, BookOpen, UserCircle } from 'lucide-react'
import { API_AUTH_REGISTER, API_COLLEGE_CHECK } from '@/lib/constants'

type Student = {
  registration_number: string
  student_name: string
  department: string
  year: number
}

export default function RegisterPage() {
  const router = useRouter()
  const [isBullayyaStudent, setIsBullayyaStudent] = useState<boolean | null>(null)
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [student, setStudent] = useState<Student | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checkLoading, setCheckLoading] = useState(false)
  const [error, setError] = useState('')
  const [verifyMessage, setVerifyMessage] = useState<'success' | 'error' | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useLayoutEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token) {
      router.replace('/dashboard')
    }
  }, [router])

  // Clear student and verification when registration number changes
  useEffect(() => {
    if (!isBullayyaStudent) return
    setStudent(null)
    setIsVerified(false)
    setVerifyMessage(null)
    setError('')
  }, [registrationNumber, isBullayyaStudent])

  const checkRegistration = useCallback(async (regNum: string) => {
    const trimmed = regNum.trim()
    if (!trimmed) {
      setStudent(null)
      setIsVerified(false)
      setVerifyMessage(null)
      return
    }
    setCheckLoading(true)
    setError('')
    setVerifyMessage(null)
    try {
      const res = await fetch(`${API_COLLEGE_CHECK}/${encodeURIComponent(trimmed)}`)
      const data = await res.json().catch(() => ({}))
      if (res.ok && data?.exists === true && data?.student) {
        setStudent(data.student)
        setIsVerified(true)
        setVerifyMessage('success')
      } else {
        setStudent(null)
        setIsVerified(false)
        setVerifyMessage('error')
        setError(data?.error || 'Invalid registration number')
      }
    } catch {
      setStudent(null)
      setIsVerified(false)
      setVerifyMessage('error')
      setError('Could not verify registration. Try again.')
    } finally {
      setCheckLoading(false)
    }
  }, [])

  // Only trigger API when full 12-digit registration number is entered
  const REG_LENGTH = 12
  useEffect(() => {
    if (!isBullayyaStudent) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    const trimmed = registrationNumber.trim()
    if (!trimmed || trimmed.length !== REG_LENGTH) {
      if (trimmed.length !== REG_LENGTH) {
        setStudent(null)
        setIsVerified(false)
        setVerifyMessage(null)
      }
      return
    }
    debounceRef.current = setTimeout(() => {
      checkRegistration(trimmed)
    }, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [registrationNumber, isBullayyaStudent, checkRegistration])

  const handleBlurRegistration = () => {
    const trimmed = registrationNumber.trim()
    if (!isBullayyaStudent || !trimmed || trimmed.length !== REG_LENGTH) return
    checkRegistration(trimmed)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const body = isBullayyaStudent
        ? {
            email,
            password,
            isBullayyaStudent: true,
            registrationNumber: registrationNumber.trim(),
          }
        : {
            name: name.trim(),
            email,
            password,
            isBullayyaStudent: false,
          }
      const res = await fetch(API_AUTH_REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || 'Registration failed')
        setLoading(false)
        return
      }
      setLoading(false)
      window.location.href = '/login?registered=1'
    } catch {
      setError('Network error. Is the backend running?')
      setLoading(false)
    }
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const passwordValid = password.length >= 6
  const canSubmitBullayya = isVerified && emailValid && passwordValid && !checkLoading
  const canSubmitNormal = !isBullayyaStudent && name.trim().length > 0 && emailValid && passwordValid
  const canSubmit = isBullayyaStudent === true ? canSubmitBullayya : isBullayyaStudent === false ? canSubmitNormal : false

  if (isBullayyaStudent === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-50 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/carousel/plogo.png"
                alt="College Logo"
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
              />
              <div className="text-left">
                <h1 className="text-xl font-bold text-gray-900 leading-tight">
                  DR. Lankapalli Bullayya College
                </h1>
                <p className="text-sm text-gray-600">Placement Learning Portal</p>
              </div>
            </Link>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Register</h2>
              <p className="mt-2 text-sm text-gray-600">
                Choose your registration type
              </p>
            </div>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  setIsBullayyaStudent(true)
                  setError('')
                  setRegistrationNumber('')
                  setStudent(null)
                  setIsVerified(false)
                  setVerifyMessage(null)
                }}
                className="flex w-full items-center gap-3 rounded-xl border-2 border-gray-200 bg-white p-4 text-left transition-colors hover:border-primary-300 hover:bg-primary-50"
              >
                <BookOpen className="h-8 w-8 text-primary-600" />
                <div>
                  <p className="font-semibold text-gray-900">Bullayya College Student</p>
                  <p className="text-sm text-gray-600">Verify with college registration number</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsBullayyaStudent(false)
                  setError('')
                  setRegistrationNumber('')
                  setStudent(null)
                  setIsVerified(false)
                }}
                className="flex w-full items-center gap-3 rounded-xl border-2 border-gray-200 bg-white p-4 text-left transition-colors hover:border-primary-300 hover:bg-primary-50"
              >
                <UserCircle className="h-8 w-8 text-gray-600" />
                <div>
                  <p className="font-semibold text-gray-900">Non-Bullayya User</p>
                  <p className="text-sm text-gray-600">Register with name, email and password</p>
                </div>
              </button>
            </div>
            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-primary-600 hover:text-primary-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/carousel/plogo.png"
              alt="College Logo"
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
            />
            <div className="text-left">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                DR. Lankapalli Bullayya College
              </h1>
              <p className="text-sm text-gray-600">Placement Learning Portal</p>
            </div>
          </Link>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Register</h2>
              <p className="mt-1 text-sm text-gray-600">
                {isBullayyaStudent ? 'Bullayya College Student' : 'Create an account'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsBullayyaStudent(null)
                setError('')
                setRegistrationNumber('')
                setStudent(null)
                setName('')
                setEmail('')
                setPassword('')
                setIsVerified(false)
                setVerifyMessage(null)
              }}
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Change type
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {verifyMessage === 'success' && (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
              Registration verified
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isBullayyaStudent && (
              <>
                <div>
                  <label
                    htmlFor="registrationNumber"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Registration Number (12 digits)
                  </label>
                  <input
                    id="registrationNumber"
                    type="text"
                    inputMode="numeric"
                    maxLength={12}
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value.replace(/\D/g, ''))}
                    onBlur={handleBlurRegistration}
                    placeholder="e.g. 321136412101"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 px-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  />
                  {checkLoading && (
                    <p className="mt-1 text-xs text-gray-500">Checking registration…</p>
                  )}
                </div>
                {student && (
                  <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-medium text-gray-500">Verified details (read-only)</p>
                    <div>
                      <label className="text-xs text-gray-500">Student Name</label>
                      <input
                        type="text"
                        readOnly
                        value={student.student_name}
                        className="mt-0.5 w-full rounded border border-gray-200 bg-white py-2 px-3 text-sm text-gray-700 read-only:cursor-default read-only:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Department</label>
                      <input
                        type="text"
                        readOnly
                        value={student.department}
                        className="mt-0.5 w-full rounded border border-gray-200 bg-white py-2 px-3 text-sm text-gray-700 read-only:cursor-default read-only:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Year</label>
                      <input
                        type="text"
                        readOnly
                        value={String(student.year)}
                        className="mt-0.5 w-full rounded border border-gray-200 bg-white py-2 px-3 text-sm text-gray-700 read-only:cursor-default read-only:bg-gray-100"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {!isBullayyaStudent && (
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !canSubmit}
              className="w-full rounded-lg bg-primary-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-60"
            >
              {loading ? 'Creating account…' : 'Register'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary-600 hover:text-primary-700">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-primary-600 hover:text-primary-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
