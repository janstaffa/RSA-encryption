export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

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

// export const lcmm = (numbers: number[]) => {
//   let response = 1;
//   for (const n of numbers) {
//     response = lcm(n, response);
//   }
//   return response;
// };

// https://en.wikibooks.org/wiki/Algorithm_Implementation/Mathematics/Extended_Euclidean_algorithm#Python
export const extendedEuclideanAlgorithm = (n: number, m: number): number[] => {
  if (n === 0) {
    return [m, 0, 1];
  }
  const m_div_n = Math.floor(m / n),
    m_mod_n = m % n;

  const [g, x, y] = extendedEuclideanAlgorithm(m_mod_n, n);
  return [g, y - m_div_n * x, x];
};
export const modularInverse = (n: number, m: number) => {
  const [g, x, _] = extendedEuclideanAlgorithm(n, m);
  if (g !== 1) return 0;
  return x % m;
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
    arr[i] = ('00' + str.charCodeAt(i).toString(16)).slice(-4);
  }
  return arr.join(' ');
};
