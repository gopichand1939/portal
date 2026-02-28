import {
  studyContentMap,
  exerciseContentMap,
  assignmentContentMap,
} from '../loader.generated'

export type AptitudeDayContent = {
  topics: {
    id: string
    title: string
    description: string
    concepts: unknown
    materials: string[]
  }[]
  practiceQuestions: any[]
  testQuestions: any[]
}

export const aptitudeDailyContent: Record<number, AptitudeDayContent> = {
  1: {
    topics: [
      {
        id: 'numbers',
        title: 'Number System Basics',
        description: 'Core number system concepts',
        concepts: studyContentMap['numbers-study'],
        materials: ['NCERT Notes', 'Solved Examples'],
      },
    ],
    practiceQuestions: exerciseContentMap['numbers-exercise'],
    testQuestions: assignmentContentMap['numbers-assignment'],
  },
  2: {
    topics: [
      {
        id: 'powercycles',
        title: 'Power Cycles',
        description: 'Patterns in powers and cyclicity',
        concepts: studyContentMap['powercycles-study'],
        materials: ['Short Tricks', 'Practice Sets'],
      },
    ],
    practiceQuestions: exerciseContentMap['powercycles-exercise'],
    testQuestions: assignmentContentMap['powercycles-assignment'],
  },
  3: {
    topics: [
      {
        id: 'remainder-cycles',
        title: 'Remainder Cycles',
        description: 'Remainder pattern analysis',
        concepts: studyContentMap['remainder-cycles-study'],
        materials: ['Concept Notes', 'Worked Problems'],
      },
    ],
    practiceQuestions: exerciseContentMap['remainder-cycles-exercise'],
    testQuestions: assignmentContentMap['remainder-cycles-assignment'],
  },
  4: {
    topics: [
      {
        id: 'company-mcq-ns',
        title: 'Company MCQs – Number Systems',
        description: 'Previous company questions',
        concepts: studyContentMap['company-mcq-ns-study'],
        materials: ['Company MCQs', 'Solutions'],
      },
    ],
    practiceQuestions: exerciseContentMap['company-mcq-ns-exercise'],
    testQuestions: assignmentContentMap['company-mcq-ns-assignment'],
  },
}
