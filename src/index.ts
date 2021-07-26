import { carmichaelFunction, genRandomPrime } from './functions.js';

//DOM queries
const privateKeyDisplay = document.querySelector('#private-key-display');
const publicKeyDisplay = document.querySelector('#public-key-display');
const inputMessage = document.querySelector('#input-message');
const inputFriendPublicKey = document.querySelector('#input-friend-public-key');
const outputEncryptedMessage = document.querySelector(
  '#output-encrypted-message'
);
const inputEncryptedMessage = document.querySelector(
  '#input-encrypted-message'
);
const outputDecryptedMessage = document.querySelector(
  '#output-decrypted-message'
);

//functions

const calculate = (n: number) => {
  console.log('the value for ' + n, 'is:', carmichaelFunction(n));
};

calculate(469464541);
//key generation
const p = genRandomPrime(10);
const q = genRandomPrime(15);

const n = p * q;
console.log(p, q);

//every positive integer n  positive integer λ(n), defined as the smallest positive integer m such that for every integer a between 1 and n that is coprime to n
