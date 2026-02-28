export type ModuleNodeType = 'study' | 'exercise' | 'assignment' | 'coding'

export interface ModuleNode {
  id: string
  label: string
  type?: ModuleNodeType
  meta?: string
  children?: ModuleNode[]
}

export interface StudyContent {
  title: string
  description: string
  sections: { heading: string; points: string[] }[]
}

export interface ExerciseQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export interface ExerciseContent {
  title: string
  questions: ExerciseQuestion[]
}

export interface AssignmentQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export interface AssignmentContent {
  title: string
  questions: AssignmentQuestion[]
}
