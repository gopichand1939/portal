export const clock3StudyMaterial = {
  title: 'Clocks – Part 3 (Advanced Applications)',
  description:
    'Clock reasoning Part 3 focuses on fast and slow clocks, gain/loss calculations, and conversion between shown time and actual time.',
  sections: [
    {
      heading: 'Fast and Slow Clocks',
      points: [
        'A clock is fast if it shows more time than actual time.',
        'A clock is slow if it shows less time than actual time.',
        'Gain or loss is usually given per hour or per day.',
      ],
    },
    {
      heading: 'Gain and Loss Formula',
      points: [
        'If a clock gains x minutes in 60 minutes, actual time = shown time × (60 / (60 + x)).',
        'If a clock loses x minutes in 60 minutes, actual time = shown time × (60 / (60 − x)).',
        'This works because time runs in ratio.',
      ],
    },
    {
      heading: 'Finding Correct Time',
      points: [
        'Convert gain/loss to per hour if needed.',
        'Use ratio method instead of memorizing formulas.',
        'Always convert final answer into clock time (hours & minutes).',
      ],
    },
    {
      heading: 'Multiple Condition Problems',
      points: [
        'Some problems involve two clocks with different gain/loss.',
        'Equate actual time using ratio method.',
        'Such questions are common in advanced aptitude tests.',
      ],
    },
    {
      heading: 'Placement Tip',
      points: [
        'Never subtract gain/loss directly from time.',
        'Always work using ratios of time.',
      ],
    },
  ],
}