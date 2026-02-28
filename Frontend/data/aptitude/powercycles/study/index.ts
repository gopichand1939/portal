export const powerCyclesStudyMaterial = {
  title: 'Power Cycles',
  description:
    'Power Cycles help in finding the last digit or repeating pattern of powers quickly.',
  sections: [
    {
      heading: 'What are Power Cycles?',
      points: [
        'Powers of numbers repeat in a fixed cycle when we look at the last digit.',
        'These repeating patterns are called power cycles.',
        'They are mainly used to find the last digit of large powers.',
      ],
    },
    {
      heading: 'Example of Power Cycle',
      points: [
        'Powers of 2: 2, 4, 8, 6 → cycle length = 4',
        'Powers of 3: 3, 9, 7, 1 → cycle length = 4',
        'Powers of 7: 7, 9, 3, 1 → cycle length = 4',
      ],
    },
    {
      heading: 'How to Solve',
      points: [
        'Find the cycle of the base number.',
        'Divide the exponent by cycle length.',
        'Use the remainder to find the last digit.',
      ],
    },
  ],
}
