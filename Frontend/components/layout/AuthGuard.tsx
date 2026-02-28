'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const AUTH_TOKEN_KEY = 'token'

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN_KEY) : null
    if (!token) {
      router.replace('/login')
      return
    }
    setAllowed(true)
  }, [router])

  if (!allowed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Checking login…</p>
      </div>
    )
  }

  return <>{children}</>
}
