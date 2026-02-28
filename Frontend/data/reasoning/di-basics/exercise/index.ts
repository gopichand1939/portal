export const placeholder = {
  title: 'Basic Exercise (10 Questions)',
  questions: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    question: 'Question ' + (i + 1) + ' (placeholder)',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 0,
  })),
}
