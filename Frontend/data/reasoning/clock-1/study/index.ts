export const clock1StudyMaterial = {
  title: 'Clocks – Part 1 (Basics)',
  description:
    'Clock reasoning covers angle between hands, time when hands coincide or are opposite, and speed of hands.',
  sections: [
    {
      heading: 'Core Concepts',
      points: [
        'Minute hand: 360 deg in 60 min, so 6 deg per minute.',
        'Hour hand: 360 deg in 12 hours, so 30 deg per hour, 0.5 deg per minute.',
        'Relative speed: 6 minus 0.5 = 5.5 deg per minute.',
      ],
    },
    {
      heading: 'Angle Between Hands',
      points: [
        'Angle = |30H - 5.5M| or 360 minus that for smaller angle. H = hour, M = minutes.',
        'Example: 3:30 gives 75 degrees.',
      ],
    },
    {
      heading: 'Coincidence and Opposite',
      points: [
        'Hands coincide every 65 5/11 minutes after 12. In 12 hours they coincide 11 times.',
        'Hands are opposite (180 deg) 11 times in 12 hours.',
      ],
    },
    {
      heading: 'Placement Tip',
      points: ['Right angle (90 deg) between hands occurs 22 times in 12 hours.'],
    },
  ],
}
