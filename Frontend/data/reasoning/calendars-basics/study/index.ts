export const calendarsBasicsStudyMaterial = {
  title: 'Calendars – Basics',
  description:
    'Calendar problems involve finding the day of the week for a given date using odd days and reference dates.',
  sections: [
    {
      heading: 'Core Concepts',
      points: [
        'Ordinary year: 365 days = 52 weeks + 1 odd day.',
        'Leap year: 366 days = 52 weeks + 2 odd days.',
        'Leap year: divisible by 4; if century then divisible by 400.',
      ],
    },
    {
      heading: 'Odd Days',
      points: [
        '1 ordinary year → 1 odd day.',
        '1 leap year → 2 odd days.',
        '100 years → 5 odd days (or 6 if last year is leap).',
        '200 years → 3, 400 years → 0 (repeat pattern).',
      ],
    },
    {
      heading: 'Month-wise Odd Days',
      points: [
        'Jan 31→3, Feb 28→0 (29→1), Mar 31→3, Apr 30→2, May 31→3, Jun 30→2.',
        'Jul 31→3, Aug 31→3, Sep 30→2, Oct 31→3, Nov 30→2, Dec 31→3.',
      ],
    },
    {
      heading: 'Step-by-Step',
      points: [
        'Count odd days from a known reference (e.g. 1 Jan 1900 was Monday).',
        'Or count total days from reference and take mod 7.',
        'Remainder 0→same day, 1→next day, etc.',
      ],
    },
    {
      heading: 'Placement Tip',
      points: [
        'Memorize: 1 Jan 1900 = Monday; 400 years cycle has 0 odd days.',
      ],
    },
  ],
}
