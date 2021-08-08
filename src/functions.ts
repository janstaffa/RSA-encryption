import { BigInteger } from 'jsbn';

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomIntEx = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const oddNumbers = [1, 3, 5, 7, 9];
export const randomOddNumber = () => {
  const randomIdx = randomInt(0, oddNumbers.length - 1);
  return oddNumbers[randomIdx];
};
export const isPrime = (n: number) => {
  if (n === 1 || n === 3) return true;

  if (n % 2 === 0 || n % 3 === 0) return false;

  let count = 5;

  while (Math.pow(count, 2) <= n) {
    //  console.log('NORMAL', count);
    if (n % count === 0 || n % (count + 2) === 0) return false;

    count += 6;
  }
  //   console.log('COUNT', count);

  return true;
};
const bigNumber = (n: string) => {
  return new BigInteger(n);
};
export const isPrimeBI = (n: BigInteger) => {
  //   console.log('isPrimeBI called for', n.toString());
  if (n === BigInteger.ONE || n === bigNumber('3')) return true;

  //   console.log(
  //     n.toString(),
  //     'mod 2 is',
  //     n.mod(bigNumber('2')).toString(),
  //     n.mod(bigNumber('2')).compareTo(BigInteger.ZERO),
  //     n.mod(bigNumber('2')).compareTo(BigInteger.ZERO) === 0
  //   );
  //   console.log(
  //     n.toString(),
  //     'mod 3 is',
  //     n.mod(bigNumber('2')).toString(),
  //     n.mod(bigNumber('3')).compareTo(BigInteger.ZERO),
  //     n.mod(bigNumber('3')).compareTo(BigInteger.ZERO) === 0
  //   );
  if (
    n.mod(bigNumber('2')).compareTo(BigInteger.ZERO) === 0 ||
    n.mod(bigNumber('3')).compareTo(BigInteger.ZERO) === 0
  )
    return false;

  let count = new BigInteger('5');

  while (count.pow(2).compareTo(n) <= 0) {
    //  console.log(
    //    'isPrimeBI loop running for',
    //    n.toString(),
    //    'with value of',
    //    count.toString()
    //  );
    if (
      n.mod(count).compareTo(BigInteger.ZERO) === 0 ||
      n.mod(count.add(bigNumber('2'))).compareTo(BigInteger.ZERO) === 0
    )
      return false;

    count = count.add(bigNumber('6'));
  }

  return true;
};

const isOdd = (n: number) => {
  return !!(n % 2);
};
export const genRandomPrime = (length: number) => {
  let response: string = '';

  do {
    response = '';
    for (let i = 0; i < length; i++) {
      const n = Math.floor(Math.random() * 10);
      response += n;
    }
    const lastNumber = parseInt(response[response.length - 1]);
    if (!isOdd(lastNumber)) {
      response = response.slice(0, -1) + randomOddNumber();
    }
  } while (!isPrime(parseInt(response)) || parseInt(response) === 0);

  return parseInt(response);
};

