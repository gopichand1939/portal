export const clock2StudyMaterial = {
  title: 'Clocks – Part 2 (Advanced)',
  description:
    'Clock reasoning Part 2 covers advanced time finding, multiple conditions, gain/loss of clocks, and tricky angle-based problems.',
  sections: [
    {
      heading: 'Advanced Angle Concepts',
      points: [
        'Angle between hands can be acute or obtuse; always take smaller angle unless stated.',
        'Formula still applies: |30H − 5.5M|.',
        'For reflex angle, subtract smaller angle from 360°.',
      ],
    },
    {
      heading: 'Finding Exact Time',
      points: [
        'For coincidence: time after H hours = (H × 60 × 11) / 11 minutes.',
        'For right angle: two solutions occur in each hour except 12.',
        'For opposite position: occurs every 65 5/11 minutes.',
      ],
    },
    {
      heading: 'Gain and Loss of Clock',
      points: [
        'If a clock gains x minutes per hour, actual time = shown time × (60 / (60 + x)).',
        'If a clock loses x minutes per hour, actual time = shown time × (60 / (60 − x)).',
        'These problems combine clock logic with ratio.',
      ],
    },
    {
      heading: 'Multiple Condition Problems',
      points: [
        'Some questions combine coincidence + angle.',
        'Solve step-by-step using relative speed.',
        'Convert all results into minutes first.',
      ],
    },
    {
      heading: 'Placement Tip',
      points: [
        'Always use relative speed = 5.5°/min.',
        'Avoid memorizing answers; derive logically.',
      ],
    },
  ],
}