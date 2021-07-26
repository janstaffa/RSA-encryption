export const isPrime = (n: number) => {
  if (n === 1 || n === 3) return true;

  if (n % 2 === 0 || n % 3 === 0) return false;

  let count = 5;

  while (Math.pow(count, 2) <= n) {
    if (n % count === 0 || n % (count + 2) === 0) return false;

    count += 6;
  }

  return true;
};
export const genRandomPrime = (length: number) => {
  let response: string = '';

  do {
    response = '';
    for (let i = 0; i < length; i++) {
      const n = Math.floor(Math.random() * 10);
      response += n;
    }
  } while (!isPrime(parseInt(response)));

  return parseInt(response);
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

export const lcmm = (numbers: number[]) => {
  let response = 1;
  for (const n of numbers) {
    response = lcm(n, response);
  }
  return response;
};
export const getFactors = (n: number) => {
  let response: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (n % i == 0) {
      response.push(i);
    }
  }
  return response;
};

export const getFactorPair = (n: number) => {
  let response: number[] | undefined = [];
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      response.push(i);
      response.push(n / i);
      break;
    }
  }
  return response.length > 0 ? response : undefined;
};
export const getCoprimeFactorPair = (n: number) => {
  let response: number[] | undefined = [];
  for (let i = 2; i < n; i++) {
    if (gcd(i, n / i) === 1) {
      response.push(i);
      response.push(n / i);
      break;
    }
  }
  return response.length > 0 ? response : undefined;
};
export const isOdd = (n: number) => !((n + 1) % 2 === 1);
export const isPowerOfOddPrime = (n: number): boolean => {
  if (isPrime(n)) return false;
  for (let i = 2; i < n; i++) {
    const root = Math.pow(n, 1 / i);
    if (root % 1 !== 0) continue;
    console.log('root', root, i, n);
    if (isOdd(root)) return true;
  }

  return false;
  //   if (!isOdd(n)) return false;
  //   const subFactorPair = getFactorPair(n);

  //   if (
  //     subFactorPair &&
  //     gcd(subFactorPair[0], subFactorPair[1]) === subFactorPair[0] &&
  //     gcd(subFactorPair[0], subFactorPair[1]) === subFactorPair[1]
  //   ) {
  //     return true;
  //   }
  //   return false;
};

export const eulersTotient = (n: number) => {
  let totalCoprimes = 0;
  for (let i = 1; i < n; i++) {
    if (gcd(n, i) === 1) {
      totalCoprimes += 1;
    }
  }
  return totalCoprimes;
};

export const isPowerOfTwo = (n: number) => n && (n & (n - 1)) === 0;

export const extractExponent = (n: number, base: number) => {
  for (let i = 1; i < n; i++) {
    if (Math.pow(n, 1 / i) === base) return i;
  }
  return 0;
};
export const carmichaelFunction = (n: number): number => {
  console.log('calculating carmichaels value for ' + n + '...');
  if (n === 1) return n;
  const factorPair = getFactorPair(n) || [n];

  //   console.log(factorPair);
  const handleNumber = (num: number) => {
    //  console.log('handleNumber', num);
    if (isPowerOfOddPrime(num)) {
      // console.log('isPowerOfOddPrime', num);
      return eulersTotient(num);
    }
    if (isPowerOfTwo(num)) {
      // console.log('isPowerOfTwo', num);
      const exponent = extractExponent(num, 2);
      if (exponent === 0) return 0;
      if (exponent < 3) {
        return Math.pow(2, exponent - 1);
      } else {
        return Math.pow(2, exponent - 2);
      }
    }
    if (isPrime(num)) {
      // console.log('isPrime', num);
      return num - 1;
    } else {
      const coprimePair = getCoprimeFactorPair(num);
      // console.log('isDifferent', num);

      if (coprimePair) {
        return lcm(
          carmichaelFunction(coprimePair[0]),
          carmichaelFunction(coprimePair[1])
        );
      }

      return 0;
    }
  };

  if (isPrime(n) || isPowerOfOddPrime(n) || isPowerOfTwo(n)) {
    return handleNumber(n);
  } else {
    console.log('AAAAAA');
    const finalNumbers: number[] = factorPair.map(handleNumber);
    return lcmm(finalNumbers);
  }
};