export const genRandomPrimeBI = (length: number) => {
  let response: string = '';

  do {
    response = '';
    for (let i = 0; i < length; i++) {
      const n = Math.floor(Math.random() * 10);
      response += n;
    }
    //  const lastNumber = parseInt(response[response.length - 1]);
    //  if (!isOdd(lastNumber)) {
    //    response = response.slice(0, -1) + randomOddNumber();
    //  }
    //  console.log(
    //    'IS PRIME BI',
    //    isPrimeBI(bigNumber(response)),
    //    isPrime(parseInt(response)),
    //    response
    //  );
  } while (
    !isPrimeBI(bigNumber(response)) ||
    bigNumber(response).compareTo(BigInteger.ZERO) === 0
  );

  return bigNumber(response);
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

// export const lcmm = (numbers: number[]) => {
//   let response = 1;
//   for (const n of numbers) {
//     response = lcm(n, response);
//   }
//   return response;
// };

// https://en.wikibooks.org/wiki/Algorithm_Implementation/Mathematics/Extended_Euclidean_algorithm#Python

export const divmod = (a: number, b: number) => {
  return [Math.floor(a / b), a % b];
};
export const extendedEuclideanAlgorithm = (n: number, m: number): number[] => {
  //   console.log('calculating eea for', n, m);
  if (n === 0) {
    return [m, 0, 1];
  }
  const [m_div_n, m_mod_n] = divmod(m, n);
  //   console.log('divmod of ' + m + ' and ' + n + ' is: ' + [m_div_n, m_mod_n]);

  const [g, x, y] = extendedEuclideanAlgorithm(m_mod_n, n);

  //   console.log('result is', y, m_div_n, x, y - m_div_n * x);
  return [g, y - m_div_n * x, x];
};
export const modularInverse = (n: number, m: number) => {
  const [g, x] = extendedEuclideanAlgorithm(n, m);
  if (g !== 1) return 0;
  //   console.log('X is:', x, 'M is:', m);
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

export const strToHex = (str: string) => {
  var arr = [];
  for (var i = 0; i < str.length; i++) {
    arr[i] = str.charCodeAt(i).toString(16);
  }
  return arr.join('');
};
export const hexToDec = (hexStr: string) => {
  let total = 0;
  for (let n = 0; n < hexStr.length; n += 2) {
    total += parseInt(hexStr.substr(n, 2), 16);
  }
  return total;
};

//Pre generated primes
const first_primes_list = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
  157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
  239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,
  331, 337, 347, 349,
];

const nBitRandom = (n: number) => {
  return randomIntEx(2 ** (n - 1) + 1, 2 ** n - 1);
};
const getLowLevelPrime = (n: number) => {
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

const isMillerRabinPassed = (miller_rabin_candidate: number) => {
  let maxDivisionsByTwo = 0;
  let evenComponent = miller_rabin_candidate - 1;

  while (evenComponent % 2 === 0) {
    evenComponent >>= 1;
    maxDivisionsByTwo += 1;
    if (
      !(2 ** maxDivisionsByTwo * evenComponent === miller_rabin_candidate - 1)
    )
      throw new Error('?');
  }
  const trialComposite = (round_tester: number) => {
    console.log(
      'HERE',
      Math.pow(round_tester, evenComponent),
      Math.pow(round_tester, evenComponent) % miller_rabin_candidate
    );
    if (Math.pow(round_tester, evenComponent) % miller_rabin_candidate === 1)
      return false;
    //might be a problem: for(let i = 0; i <maxDivisionsByTwo; i++) might be different to for i in range(maxDivisionsByTwo)!!!
    for (let i = 0; i < maxDivisionsByTwo; i += 1) {
      if (
        Math.pow(round_tester, 2 ** i * evenComponent) %
          miller_rabin_candidate ===
        miller_rabin_candidate - 1
      )
        return false;
    }
    return true;
  };
  const numberOfRabinTrials = 40;
  for (let i = 0; i < numberOfRabinTrials; i += 0) {
    const round_tester = randomInt(2, miller_rabin_candidate);
    console.log('round_tester', round_tester);
    if (trialComposite(round_tester)) return false;
  }
  return true;
};

// let finalPrime = 0;
// while (finalPrime === 0) {
//   const lowLevelPrime = getLowLevelPrime(4);
//   console.log('lowLevelPrime', lowLevelPrime);
//   if (isMillerRabinPassed(lowLevelPrime)) {
//     finalPrime = lowLevelPrime;
//     break;
//   }
// }
// console.log('finalPrime', finalPrime);
console.log('isMillerRabinPassed', isMillerRabinPassed(3));
// for (let i = 0; i < 100; i++) {
//   console.log(Number.isSafeInteger(getLowLevelPrime(53)));
// }
// console.log('nBitInteger', nBitRandom(53));
