import {
  gcd,
  genRandomPrime,
  hammingWeight,
  lcm,
  modularInverse,
  randomInt,
  strToHex,
} from './functions.js';

//DOM queries
const privateKeyDisplay = document.querySelector(
  '#private-key-display'
) as HTMLSpanElement;
const publicKeyDisplayN = document.querySelector(
  '#public-key-display_n'
) as HTMLSpanElement;
const publicKeyDisplayE = document.querySelector(
  '#public-key-display_e'
) as HTMLSpanElement;

const inputMessage = document.querySelector(
  '#input-message'
) as HTMLTextAreaElement;
const inputFriendPublicKeyN = document.querySelector(
  '#input-friend-public-key_n'
) as HTMLInputElement;
const inputFriendPublicKeyE = document.querySelector(
  '#input-friend-public-key_e'
) as HTMLInputElement;

const outputEncryptedMessage = document.querySelector(
  '#output-encrypted-message'
) as HTMLTextAreaElement;
const inputEncryptedMessage = document.querySelector(
  '#input-encrypted-message'
) as HTMLTextAreaElement;
const outputDecryptedMessage = document.querySelector(
  '#output-decrypted-message'
) as HTMLTextAreaElement;
const encryptBtn = document.querySelector('#encrypt-btn') as HTMLButtonElement;
//key generation
const p = genRandomPrime(9);
const q = genRandomPrime(12);
const n = p * q;
const nLambda = lcm(p - 1, q - 1);

const es: { n: number; bitLength: number; hammingWeight: number }[] = [];
for (let i = 0; i < 10; i++) {
  let e: number;
  do {
    e = randomInt(2, nLambda - 1);
  } while (gcd(e, nLambda) !== 1);
  es.push({
    n: e,
    bitLength: Math.log2(e + 1),
    hammingWeight: hammingWeight(e.toString()),
  });
}

const prevEs = [...es];
const sortedEs = es.sort((a, b) => {
  if (a.bitLength + a.hammingWeight < b.bitLength + b.hammingWeight) return -1;
  if (a.bitLength + a.hammingWeight > b.bitLength + b.hammingWeight) return 1;
  return 0;
});

let e: number = sortedEs[0].n;

const d = modularInverse(e, nLambda);
if (privateKeyDisplay) {
  privateKeyDisplay.innerHTML = d.toString();
}

if (publicKeyDisplayN && publicKeyDisplayE) {
  publicKeyDisplayN.innerHTML = n.toString();
  publicKeyDisplayE.innerHTML = e.toString();
}
console.log('d is:', d, strToHex('Hello world!'));

//UI handling

// encryptBtn &&
//   encryptBtn.addEventListener('click', () => {
//     const message = inputEncryptedMessage.value;
//     const friendsKey = inputFriendPublicKeyN.value;
//     const friendsExponent = inputFriendPublicKeyE.value;
//   });
//every positive integer n  positive integer λ(n), defined as the smallest positive integer m such that for every integer a between 1 and n that is coprime to n
