export const isPrime = (n) => {
    if (n === 1 || n === 3)
        return true;
    if (n % 2 === 0 || n % 3 === 0)
        return false;
    let count = 5;
    while (Math.pow(count, 2) <= n) {
        if (n % count === 0 || n % (count + 2) === 0)
            return false;
        count += 6;
    }
    return true;
};
export const genRandomPrime = (length) => {
    let response = '';
    do {
        response = '';
        for (let i = 0; i < length; i++) {
            const n = Math.floor(Math.random() * 10);
            response += n;
        }
    } while (!isPrime(parseInt(response)));
    return parseInt(response);
};
export const gcd = (n1, n2) => {
    if (!n2) {
        return n1;
    }
    return gcd(n2, n1 % n2);
};
export const lcm = (n1, n2) => {
    return !n1 || !n2 ? 0 : Math.abs((n1 * n2) / gcd(n1, n2));
};
export const lcmm = (numbers) => {
    let response = 1;
    for (const n of numbers) {
        response = lcm(n, response);
    }
    return response;
};
export const getFactors = (n) => {
    let response = [];
    for (let i = 1; i <= n; i++) {
        if (n % i == 0) {
            response.push(i);
        }
    }
    return response;
};
export const getFactorPair = (n) => {
    let response = [];
    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            response.push(i);
            response.push(n / i);
            break;
        }
    }
    return response.length > 0 ? response : undefined;
};
export const getCoprimeFactorPair = (n) => {
    let response = [];
    for (let i = 2; i < n; i++) {
        if (gcd(i, n / i) === 1) {
            response.push(i);
            response.push(n / i);
            break;
        }
    }
    return response.length > 0 ? response : undefined;
};
export const isOdd = (n) => !((n + 1) % 2 === 1);
export const isPowerOfOddPrime = (n) => {
    if (isPrime(n))
        return false;
    for (let i = 2; i < n; i++) {
        const root = Math.pow(n, 1 / i);
        if (root % 1 !== 0)
            continue;
        console.log('root', root, i, n);
        if (isOdd(root))
            return true;
    }
    return false;
};
export const eulersTotient = (n) => {
    let totalCoprimes = 0;
    for (let i = 1; i < n; i++) {
        if (gcd(n, i) === 1) {
            totalCoprimes += 1;
        }
    }
    return totalCoprimes;
};
export const isPowerOfTwo = (n) => n && (n & (n - 1)) === 0;
export const extractExponent = (n, base) => {
    for (let i = 1; i < n; i++) {
        if (Math.pow(n, 1 / i) === base)
            return i;
    }
    return 0;
};
export const carmichaelFunction = (n) => {
    console.log('calculating carmichaels value for ' + n + '...');
    if (n === 1)
        return n;
    const factorPair = getFactorPair(n) || [n];
    const handleNumber = (num) => {
        if (isPowerOfOddPrime(num)) {
            return eulersTotient(num);
        }
        if (isPowerOfTwo(num)) {
            const exponent = extractExponent(num, 2);
            if (exponent === 0)
                return 0;
            if (exponent < 3) {
                return Math.pow(2, exponent - 1);
            }
            else {
                return Math.pow(2, exponent - 2);
            }
        }
        if (isPrime(num)) {
            return num - 1;
        }
        else {
            const coprimePair = getCoprimeFactorPair(num);
            if (coprimePair) {
                return lcm(carmichaelFunction(coprimePair[0]), carmichaelFunction(coprimePair[1]));
            }
            return 0;
        }
    };
    if (isPrime(n) || isPowerOfOddPrime(n) || isPowerOfTwo(n)) {
        return handleNumber(n);
    }
    else {
        console.log('AAAAAA');
        const finalNumbers = factorPair.map(handleNumber);
        return lcmm(finalNumbers);
    }
};
//# sourceMappingURL=functions.js.map