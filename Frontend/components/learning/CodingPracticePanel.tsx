'use client'

import { useState, useCallback } from 'react'
import { Code2, Play, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import type { CodingQuestion } from '@/data/codingPracticeQuestions'
import {
  getTopicIdFromCodingNodeId,
  getCodingQuestionsForTopic,
} from '@/data/codingPracticeQuestions'
import { useLearningProgress } from '@/contexts/LearningProgressContext'

const PYTHON_DEFAULT = `# Write your Python code here
# Read input with input()
# Print output with print()
`

async function runPythonCode(code: string, stdin: string): Promise<{ stdout: string; stderr: string }> {
  const res = await fetch('/api/run-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, stdin }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? 'Execution service unavailable')
  }
  const data = await res.json()
  return { stdout: data.stdout ?? '', stderr: data.stderr ?? '' }
}

function normalizeOutput(s: string): string {
  return s.replace(/\r\n/g, '\n').trim()
}

interface CodingPracticePanelProps {
  nodeId: string
  path: string[]
  onMarkComplete?: () => void
}

export default function CodingPracticePanel({
  nodeId,
  path,
  onMarkComplete,
}: CodingPracticePanelProps) {
  const topicId = getTopicIdFromCodingNodeId(nodeId)
  const questions = getCodingQuestionsForTopic(topicId)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [code, setCode] = useState(PYTHON_DEFAULT)
  const [running, setRunning] = useState(false)
  const [testResults, setTestResults] = useState<{ passed: boolean; expected?: string; actual?: string }[] | null>(null)
  const { isCompleted, markComplete } = useLearningProgress()
  const completed = isCompleted(nodeId)

  const question = questions[currentQuestionIndex] ?? null

  const runTests = useCallback(async () => {
    if (!question) return
    setRunning(true)
    setTestResults(null)
    const results: { passed: boolean; expected?: string; actual?: string }[] = []
    try {
      for (let i = 0; i < question.testCases.length; i++) {
        const tc = question.testCases[i]
        const { stdout } = await runPythonCode(code, tc.input)
        const actual = normalizeOutput(stdout)
        const expected = normalizeOutput(tc.expectedOutput)
        const passed = actual === expected
        results.push({ passed, expected, actual })
      }
      setTestResults(results)
    } catch (e) {
      setTestResults([{ passed: false, actual: String(e), expected: undefined }])
    } finally {
      setRunning(false)
    }
  }, [question, code])

  const allPassed = testResults !== null && testResults.length > 0 && testResults.every((r) => r.passed)

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-4 py-3">
        <p className="text-sm text-gray-500">{path.join(' → ')}</p>
        <h2 className="mt-1 text-lg font-bold text-gray-900">Coding Practice (2 Questions – Interview POV)</h2>
      </div>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Left: Question & test cases */}
        <div className="flex min-h-0 w-full flex-col overflow-auto border-b border-gray-200 lg:w-1/2 lg:border-b-0 lg:border-r">
          <div className="flex border-b border-gray-100 bg-gray-50/50 px-4 py-2">
            <span className="text-xs font-medium text-gray-500">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <div className="ml-2 flex gap-1">
              {questions.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setCurrentQuestionIndex(i)
                    setTestResults(null)
                    setCode(PYTHON_DEFAULT)
                  }}
                  className={`rounded px-2 py-0.5 text-xs font-medium ${i === currentQuestionIndex ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                >
                  Q{i + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4">
            {question ? (
              <>
                <h3 className="mb-2 font-semibold text-gray-900">{question.title}</h3>
                <p className="mb-4 whitespace-pre-wrap text-sm text-gray-700">{question.description}</p>
                <div className="mb-4 rounded-lg bg-gray-100 p-3 text-sm">
                  <p className="mb-1 font-medium text-gray-700">Sample Input</p>
                  <pre className="whitespace-pre-wrap font-mono text-gray-800">{question.sampleInput || '(none)'}</pre>
                  <p className="mb-1 mt-2 font-medium text-gray-700">Sample Output</p>
                  <pre className="whitespace-pre-wrap font-mono text-gray-800">{question.sampleOutput}</pre>
                </div>
                <div>
                  <p className="mb-2 font-medium text-gray-700">Test cases ({question.testCases.length})</p>
                  <ul className="space-y-2">
                    {question.testCases.map((tc, i) => (
                      <li key={i} className="rounded border border-gray-200 bg-white p-2 text-xs">
                        <span className="font-medium text-gray-600">Case {i + 1}:</span>
                        <pre className="mt-0.5 whitespace-pre-wrap font-mono text-gray-800">Input: {tc.input || '(none)'}</pre>
                        <pre className="mt-0.5 whitespace-pre-wrap font-mono text-gray-800">Expected: {tc.expectedOutput}</pre>
                        {testResults && testResults[i] !== undefined && (
                          <div className="mt-1 flex items-center gap-1">
                            {testResults[i].passed ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-600" />
                            )}
                            <span className={testResults[i].passed ? 'text-green-700' : 'text-red-700'}>
                              {testResults[i].passed ? 'Passed' : 'Failed'}
                              {!testResults[i].passed && testResults[i].actual !== undefined && (
                                <> — Got: {testResults[i].actual}</>
                              )}
                            </span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-500">No questions for this topic yet.</p>
            )}
          </div>
        </div>

        {/* Right: Code editor */}
        <div className="flex min-h-[280px] flex-1 flex-col lg:min-h-0">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50/50 px-3 py-2">
            <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Code2 className="h-4 w-4" />
              Python
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={runTests}
                disabled={running || !question}
                className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
              >
                {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                {running ? 'Running…' : 'Run & Submit'}
              </button>
              {allPassed && (
                <button
                  type="button"
                  onClick={() => {
                    markComplete(nodeId)
                    onMarkComplete?.()
                  }}
                  disabled={completed}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-70"
                >
                  <CheckCircle className="h-4 w-4" />
                  {completed ? 'Marked complete' : 'Mark as complete'}
                </button>
              )}
            </div>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="# Write your Python code here"
            className="min-h-[240px] flex-1 resize-none border-0 bg-gray-900 p-4 font-mono text-sm leading-relaxed text-green-400 placeholder:text-gray-500 focus:outline-none focus:ring-0"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  )
}
