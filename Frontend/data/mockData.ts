export const studentData = {
  name: 'John Doe',
  rollNumber: 'LB21CS001',
  username: 'johndoe',
  overallProgress: 68,
  studyStreak: 12,
  completedDays: 45,
  remainingDays: 20,
  performanceScore: 85,
  placementPriority: 'High' as 'High' | 'Medium' | 'Low',
  certificateStatus: 'Locked' as 'Locked' | 'Unlocked',
}

export const courseProgress = {
  totalCourses: 10,
  completedCourses: 6,
  inProgress: 2,
  locked: 2,
}

export const dailyProgress = {
  learn: { completed: true, progress: 100 },
  practice: { completed: true, progress: 80 },
  test: { completed: false, progress: 0 },
}

export const performanceData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 72 },
  { month: 'Mar', score: 78 },
  { month: 'Apr', score: 82 },
  { month: 'May', score: 85 },
  { month: 'Jun', score: 88 },
]

export const studyConsistency = [
  { day: 'Mon', hours: 3 },
  { day: 'Tue', hours: 4 },
  { day: 'Wed', hours: 2 },
  { day: 'Thu', hours: 5 },
  { day: 'Fri', hours: 3 },
  { day: 'Sat', hours: 4 },
  { day: 'Sun', hours: 2 },
]

export const placementRankings = [
  { rank: 1, name: 'John Doe', score: 95, priority: 'High' },
  { rank: 2, name: 'Jane Smith', score: 92, priority: 'High' },
  { rank: 3, name: 'Mike Johnson', score: 88, priority: 'High' },
  { rank: 4, name: 'Sarah Williams', score: 85, priority: 'Medium' },
  { rank: 5, name: 'David Brown', score: 82, priority: 'Medium' },
  { rank: 6, name: 'Emily Davis', score: 78, priority: 'Medium' },
  { rank: 7, name: 'Chris Wilson', score: 75, priority: 'Low' },
  { rank: 8, name: 'Anna Martinez', score: 72, priority: 'Low' },
]

// Practice Questions (5 questions without multiple choice - based on topics)
export const practiceQuestions = [
  {
    id: 1,
    question:
      'Find the LCM and HCF of 24 and 36.',
    topic: 'Number System',
    type: 'text',
    answer: '',
    correctAnswer: 'LCM = 72, HCF = 12',
    solution: [
      'Step 1: Prime factorization of 24 = 2³ × 3¹',
      'Step 2: Prime factorization of 36 = 2² × 3²',
      'Step 3: HCF = Product of common primes with lowest power = 2² × 3¹ = 4 × 3 = 12',
      'Step 4: LCM = Product of all primes with highest power = 2³ × 3² = 8 × 9 = 72',
      'Answer: LCM = 72, HCF = 12',
    ],
  },
  {
    id: 2,
    question:
      'A shopkeeper buys an article for Rs. 800 and sells it at a profit of 25%. Find the selling price and profit amount.',
    topic: 'Percentage & Profit Loss',
    type: 'text',
    answer: '',
    correctAnswer: 'Selling Price = Rs. 1000, Profit = Rs. 200',
    solution: [
      'Step 1: Cost Price (CP) = Rs. 800',
      'Step 2: Profit Percentage = 25%',
      'Step 3: Profit Amount = 25% of 800 = (25/100) × 800 = Rs. 200',
      'Step 4: Selling Price (SP) = CP + Profit = 800 + 200 = Rs. 1000',
      'Answer: Selling Price = Rs. 1000, Profit = Rs. 200',
    ],
  },
  {
    id: 3,
    question:
      'A train 200 meters long crosses a platform 300 meters long in 25 seconds. Calculate the speed of the train in km/hr.',
    topic: 'Time, Speed & Distance',
    type: 'text',
    answer: '',
    correctAnswer: '72 km/hr',
    solution: [
      'Step 1: Total distance = Length of train + Length of platform = 200 + 300 = 500 meters',
      'Step 2: Time taken = 25 seconds',
      'Step 3: Speed = Distance / Time = 500 / 25 = 20 m/s',
      'Step 4: Convert m/s to km/hr: 20 × (18/5) = 20 × 3.6 = 72 km/hr',
      'Answer: 72 km/hr',
    ],
  },
  {
    id: 4,
    question:
      'In a family, P is the father of Q, R is the mother of P, S is the brother of Q. How is S related to R?',
    topic: 'Blood Relations',
    type: 'text',
    answer: '',
    correctAnswer: 'Grandson',
    solution: [
      'Step 1: P is the father of Q, so P → Q (father-son relationship)',
      'Step 2: R is the mother of P, so R → P (mother-son relationship)',
      'Step 3: S is the brother of Q, so S and Q are siblings',
      'Step 4: Since R is mother of P, and P is father of Q, therefore R is grandmother of Q',
      'Step 5: Since S is brother of Q, S is also grandson of R',
      'Answer: S is the grandson of R',
    ],
  },
  {
    id: 5,
    question:
      'If CAT is coded as 3-1-20, how would DOG be coded using the same pattern?',
    topic: 'Coding & Decoding',
    type: 'text',
    answer: '',
    correctAnswer: '4-15-7',
    solution: [
      'Step 1: Pattern: Each letter is coded as its position in the alphabet',
      'Step 2: C = 3rd letter, A = 1st letter, T = 20th letter',
      'Step 3: D = 4th letter, O = 15th letter, G = 7th letter',
      'Step 4: Therefore, DOG is coded as 4-15-7',
      'Answer: 4-15-7',
    ],
  },
]

