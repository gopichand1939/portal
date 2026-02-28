'use client'

import Image from 'next/image'
import { Bell, Search, User, Menu } from 'lucide-react'
import { studentData } from '@/data/mockData'

interface NavbarProps {
  onMenuClick?: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {
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
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-gray-900">{studentData.name}</p>
                <p className="text-xs text-gray-500">{studentData.rollNumber}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                <User className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

