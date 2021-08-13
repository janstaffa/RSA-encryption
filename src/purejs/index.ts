const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomIntEx = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const isPrime = (n: number) => {
  if (n === 1 || n === 2 || n === 3) return true;

  if (n % 2 === 0 || n % 3 === 0) return false;

  let count = 5;

  while (Math.pow(count, 2) <= n) {
    if (n % count === 0 || n % (count + 2) === 0) return false;

    count += 6;
  }

  return true;
};

export const gcd = (n1: number, n2: number): number => {
  if (!n2) {
    return n1;
  }

  return gcd(n2, n1 % n2);
};

export const lcm = (n1: number, n2: number): number => {
  return !n1 || !n2 ? 0 : Math.abs((n1 * n2) / gcd(n1, n2));
};

// https://en.wikibooks.org/wiki/Algorithm_Implementation/Mathematics/Extended_Euclidean_algorithm#Python
const divmod = (a: number, b: number) => {
  return [Math.floor(a / b), a % b];
};
const extendedEuclideanAlgorithm = (n: number, m: number): number[] => {
  if (n === 0) {
    return [m, 0, 1];
  }
  const [m_div_n, m_mod_n] = divmod(m, n);

  const [g, x, y] = extendedEuclideanAlgorithm(m_mod_n, n);

  return [g, y - m_div_n * x, x];
};
export const modularInverse = (n: number, m: number) => {
  const [g, x] = extendedEuclideanAlgorithm(n, m);
  if (g !== 1) return 0;
  return ((x % m) + m) % m;
};

export const hammingWeight = (str: string) => {
  const strLen = str.length;
  let result: number = 0;
  for (let i = 0; i < strLen; i++) {
    if (str[i] !== '0') {
      result += 1;
    }
  }

  return result;
};

//Miller-rabin test
const first_primes_list = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
  157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
  239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,
  331, 337, 347, 349,
];

export const nBitRandom = (n: number) => {
  return randomIntEx(2 ** (n - 1) + 1, 2 ** n - 1);
};

export const getLowLevelPrime = (n: number) => {
  while (true) {
    const prime_candidate = nBitRandom(n);

    for (const divisor of first_primes_list) {
      if (
        prime_candidate % divisor === 0 &&
        Math.pow(divisor, 2) <= prime_candidate
      )
        break;
      else return prime_candidate;
    }
  }
};

export const isMillerRabinPassed = (miller_rabin_candidate: number) => {
  let maxDivisionsByTwo = 0;
  let evenComponent = miller_rabin_candidate - 1;

  while (evenComponent % 2 === 0) {
    evenComponent >>= 1;
    maxDivisionsByTwo += 1;
    console.assert(
      Math.pow(2, maxDivisionsByTwo) * evenComponent ===
        miller_rabin_candidate - 1,
      'math is broken'
    );
  }

  const trialComposite = (round_tester: number) => {
    if (Math.pow(round_tester, evenComponent) % miller_rabin_candidate === 1)
      return false;
    for (let i = 0; i < maxDivisionsByTwo; i++) {
      if (
        Math.pow(round_tester, Math.pow(2, i) * evenComponent) %
          miller_rabin_candidate ===
        miller_rabin_candidate - 1
      )
        return false;
    }
    return true;
  };
  const numberOfRabinTrials = 40;
  for (let i = 0; i < numberOfRabinTrials; i++) {
    const round_tester = randomIntEx(2, miller_rabin_candidate);
    if (trialComposite(round_tester)) {
      return false;
    }
  }
  return true;
};