// Test Questions (20 MCQ questions - covering all 10 topics)
export const testQuestions = [
  {
    id: 1,
    question: 'What is the LCM of 24 and 36?',
    topic: 'Number System',
    options: ['48', '60', '72', '84'],
    correct: 2,
  },
  {
    id: 2,
    question: 'If 20% of a number is 50, what is the number?',
    topic: 'Percentage & Profit Loss',
    options: ['200', '250', '300', '350'],
    correct: 1,
  },
  {
    id: 3,
    question: 'A train travels 360 km in 6 hours. What is its speed?',
    topic: 'Time, Speed & Distance',
    options: ['50 km/hr', '60 km/hr', '70 km/hr', '80 km/hr'],
    correct: 1,
  },
  {
    id: 4,
    question: 'If A is the brother of B, and B is the son of C, how is A related to C?',
    topic: 'Blood Relations',
    options: ['Son', 'Brother', 'Nephew', 'Cousin'],
    correct: 0,
  },
  {
    id: 5,
    question: 'If CAT is coded as 3120, how is DOG coded?',
    topic: 'Coding & Decoding',
    options: ['4157', '4158', '4159', '4160'],
    correct: 0,
  },
  {
    id: 6,
    question: 'What is the HCF of 48 and 72?',
    topic: 'Number System',
    options: ['12', '18', '24', '36'],
    correct: 2,
  },
  {
    id: 7,
    question: 'A shopkeeper sells an item for Rs. 1200 at a profit of 20%. What is the cost price?',
    topic: 'Percentage & Profit Loss',
    options: ['Rs. 900', 'Rs. 1000', 'Rs. 1100', 'Rs. 1150'],
    correct: 1,
  },
  {
    id: 8,
    question: 'A boat goes 30 km upstream in 3 hours and 30 km downstream in 2 hours. What is the speed of the boat in still water?',
    topic: 'Time, Speed & Distance',
    options: ['10 km/hr', '12.5 km/hr', '15 km/hr', '17.5 km/hr'],
    correct: 1,
  },
  {
    id: 9,
    question: 'What is the next number in the series: 2, 6, 12, 20, 30, ?',
    topic: 'Series & Sequences',
    options: ['40', '42', '44', '46'],
    correct: 1,
  },
  {
    id: 10,
    question: 'If the ratio of A:B is 2:3 and B:C is 4:5, what is A:C?',
    topic: 'Ratio & Proportion',
    options: ['8:15', '2:5', '4:5', '6:7'],
    correct: 0,
  },
  {
    id: 11,
    question: 'In how many ways can 5 people be arranged in a line?',
    topic: 'Permutation & Combination',
    options: ['60', '120', '240', '720'],
    correct: 1,
  },
  {
    id: 12,
    question: 'If 3x + 7 = 22, what is the value of x?',
    topic: 'Algebra & Equations',
    options: ['3', '4', '5', '6'],
    correct: 2,
  },
  {
    id: 13,
    question: 'What is 25% of 240?',
    topic: 'Percentage & Profit Loss',
    options: ['50', '60', '70', '80'],
    correct: 1,
  },
  {
    id: 14,
    question: 'A car travels 180 km in 3 hours. What is its average speed?',
    topic: 'Time, Speed & Distance',
    options: ['50 km/hr', '60 km/hr', '70 km/hr', '80 km/hr'],
    correct: 1,
  },
  {
    id: 15,
    question: 'What is the next term in the series: A, D, G, J, ?',
    topic: 'Series & Sequences',
    options: ['K', 'L', 'M', 'N'],
    correct: 2,
  },
  {
    id: 16,
    question: 'If 2:3 = x:12, what is the value of x?',
    topic: 'Ratio & Proportion',
    options: ['6', '8', '10', '12'],
    correct: 1,
  },
  {
    id: 17,
    question: 'How many ways can 3 books be selected from 7 books?',
    topic: 'Permutation & Combination',
    options: ['21', '35', '42', '56'],
    correct: 1,
  },
  {
    id: 18,
    question: 'Solve for x: 2x² - 8x + 6 = 0',
    topic: 'Algebra & Equations',
    options: ['x = 1, 3', 'x = 2, 3', 'x = 1, 4', 'x = 2, 4'],
    correct: 0,
  },
  {
    id: 19,
    question: 'If P is the mother of Q, and Q is the father of R, how is P related to R?',
    topic: 'Blood Relations',
    options: ['Mother', 'Grandmother', 'Aunt', 'Sister'],
    correct: 1,
  },
  {
    id: 20,
    question: 'If APPLE is coded as 1-16-16-12-5, how is ORANGE coded?',
    topic: 'Coding & Decoding',
    options: ['15-18-1-14-7-5', '15-17-1-14-7-5', '15-18-1-13-7-5', '15-18-1-14-6-5'],
    correct: 0,
  },
]

// Daily Schedule
export const dailySchedule = [
  { activity: 'Learn Section', status: 'completed' },
  { activity: 'Practice Section', status: 'completed' },
  { activity: 'Test Section', status: 'in-progress' },
  { activity: 'Review & Analysis', status: 'pending' },
]

