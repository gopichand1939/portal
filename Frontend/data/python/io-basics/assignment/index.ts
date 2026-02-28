export const placeholder = {
  title: 'Assignment (20 MCQs)',
  questions: Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    question: 'Question ' + (i + 1) + ' (placeholder)',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 0,
  })),
}
