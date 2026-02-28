export const averagesBasicsStudyMaterial = {
  title: 'Averages – Study Material',
  description:
    'Average is the sum of all values divided by the number of values. It is frequently tested in placement exams.',
  sections: [
    {
      heading: 'Basic Formula',
      points: [
        'Average = Sum of observations / Number of observations',
        'Sum = Average × Number of observations',
        'If average of n numbers is A, total sum = n × A',
      ],
    },
    {
      heading: 'Weighted Average',
      points: [
        'When groups have different sizes: Weighted Avg = (n1*A1 + n2*A2) / (n1 + n2)',
        'Example: 10 students avg 60, 20 students avg 70 gives overall (10*60 + 20*70)/30 = 66.67',
      ],
    },
    {
      heading: 'Average of Consecutive Numbers',
      points: [
        'Average of first n natural numbers = (n + 1) / 2',
        'Average of consecutive even/odd numbers = (first + last) / 2',
      ],
    },
    {
      heading: 'Inclusion and Exclusion',
      points: [
        'If a number is added and new average is known, find the number: New sum minus Old sum',
        'If a number is removed: Old sum minus New sum',
      ],
    },
    {
      heading: 'Placement Tips',
      points: [
        'Often asked: age averages, runs per match, marks, speed',
        'Quick check: average lies between min and max of the set',
      ],
    },
  ],
}
