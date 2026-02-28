export const aptitudeFinalStudyMaterial = {
  title: 'Final Assessment – Study Recap',
  description:
    'Quick revision of key formulas and concepts from Quantitative Aptitude for the final assessment.',
  sections: [
    {
      heading: 'Numbers and Cycles',
      points: [
        'Divisibility rules: 2 (last digit even), 3 (digit sum), 5 (0 or 5), 9 (digit sum), 11 (alternate sum diff)',
        'Power cycles: last digit of a^n repeats in cycle of 4 for most bases',
        'Remainder cycles: use Fermat / pattern to find remainder when divisor and base are co-prime',
      ],
    },
    {
      heading: 'LCM and HCF',
      points: [
        'HCF: product of lowest powers of common primes',
        'LCM: product of highest powers of all primes',
        'LCM × HCF = product of two numbers',
      ],
    },
    {
      heading: 'Percentages and P&L',
      points: [
        'x% of y = (x/100)*y; increase/decrease by x%: multiply by (1 ± x/100)',
        'Profit % = (Profit/CP)*100; SP = CP(1 + p/100)',
      ],
    },
    {
      heading: 'Interest, Ratios, Mixtures',
      points: [
        'SI = P*R*T/100; A = P + SI',
        'CI: A = P(1 + r/100)^n',
        'Ratio a:b and sum S: first part = a*S/(a+b)',
        'Alligation: (Cheap – Mean)/(Mean – Dear) = n2/n1',
      ],
    },
    {
      heading: 'Time, Work, Speed',
      points: [
        'Work: combined rate = sum of rates; time = 1/combined rate',
        'TSD: Distance = Speed × Time; relative speed (same dir) = difference, (opposite) = sum',
      ],
    },
    {
      heading: 'Permutations and Probability',
      points: [
        'nPr = n!/(n-r)!; nCr = n!/(r!(n-r)!)',
        'Probability = favourable outcomes / total outcomes',
      ],
    },
  ],
}
