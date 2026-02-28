export const numbersStudyMaterial = {
  title: 'Number System – Study Material',
  description:
    'The Number System is the foundation of quantitative aptitude. It deals with different types of numbers, their properties, and operations on them.',

  sections: [
    {
      heading: 'Types of Numbers',
      points: [
        'Natural Numbers: 1, 2, 3, 4, … (counting numbers)',
        'Whole Numbers: 0, 1, 2, 3, … (natural numbers including zero)',
        'Integers: … -3, -2, -1, 0, 1, 2, 3, …',
        'Rational Numbers: Numbers that can be written as p/q where q ≠ 0',
        'Irrational Numbers: Numbers that cannot be written as p/q (√2, √3, π)',
        'Real Numbers: Combination of rational and irrational numbers',
        'Prime Numbers: Numbers greater than 1 with exactly two factors (2, 3, 5, 7)',
        'Composite Numbers: Numbers having more than two factors',
      ],
    },
    {
      heading: 'Even and Odd Numbers',
      points: [
        'Even Number: Divisible by 2 (2, 4, 6, 8)',
        'Odd Number: Not divisible by 2 (1, 3, 5, 7)',
        'Even ± Even = Even',
        'Odd ± Odd = Even',
        'Even × Any number = Even',
        'Odd × Odd = Odd',
      ],
    },
    {
      heading: 'Divisibility Rules',
      points: [
        'Divisible by 2: Last digit is even',
        'Divisible by 3: Sum of digits divisible by 3',
        'Divisible by 4: Last two digits divisible by 4',
        'Divisible by 5: Last digit is 0 or 5',
        'Divisible by 9: Sum of digits divisible by 9',
        'Divisible by 11: Difference of alternate digit sums is 0 or multiple of 11',
      ],
    },
    {
      heading: 'Factors and Multiples',
      points: [
        'Factor: A number that divides another number completely',
        'Multiple: A number obtained by multiplying a given number',
        'Example: Factors of 12 → 1, 2, 3, 4, 6, 12',
        'Example: Multiples of 5 → 5, 10, 15, 20',
      ],
    },
    {
      heading: 'Prime Factorization',
      points: [
        'Breaking a number into a product of prime numbers',
        'Example: 60 = 2 × 2 × 3 × 5',
        'Used in finding LCM and HCF',
      ],
    },
    {
      heading: 'LCM and HCF',
      points: [
        'LCM (Least Common Multiple): Smallest number divisible by all given numbers',
        'Method: Use prime factorization and take highest powers of primes',
        'HCF (Highest Common Factor): Greatest number that divides all given numbers',
        'Method: Take lowest powers of common primes',
        'Relation: LCM × HCF = Product of two numbers',
      ],
    },
    {
      heading: 'Remainders',
      points: [
        'When a number is not fully divisible, the leftover is the remainder',
        'Key Rule: a = bq + r',
        'Condition: 0 ≤ r < b',
      ],
    },
    {
      heading: 'Number of Digits',
      points: [
        'Digits in a number N = ⌊log₁₀ N⌋ + 1',
        'Example: Digits in 456 = 3',
      ],
    },
    {
      heading: 'Trailing Zeros in Factorials',
      points: [
        'Depends on the number of factors of 5',
        'Formula: ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + …',
        'Example: Trailing zeros in 25! = 6',
      ],
    },
  ],
}
