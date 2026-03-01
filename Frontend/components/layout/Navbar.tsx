'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Bell, Search, User, Menu, LogOut, ChevronDown } from 'lucide-react'
import { API_AUTH_PROFILE } from '@/lib/constants'

interface NavbarProps {
  onMenuClick?: () => void
}

type ProfileUser = { id?: number; name?: string; email?: string } | null

type StoredUser = { id?: number; name?: string; firstName?: string; email?: string }

function getProfileFromStorage(): ProfileUser {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('user')
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredUser
    const name = parsed.name ?? parsed.firstName ?? parsed.email
    return name !== undefined ? { ...parsed, name } : parsed
  } catch {
    return null
  }
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter()
  const [user, setUser] = useState<ProfileUser>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setUser(getProfileFromStorage())
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (!token) return
    fetch(API_AUTH_PROFILE, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user && typeof data.user === 'object') {
          const u = data.user
          const profileData = { id: u.id, name: u.name ?? u.firstName ?? u.email, email: u.email }
          localStorage.setItem('user', JSON.stringify(profileData))
          setUser(profileData)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const displayName = user?.name ?? (user?.email ? user.email : 'Guest')
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token')

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    setDropdownOpen(false)
    router.push('/login')
  }

  return (
    <nav className="fixed top-0 z-30 w-full border-b border-gray-200 bg-white lg:pl-64">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="flex h-16 items-center">
            <Image
              src="/carousel/plogo.png"
              alt="College Logo"
              width={500}
              height={64}
              className="h-16 w-auto object-contain"
              priority
            />
          </div>
          <button
            onClick={onMenuClick}
            className="ml-4 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4 px-4 lg:px-6">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, topics..."
              className="w-64 rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="relative flex items-center gap-3" ref={dropdownRef}>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {hasToken ? `Welcome, ${displayName}` : ''}
                </p>
                {user?.email && (
                  <p className="text-xs text-gray-500 truncate max-w-[180px]">{user.email}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200"
                aria-expanded={dropdownOpen}
              >
                <User className="h-5 w-5" />
                <ChevronDown className="absolute right-0 bottom-0 h-3 w-3 text-primary-600" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                  <div className="border-b border-gray-100 px-4 py-2">
                    <p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
                    {user?.email && (
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

