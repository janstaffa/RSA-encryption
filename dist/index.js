import { carmichaelFunction, genRandomPrime } from './functions.js';
const privateKeyDisplay = document.querySelector('#private-key-display');
const publicKeyDisplay = document.querySelector('#public-key-display');
const inputMessage = document.querySelector('#input-message');
const inputFriendPublicKey = document.querySelector('#input-friend-public-key');
const outputEncryptedMessage = document.querySelector('#output-encrypted-message');
const inputEncryptedMessage = document.querySelector('#input-encrypted-message');
const outputDecryptedMessage = document.querySelector('#output-decrypted-message');
const calculate = (n) => {
    console.log('the value for ' + n, 'is:', carmichaelFunction(n));
};
calculate(469464541);
const p = genRandomPrime(10);
const q = genRandomPrime(15);
const n = p * q;
console.log(p, q);
//# sourceMappingURL=index.js.map