'use client'

import { useState, Suspense, memo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Award,
  Target,
  Lock,
  X,
  LogOut,
  List,
  ChevronDown,
  ChevronRight,
  Calculator,
  Brain,
  MessageSquare,
  Code2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import SidebarModuleTree from '@/components/layout/SidebarModuleTree'
import { aptitudeModule, reasoningModule, verbalModule, pythonModule } from '@/data/learningModules'

type MenuItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  children?: Array<{
    href: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    children?: Array<{ href: string; label: string }>
  }>
}

const menuItems: MenuItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/daily-learning', label: 'Daily Learning', icon: BookOpen },
  { href: '/progress', label: 'Progress Tracking', icon: BarChart3 },
  { href: '/certificate', label: 'Certificate', icon: Award },
  { href: '/placement-priority', label: 'Placement', icon: Target },
  { href: '/course-locked', label: 'Course Access', icon: Lock },
  { href: '/course-details', label: 'View All Course Details', icon: List },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

type DailySection = 'aptitude' | 'reasoning' | 'verbal' | 'python'

function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [expandedMenus, setExpandedMenus] = useState<string[]>(() => {
    const expanded: string[] = []
    if (
      pathname?.startsWith('/daily-learning/aptitude') ||
      pathname?.startsWith('/daily-learning/reasoning') ||
      pathname?.startsWith('/daily-learning/verbal') ||
      pathname?.startsWith('/daily-learning/python')
    ) {
      expanded.push('/daily-learning')
    }
    return expanded
  })
  const [expandedDailySection, setExpandedDailySection] = useState<DailySection | null>(() => {
    if (pathname?.startsWith('/daily-learning/aptitude')) return 'aptitude'
    if (pathname?.startsWith('/daily-learning/reasoning')) return 'reasoning'
    if (pathname?.startsWith('/daily-learning/verbal')) return 'verbal'
    if (pathname?.startsWith('/daily-learning/python')) return 'python'
    return null
  })

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    window.location.href = '/'
  }

  const toggleMenu = (href: string) => {
    setExpandedMenus((prev) =>
      prev.includes(href) ? prev.filter((h) => h !== href) : [...prev, href]
    )
  }

  const toggleDailySection = (section: DailySection) => {
    setExpandedDailySection((prev) => (prev === section ? null : section))
  }

  const isMenuExpanded = (href: string) => expandedMenus.includes(href)
  const hasActiveChild = (children?: MenuItem['children']) => {
    if (!children) return false
    return children.some((child) => pathname === child.href || child.children?.some((day) => pathname === day.href))
  }
  const isDailyLearningActive =
    pathname === '/daily-learning' ||
    pathname?.startsWith('/daily-learning/aptitude') ||
    pathname?.startsWith('/daily-learning/reasoning') ||
    pathname?.startsWith('/daily-learning/verbal') ||
    pathname?.startsWith('/daily-learning/python')

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white transition-transform lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto px-3 py-4">
          <div className="mb-8 flex items-center justify-between px-3">
            <div>
              <h2 className="text-sm font-bold text-gray-900 leading-tight">
                DR. Lankapalli Bullayya College
              </h2>
              <p className="text-xs text-gray-500">Placement Portal</p>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isDailyLearning = item.href === '/daily-learning'
              const isActive = isDailyLearning
                ? isDailyLearningActive
                : pathname === item.href || hasActiveChild(item.children)
              const isExpanded = isMenuExpanded(item.href)
              const hasChildren = !isDailyLearning && item.children && item.children.length > 0

              if (isDailyLearning) {
                return (
                  <div key={item.href}>
                    <button
                      onClick={() => toggleMenu(item.href)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                        isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </div>
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                    {isExpanded && (
                      <div className="ml-2 mt-1 space-y-0">
                        <div>
                          <button
                            type="button"
                            onClick={() => toggleDailySection('aptitude')}
                            className={cn(
                              'flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium transition-colors',
                              pathname?.startsWith('/daily-learning/aptitude')
                                ? 'bg-primary-50 text-primary-700'
                                : 'text-gray-700 hover:bg-gray-100'
                            )}
                            aria-expanded={expandedDailySection === 'aptitude'}
                          >
                            <Calculator className="h-4 w-4 shrink-0" />
                            <span className="min-w-0 flex-1 truncate">{aptitudeModule.label}</span>
                            {expandedDailySection === 'aptitude' ? <ChevronDown className="h-3.5 w-3 shrink-0" /> : <ChevronRight className="h-3.5 w-3 shrink-0" />}
                          </button>
                          {expandedDailySection === 'aptitude' && (
                            <Suspense fallback={null}>
                              <SidebarModuleTree root={aptitudeModule} moduleSlug="aptitude" onClose={onClose} />
                            </Suspense>
                          )}
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => toggleDailySection('reasoning')}
                            className={cn(
                              'flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium transition-colors',
                              pathname?.startsWith('/daily-learning/reasoning')
                                ? 'bg-primary-50 text-primary-700'
                                : 'text-gray-700 hover:bg-gray-100'
                            )}
                            aria-expanded={expandedDailySection === 'reasoning'}
                          >
                            <Brain className="h-4 w-4 shrink-0" />
                            <span className="min-w-0 flex-1 truncate">{reasoningModule.label}</span>
                            {expandedDailySection === 'reasoning' ? <ChevronDown className="h-3.5 w-3 shrink-0" /> : <ChevronRight className="h-3.5 w-3 shrink-0" />}
                          </button>
                          {expandedDailySection === 'reasoning' && (
                            <Suspense fallback={null}>
                              <SidebarModuleTree root={reasoningModule} moduleSlug="reasoning" onClose={onClose} />
                            </Suspense>
                          )}
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => toggleDailySection('verbal')}
                            className={cn(
                              'flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium transition-colors',
                              pathname?.startsWith('/daily-learning/verbal')
                                ? 'bg-primary-50 text-primary-700'
                                : 'text-gray-700 hover:bg-gray-100'
                            )}
                            aria-expanded={expandedDailySection === 'verbal'}
                          >
                            <MessageSquare className="h-4 w-4 shrink-0" />
                            <span className="min-w-0 flex-1 truncate">{verbalModule.label}</span>
                            {expandedDailySection === 'verbal' ? <ChevronDown className="h-3.5 w-3 shrink-0" /> : <ChevronRight className="h-3.5 w-3 shrink-0" />}
                          </button>
                          {expandedDailySection === 'verbal' && (
                            <Suspense fallback={null}>
                              <SidebarModuleTree root={verbalModule} moduleSlug="verbal" onClose={onClose} />
                            </Suspense>
                          )}
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => toggleDailySection('python')}
                            className={cn(
                              'flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium transition-colors',
                              pathname?.startsWith('/daily-learning/python')
                                ? 'bg-primary-50 text-primary-700'
                                : 'text-gray-700 hover:bg-gray-100'
                            )}
                            aria-expanded={expandedDailySection === 'python'}
                          >
                            <Code2 className="h-4 w-4 shrink-0" />
                            <span className="min-w-0 flex-1 truncate">{pythonModule.label}</span>
                            {expandedDailySection === 'python' ? <ChevronDown className="h-3.5 w-3 shrink-0" /> : <ChevronRight className="h-3.5 w-3 shrink-0" />}
                          </button>
                          {expandedDailySection === 'python' && (
                            <Suspense fallback={null}>
                              <SidebarModuleTree root={pythonModule} moduleSlug="python" onClose={onClose} />
                            </Suspense>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <div key={item.href}>
                  {hasChildren ? (
                    <>
                      <button
                        onClick={() => toggleMenu(item.href)}
                        className={cn(
                          'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                          {item.children?.map((child) => {
                            const ChildIcon = child.icon
                            const isChildActive = pathname === child.href || (child.children?.some(day => pathname === day.href))
                            const isChildExpanded = isMenuExpanded(child.href)
                            const hasChildChildren = child.children && child.children.length > 0

                            return (
                              <div key={child.href}>
                                {hasChildChildren ? (
                                  <>
                                    <button
                                      onClick={() => toggleMenu(child.href)}
                                      className={cn(
                                        'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                        isChildActive
                                          ? 'bg-primary-50 text-primary-700'
                                          : 'text-gray-600 hover:bg-gray-100'
                                      )}
                                    >
                                      <div className="flex items-center gap-3">
                                        <ChildIcon className="h-4 w-4" />
                                        <span>{child.label}</span>
                                      </div>
                                      {isChildExpanded ? (
                                        <ChevronDown className="h-3 w-3" />
                                      ) : (
                                        <ChevronRight className="h-3 w-3" />
                                      )}
                                    </button>
                                    {isChildExpanded && (
                                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                                        {child.children?.map((day) => {
                                          const isDayActive = pathname === day.href
                                          return (
                                            <Link
                                              key={day.href}
                                              href={day.href}
                                              onClick={onClose}
                                              className={cn(
                                                'flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                                                isDayActive
                                                  ? 'bg-primary-50 text-primary-700'
                                                  : 'text-gray-600 hover:bg-gray-100'
                                              )}
                                            >
                                              <span>{day.label}</span>
                                            </Link>
                                          )
                                        })}
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <Link
                                    href={child.href}
                                    onClick={onClose}
                                    className={cn(
                                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                      isChildActive
                                        ? 'bg-primary-50 text-primary-700'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    )}
                                  >
                                    <ChildIcon className="h-4 w-4" />
                                    <span>{child.label}</span>
                                  </Link>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              )
            })}
          </nav>
          
          {/* Logout Button */}
          <div className="mt-auto border-t border-gray-200 pt-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default memo(Sidebar)
