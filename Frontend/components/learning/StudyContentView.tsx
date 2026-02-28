'use client'

import { useRef, useEffect, useState } from 'react'
import { BookOpen } from 'lucide-react'

interface StudySection {
  heading: string
  points: string[]
}

interface StudyContent {
  title: string
  description: string
  sections: StudySection[]
}

interface StudyContentViewProps {
  content: StudyContent
}

export default function StudyContentView({ content }: StudyContentViewProps) {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const observers = sectionRefs.current
      .filter(Boolean)
      .map((el, i) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveSection(i)
          },
          { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
        )
        if (el) observer.observe(el)
        return observer
      })
    return () => observers.forEach((o) => o.disconnect())
  }, [content.sections.length])

  const total = content.sections.length

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
      <article className="min-w-0 flex-1">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {content.title}
          </h1>
          <p className="mt-3 text-gray-600 leading-relaxed">
            {content.description}
          </p>
        </header>

        <div className="space-y-6">
          {content.sections.map((sec, i) => (
            <div
              key={i}
              id={`section-${i}`}
              ref={(el) => {
                sectionRefs.current[i] = el
              }}
              className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  {sec.heading}
                </h2>
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                  Section {i + 1} of {total}
                </span>
              </div>
              <ul className="mt-4 space-y-2.5 pl-1">
                {sec.points.map((point, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-gray-700 leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </article>

      <aside className="hidden shrink-0 lg:block lg:w-56 xl:w-64">
        <div className="sticky top-24 rounded-xl border border-gray-200 bg-gray-50/80 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <BookOpen className="h-4 w-4 text-primary-600" />
            Outline
          </div>
          <nav className="mt-3 space-y-1" aria-label="Section outline">
            {content.sections.map((sec, i) => (
              <a
                key={i}
                href={`#section-${i}`}
                onClick={(e) => {
                  e.preventDefault()
                  sectionRefs.current[i]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  })
                }}
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeSection === i
                    ? 'bg-primary-100 font-medium text-primary-800'
                    : 'text-gray-600 hover:bg-gray-200/80 hover:text-gray-900'
                }`}
              >
                {sec.heading}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  )
}
