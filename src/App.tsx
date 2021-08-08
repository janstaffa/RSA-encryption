import React, { useEffect, useRef } from 'react';
import {
  gcd,
  genRandomPrime,
  hammingWeight,
  lcm,
  modularInverse,
  randomInt,
} from './functions';

export const App = () => {
  const privateKeyDisplay = useRef<HTMLSpanElement>(null);
  const publicKeyDisplayN = useRef<HTMLSpanElement>(null);
  const publicKeyDisplayE = useRef<HTMLSpanElement>(null);

  const inputMessage = useRef<HTMLTextAreaElement>(null);
  const inputFriendPublicKeyN = useRef<HTMLInputElement>(null);
  const inputFriendPublicKeyE = useRef<HTMLInputElement>(null);

  const outputEncryptedMessage = useRef<HTMLTextAreaElement>(null);
  const inputEncryptedMessage = useRef<HTMLTextAreaElement>(null);
  const outputDecryptedMessage = useRef<HTMLTextAreaElement>(null);
  const encryptBtn = useRef<HTMLButtonElement>(null);
  const decryptBtn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    //key generation
    const p = genRandomPrime(5);
    const q = genRandomPrime(5);
    const n = p * q;
    console.log(p, q, n);
    const nLambda = lcm(p > 1 ? p - 1 : 1, q > 1 ? q - 1 : 1);

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

    const sortedEs = es.sort((a, b) => {
      if (a.bitLength + a.hammingWeight < b.bitLength + b.hammingWeight)
        return -1;
      if (a.bitLength + a.hammingWeight > b.bitLength + b.hammingWeight)
        return 1;
      return 0;
    });

    let e: number = sortedEs[0].n;

    console.log('nLambda', nLambda);
    const d = modularInverse(e, nLambda);
    if (privateKeyDisplay.current) {
      privateKeyDisplay.current.innerHTML = d.toString();
    }

    if (publicKeyDisplayN.current && publicKeyDisplayE.current) {
      publicKeyDisplayN.current.innerHTML = n.toString();
      publicKeyDisplayE.current.innerHTML = e.toString();
    }
    console.log('d is:', d, Number.isSafeInteger(d));

    //  for (let i = 0; i < 100; i++) {
    //    const n = i * randomInt(1, 500);
    //    const [r1, r2] = [isPrimeBI(new BigInteger(n.toString())), isPrime(n)];
    //    console.log(r1 !== r2 ? n + ' - ' + r1 + ', ' + r2 : r1 + ', ' + r2);
    //  }

    //  console.log('genRandomPrimeBI', genRandomPrimeBI(14).toString());
  }, []);

  // encryptBtn &&
  //   encryptBtn.addEventListener('click', () => {
  //     const message = inputMessage.value;
  //     const friendsKey = inputFriendPublicKeyN.value;
  //     const friendsExponent = inputFriendPublicKeyE.value;

  //     //  const messageNumber = hexToDec(strToHex(message));
  //     const messageNumber = parseInt(message);
  //     //  console.log(strToHex(message));
  //     const cipher =
  //       Math.pow(messageNumber, parseInt(friendsExponent)) % parseInt(friendsKey);
  //     console.log('cipher', cipher);
  //     outputEncryptedMessage.value = cipher.toString();
  //   });

  // decryptBtn &&
  //   decryptBtn.addEventListener('click', () => {
  //     const encryptedMessage = inputEncryptedMessage.value;

  //     console.log('decrypting...', encryptedMessage);
  //     const message = Math.pow(parseInt(encryptedMessage), d) % n;
  //     console.log(
  //       'message...',
  //       message,
  //       Math.pow(parseInt(encryptedMessage), d),
  //       d
  //     );
  //     outputDecryptedMessage.value = message.toString();
  //   });
  return (
    <div className="App">
      <div className="main">
        <h1>RSA encryption</h1>
        <hr />
        <div className="text-center text">
          <b>Your private key:</b> <span ref={privateKeyDisplay}></span>
        </div>
        <div className="text-center text">
          <b>Your public key(key, exponent):</b> (
          <span ref={publicKeyDisplayN}></span>,{' '}
          <span ref={publicKeyDisplayE}></span>)
        </div>
        <hr />
        <div className="wraper">
          <div className="side">
            <div className="inner-wrapper">
              <h3>Encrypt:</h3>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea name="message" ref={inputMessage} rows={8}></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="friends-public-key">
                  Your friends public key(key, exponent):
                </label>
                <div className="inline">
                  <input
                    type="text"
                    name="friends-public-key_n"
                    ref={inputFriendPublicKeyN}
                    placeholder="key"
                  />
                  <input
                    type="text"
                    name="friends-public-key_e"
                    ref={inputFriendPublicKeyE}
                    placeholder="exponent"
                  />
                </div>
              </div>
              <div className="center">
                <button ref={encryptBtn}>encrypt</button>
              </div>
              <div className="form-group">
                <label htmlFor="encrypted-message">Encrypted message:</label>
                <textarea
                  name="encrypted-message"
                  ref={outputEncryptedMessage}
                  rows={8}
                  readOnly={true}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="side">
            <div className="inner-wrapper">
              <h3>Decrypt:</h3>
              <div className="form-group">
                <label htmlFor="message">Encrypted message:</label>
                <textarea
                  name="message"
                  ref={inputEncryptedMessage}
                  rows={8}
                ></textarea>
              </div>
              <div className="center">
                <button ref={decryptBtn}>decrypt</button>
              </div>
              <div className="form-group">
                <label htmlFor="encrypted-message">Decrypted message:</label>
                <textarea
                  name="encrypted-message"
                  ref={outputDecryptedMessage}
                  rows={8}
                  readOnly={true}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
