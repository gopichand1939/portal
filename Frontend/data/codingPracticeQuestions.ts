export interface CodingTestCase {
  input: string
  expectedOutput: string
}

export interface CodingQuestion {
  id: string
  title: string
  description: string
  sampleInput: string
  sampleOutput: string
  testCases: CodingTestCase[]
}

/** 2 coding questions per Python topic. topicId -> questions */
export const codingQuestionsByTopic: Record<string, CodingQuestion[]> = {
  'intro-python': [
    {
      id: 'intro-q1',
      title: 'Hello World',
      description: 'Write a program that prints exactly: Hello, World!\n\nNo input. Just use print().',
      sampleInput: '(none)',
      sampleOutput: 'Hello, World!',
      testCases: [
        { input: '', expectedOutput: 'Hello, World!' },
      ],
    },
    {
      id: 'intro-q2',
      title: 'Hello World & Variables',
      description: 'Write a program that reads a name from input and prints "Hello, {name}!". Then print the length of the name (on a new line).',
      sampleInput: 'Alice',
      sampleOutput: 'Hello, Alice!\n5',
      testCases: [
        { input: 'Alice', expectedOutput: 'Hello, Alice!\n5' },
        { input: 'Bob', expectedOutput: 'Hello, Bob!\n3' },
      ],
    },
  ],
  'io-basics': [
    {
      id: 'io-q1',
      title: 'Input and Print',
      description: 'Read a line of text and an integer from input. Print the line repeated that many times (each on a new line).',
      sampleInput: 'Hi\n2',
      sampleOutput: 'Hi\nHi',
      testCases: [
        { input: 'Hi\n2', expectedOutput: 'Hi\nHi' },
        { input: 'Yes\n3', expectedOutput: 'Yes\nYes\nYes' },
      ],
    },
    {
      id: 'io-q2',
      title: 'Formatted Output',
      description: 'Read name and age. Print: "Name: {name}, Age: {age}".',
      sampleInput: 'Ravi\n20',
      sampleOutput: 'Name: Ravi, Age: 20',
      testCases: [
        { input: 'Ravi\n20', expectedOutput: 'Name: Ravi, Age: 20' },
        { input: 'Priya\n22', expectedOutput: 'Name: Priya, Age: 22' },
      ],
    },
  ],
  'operators-conditionals': [
    {
      id: 'op-q1',
      title: 'Largest of Two',
      description: 'Read two integers. Print the larger one. If equal, print "Equal".',
      sampleInput: '7\n3',
      sampleOutput: '7',
      testCases: [
        { input: '7\n3', expectedOutput: '7' },
        { input: '5\n5', expectedOutput: 'Equal' },
      ],
    },
    {
      id: 'op-q2',
      title: 'Odd or Even',
      description: 'Read an integer n. Print "Even" if n is even, else "Odd".',
      sampleInput: '4',
      sampleOutput: 'Even',
      testCases: [
        { input: '4', expectedOutput: 'Even' },
        { input: '7', expectedOutput: 'Odd' },
      ],
    },
  ],
  'nested-conditions': [
    {
      id: 'nest-q1',
      title: 'Grade from Score',
      description: 'Read a score (0-100). Print grade: A (>=90), B (>=80), C (>=70), D (>=60), F otherwise.',
      sampleInput: '85',
      sampleOutput: 'B',
      testCases: [
        { input: '85', expectedOutput: 'B' },
        { input: '92', expectedOutput: 'A' },
      ],
    },
    {
      id: 'nest-q2',
      title: 'Triangle Type',
      description: 'Read three sides a, b, c. Print "Valid" if they form a triangle, else "Invalid".',
      sampleInput: '3\n4\n5',
      sampleOutput: 'Valid',
      testCases: [
        { input: '3\n4\n5', expectedOutput: 'Valid' },
        { input: '1\n2\n10', expectedOutput: 'Invalid' },
      ],
    },
  ],
  'loops': [
    {
      id: 'loop-q1',
      title: 'Sum 1 to N',
      description: 'Read an integer N. Print the sum of numbers from 1 to N.',
      sampleInput: '5',
      sampleOutput: '15',
      testCases: [
        { input: '5', expectedOutput: '15' },
        { input: '10', expectedOutput: '55' },
      ],
    },
    {
      id: 'loop-q2',
      title: 'Print Table',
      description: 'Read an integer n. Print first 10 multiples of n (one per line).',
      sampleInput: '2',
      sampleOutput: '2\n4\n6\n8\n10\n12\n14\n16\n18\n20',
      testCases: [
        { input: '2', expectedOutput: '2\n4\n6\n8\n10\n12\n14\n16\n18\n20' },
        { input: '3', expectedOutput: '3\n6\n9\n12\n15\n18\n21\n24\n27\n30' },
      ],
    },
  ],
  'loop-control': [
    {
      id: 'ctrl-q1',
      title: 'Skip Multiples of 3',
      description: 'Print numbers 1 to 10, but skip numbers divisible by 3 (use continue). One number per line.',
      sampleInput: '',
      sampleOutput: '1\n2\n4\n5\n7\n8\n10',
      testCases: [
        { input: '', expectedOutput: '1\n2\n4\n5\n7\n8\n10' },
      ],
    },
    {
      id: 'ctrl-q2',
      title: 'Break at Zero',
      description: 'Read integers until 0 is entered. Print the sum of all numbers before 0.',
      sampleInput: '1\n2\n3\n0',
      sampleOutput: '6',
      testCases: [
        { input: '1\n2\n3\n0', expectedOutput: '6' },
        { input: '10\n20\n0', expectedOutput: '30' },
      ],
    },
  ],
  'strings-variables': [
    {
      id: 'str-q1',
      title: 'String Length & Reverse',
      description: 'Read a string. Print its length and the reversed string, separated by a newline.',
      sampleInput: 'hello',
      sampleOutput: '5\nolleh',
      testCases: [
        { input: 'hello', expectedOutput: '5\nolleh' },
        { input: 'abc', expectedOutput: '3\ncba' },
      ],
    },
    {
      id: 'str-q2',
      title: 'Uppercase First',
      description: 'Read a string. Print the string with the first character in uppercase and rest unchanged.',
      sampleInput: 'hello',
      sampleOutput: 'Hello',
      testCases: [
        { input: 'hello', expectedOutput: 'Hello' },
        { input: 'world', expectedOutput: 'World' },
      ],
    },
  ],
  'lists': [
    {
      id: 'list-q1',
      title: 'List Sum & Max',
      description: 'Read a line of space-separated integers. Print their sum and the maximum value, on separate lines.',
      sampleInput: '1 2 3 4 5',
      sampleOutput: '15\n5',
      testCases: [
        { input: '1 2 3 4 5', expectedOutput: '15\n5' },
        { input: '10 20', expectedOutput: '30\n20' },
      ],
    },
    {
      id: 'list-q2',
      title: 'Second Largest',
      description: 'Read space-separated integers. Print the second largest distinct value. Assume at least 2 distinct values.',
      sampleInput: '5 2 8 8 3',
      sampleOutput: '5',
      testCases: [
        { input: '5 2 8 8 3', expectedOutput: '5' },
        { input: '1 2 3 4', expectedOutput: '3' },
      ],
    },
  ],
  'functions': [
    {
      id: 'fn-q1',
      title: 'Function: Is Prime',
      description: 'Read an integer n. Define a function is_prime(n) that returns True if n is prime else False. Print the result.',
      sampleInput: '7',
      sampleOutput: 'True',
      testCases: [
        { input: '7', expectedOutput: 'True' },
        { input: '10', expectedOutput: 'False' },
      ],
    },
    {
      id: 'fn-q2',
      title: 'Function: Factorial',
      description: 'Read an integer n (0 <= n <= 10). Define a function factorial(n) and print factorial(n).',
      sampleInput: '5',
      sampleOutput: '120',
      testCases: [
        { input: '5', expectedOutput: '120' },
        { input: '0', expectedOutput: '1' },
      ],
    },
  ],
  'recursion': [
    {
      id: 'rec-q1',
      title: 'Recursive Sum 1 to N',
      description: 'Read N. Define a recursive function sum_to_n(n) that returns 1+2+...+n. Print the result.',
      sampleInput: '5',
      sampleOutput: '15',
      testCases: [
        { input: '5', expectedOutput: '15' },
        { input: '1', expectedOutput: '1' },
      ],
    },
    {
      id: 'rec-q2',
      title: 'Recursive Fibonacci',
      description: 'Read n (0-indexed). Define recursive fib(n) returning nth Fibonacci number (fib(0)=0, fib(1)=1). Print fib(n).',
      sampleInput: '6',
      sampleOutput: '8',
      testCases: [
        { input: '6', expectedOutput: '8' },
        { input: '0', expectedOutput: '0' },
      ],
    },
  ],
}

/** Get topic id from coding node id (e.g. intro-python-coding -> intro-python) */
export function getTopicIdFromCodingNodeId(nodeId: string): string {
  return nodeId.replace(/-coding$/, '')
}

export function getCodingQuestionsForTopic(topicId: string): CodingQuestion[] {
  return codingQuestionsByTopic[topicId] ?? []
}
