export const pythonRecursionStudyMaterial = {
  title: 'Python Recursion',
  description:
    'Recursion is a technique where a function calls itself to solve a problem by breaking it into smaller subproblems.',
  sections: [
    {
      heading: 'What is Recursion?',
      points: [
        'A recursive function is a function that calls itself.',
        'Used to solve problems that can be divided into similar smaller problems.',
        'Common in mathematical and logical problems.',
      ],
    },
    {
      heading: 'Base Case',
      points: [
        'Base case is the condition where recursion stops.',
        'Without a base case, recursion becomes infinite.',
        'Every recursive function must have a base case.',
      ],
    },
    {
      heading: 'Recursive Case',
      points: [
        'The part where the function calls itself.',
        'Moves the problem closer to the base case.',
        'Ensures progress in each recursive call.',
      ],
    },
    {
      heading: 'How Recursion Works',
      points: [
        'Function calls are stored in call stack.',
        'Each call waits for the result of the next call.',
        'Stack unwinds after reaching base case.',
      ],
    },
    {
      heading: 'Common Examples',
      points: [
        'Factorial of a number.',
        'Fibonacci series.',
        'Sum of digits of a number.',
      ],
    },
    {
      heading: 'When to Use Recursion?',
      points: [
        'When problem has repetitive substructure.',
        'Useful in tree and divide-and-conquer problems.',
        'Sometimes simpler than loops.',
      ],
    },
  ],
}