const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, '..', 'data')

const PLACEHOLDER_STUDY = `export const placeholder = {
  title: 'Coming soon',
  description: 'Content will be added here.',
  sections: [{ heading: 'Overview', points: ['This topic is under development.'] }],
}
`

const PLACEHOLDER_EXERCISE = `export const placeholder = {
  title: 'Basic Exercise (10 Questions)',
  questions: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    question: 'Question ' + (i + 1) + ' (placeholder)',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 0,
  })),
}
`

const PLACEHOLDER_ASSIGNMENT = `export const placeholder = {
  title: 'Assignment (20 MCQs)',
  questions: Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    question: 'Question ' + (i + 1) + ' (placeholder)',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 0,
  })),
}
`

const REASONING_TOPICS = [
  'clock-1', 'clock-2', 'clock-3', 'company-mcq-clocks', 'calendars-basics', 'di-basics',
  'ranking-basics', 'directions-basics', 'coding-basics', 'data-arr-basics', 'blood-basics',
  'venn-basics', 'syllogisms-basics', 'cubes-basics', 'puzzles-basics', 'ds-basics', 'reasoning-final',
]
const VERBAL_TOPICS = [
  'rc-basics', 'sc-basics', 'error-basics', 'fill-basics', 'para-basics', 'syn-basics',
  'vocab-basics', 'voice-basics', 'speech-basics', 'cloze-basics', 'verbal-company-mcq', 'verbal-final',
]
const PYTHON_TOPICS = [
  'intro-python', 'io-basics', 'operators-conditionals', 'nested-conditions', 'loops',
  'loop-control', 'strings-variables', 'lists', 'functions', 'recursion',
]

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function createTopic(moduleId, topicId) {
  const base = path.join(DATA_DIR, moduleId, topicId)
  ensureDir(base)
  const studyDir = path.join(base, 'study')
  const exerciseDir = path.join(base, 'exercise')
  const assignmentDir = path.join(base, 'assignment')
  ensureDir(studyDir)
  ensureDir(exerciseDir)
  ensureDir(assignmentDir)
  fs.writeFileSync(path.join(studyDir, 'index.ts'), PLACEHOLDER_STUDY, 'utf8')
  fs.writeFileSync(path.join(exerciseDir, 'index.ts'), PLACEHOLDER_EXERCISE, 'utf8')
  fs.writeFileSync(path.join(assignmentDir, 'index.ts'), PLACEHOLDER_ASSIGNMENT, 'utf8')
}

function main() {
  for (const t of REASONING_TOPICS) createTopic('reasoning', t)
  for (const t of VERBAL_TOPICS) createTopic('verbal', t)
  for (const t of PYTHON_TOPICS) createTopic('python', t)
  console.log('Created placeholders for reasoning, verbal, python')
}

main()
