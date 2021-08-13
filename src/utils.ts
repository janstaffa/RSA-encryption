import { BigInteger } from 'jsbn';

export const isOdd = (n: number) => !!(n % 2);

export const bigNumber = (n: string) => {
  return new BigInteger(n);
};
export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const oddNumbers = [1, 3, 5, 7, 9];
export const randomOddNumber = () => {
  const randomIdx = randomInt(0, oddNumbers.length - 1);
  return oddNumbers[randomIdx];
};
export const strToHex = (str: string) => {
  const strArr = str.split('');
  let result = '';
  for (const n of strArr) {
    result += n.charCodeAt(0).toString(16);
  }

  return result;
};

export const hexToDec = (hexStr: string) => {
  const hexArr = hexStr.split('');
  let decimalResult = BigInteger.ZERO;
  let exponent = hexStr.length - 1;
  for (const hex of hexArr) {
    const multiplierValue = parseInt(hex, 16);
    decimalResult = decimalResult.add(
      bigNumber(multiplierValue.toString()).multiply(
        bigNumber('16').pow(exponent)
      )
    );
    exponent--;
  }
  return decimalResult;
};

export const decToHex = (decimalBI: BigInteger) => {
  let hexValue = '';

  let quotient = decimalBI;
  if (decimalBI.compareTo(bigNumber('16')) < 0) {
    return decimalBI.toString(16);
  }
  do {
    const [div, rem] = quotient.divideAndRemainder(bigNumber('16'));
    quotient = div;
    hexValue = decToHex(rem) + hexValue;
  } while (quotient.compareTo(BigInteger.ZERO) > 0);
  return hexValue;
};

export const textToNumber = (text: string) => {
  const textArr = text.split('');

  let hexString = '';
  for (const char of textArr) {
    const charCode = char.charCodeAt(0);
    hexString += charCode.toString(16);
  }
  return hexToDec(hexString);
};
export const numberToText = (number: string) => {
  const hexValue = decToHex(bigNumber(number));
  let text = '';
  for (let i = 0; i < hexValue.length; i += 2) {
    text += String.fromCharCode(parseInt(hexValue[i] + hexValue[i + 1], 16));
  }
  return text;
};
// NEW CODE WITH JSBN

export const genRandomPrimeBI = (length: number) => {
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
  } while (
    !bigNumber(response).millerRabin(40) ||
    bigNumber(response).compareTo(BigInteger.ZERO) === 0
  );

  return bigNumber(response);
};

export const lcmBI = (n1: BigInteger, n2: BigInteger): BigInteger => {
  return n1.multiply(n2).divide(n1.gcd(n2)).abs();
};

export const getJunk = (length: number) => {
  let response = '';
  for (let i = 0; i < length; i++) {
    response += String.fromCharCode(randomInt(33, 126));
  }
  return response;
};
export const padd = (text: string) => {
  const timestamp = new Date().getTime();

  const paddedText =
    timestamp.toString() +
    getJunk(5) +
    ' ' +
    text +
    ' ' +
    text.length.toString() +
    getJunk(5);

  return paddedText;
};

export const unpadd = (text: string) => {
  const textArr = text.split(' ');
  textArr.shift();
  textArr.pop();
  return textArr.join(' ');
};
