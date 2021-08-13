import { BigInteger } from 'jsbn';
import React, { useEffect, useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import {
  decToHex,
  genRandomPrimeBI,
  hexToDec,
  lcmBI,
  numberToText,
  padd,
  textToNumber,
  unpadd,
} from './utils';

export const App = () => {
  const privateExponentDisplay = useRef<HTMLTextAreaElement>(null);
  const publicExponentDispay = useRef<HTMLTextAreaElement>(null);
  const modulusDisplay = useRef<HTMLTextAreaElement>(null);

  const inputMessage = useRef<HTMLTextAreaElement>(null);
  const inputFriendModulus = useRef<HTMLInputElement>(null);
  const inputFriendPublicExponent = useRef<HTMLInputElement>(null);

  const outputEncryptedMessage = useRef<HTMLTextAreaElement>(null);
  const inputEncryptedMessage = useRef<HTMLTextAreaElement>(null);
  const outputDecryptedMessage = useRef<HTMLTextAreaElement>(null);

  const [encrypting, setEncrypting] = useState<boolean>(false);
  const [decrypting, setDecrypting] = useState<boolean>(false);
  const [addPaddnig, setAddPadding] = useState<boolean>(true);
  const addPaddingRef = useRef<boolean>(addPaddnig);
  addPaddingRef.current = addPaddnig;
  const [removePadding, setRemovePadding] = useState<boolean>(true);
  const removePaddingRef = useRef<boolean>(removePadding);
  removePaddingRef.current = removePadding;

  const [showDecimalValues, setShowDecimalValues] = useState<boolean>(false);
  const showDecimalValuesRef = useRef<boolean>(showDecimalValues);
  showDecimalValuesRef.current = showDecimalValues;
  const [pqLength, setPQLength] = useState<number>(100);
  //key generation
  const p = useRef<BigInteger>(BigInteger.ZERO);
  const q = useRef<BigInteger>(BigInteger.ZERO);
  const n = useRef<BigInteger>(BigInteger.ZERO);
  const nLambda = useRef<BigInteger>(BigInteger.ZERO);
  const e = useRef<BigInteger>(BigInteger.ZERO);
  const d = useRef<BigInteger>(BigInteger.ZERO);

  useEffect(() => {
    p.current = genRandomPrimeBI(pqLength);
    q.current = genRandomPrimeBI(pqLength);
    n.current = p.current.multiply(q.current);
    nLambda.current = lcmBI(
      p.current.compareTo(BigInteger.ONE) > 0
        ? p.current.subtract(BigInteger.ONE)
        : BigInteger.ONE,
      q.current.compareTo(BigInteger.ONE) > 0
        ? q.current.subtract(BigInteger.ONE)
        : BigInteger.ONE
    );
    e.current = new BigInteger('2').pow(16).add(BigInteger.ONE);
    d.current = e.current.modInverse(nLambda.current);
  }, [pqLength]);
  useEffect(() => {
    if (privateExponentDisplay.current) {
      privateExponentDisplay.current.innerHTML = showDecimalValuesRef.current
        ? d.current.toString()
        : d.current.toString(16);
    }

    if (modulusDisplay.current && publicExponentDispay.current) {
      modulusDisplay.current.innerHTML = showDecimalValuesRef.current
        ? n.current.toString()
        : n.current.toString(16);
      publicExponentDispay.current.innerHTML = showDecimalValuesRef.current
        ? e.current.toString()
        : e.current.toString(16);
    }
  });

  const handleEncrypt = async () => {
    if (
      !inputMessage.current ||
      !inputFriendModulus.current ||
      !inputFriendPublicExponent.current ||
      !outputEncryptedMessage.current
    ) {
      alert('Something went wrong, please try again later.');
      return;
    }

    const message = inputMessage.current.value;
    if (
      !message ||
      message.length === 0 ||
      !inputFriendModulus.current.value ||
      inputFriendModulus.current.value.length === 0 ||
      !inputFriendPublicExponent.current.value ||
      inputFriendPublicExponent.current.value.length === 0
    )
      return;
    setEncrypting(true);
    const friendsModulus = hexToDec(inputFriendModulus.current.value);
    const friendsExponent = hexToDec(inputFriendPublicExponent.current.value);
    const messageNumber = textToNumber(
      addPaddingRef.current ? padd(message) : message
    );
    if (messageNumber.compareTo(friendsModulus) >= 0) {
      alert(`This message is too long to encrypt.`);
      setEncrypting(false);
      return;
    }
    const cipher = messageNumber.modPow(friendsExponent, friendsModulus);
    setTimeout(() => {
      outputEncryptedMessage.current!.innerHTML = decToHex(cipher);
      setEncrypting(false);
    }, 1000);
  };

  const handleDecrypt = () => {
    setDecrypting(true);
    if (!inputEncryptedMessage.current || !outputDecryptedMessage.current) {
      alert('Something went wrong, please try again later.');
      setDecrypting(false);
      return;
    }
    const encryptedMessage = inputEncryptedMessage.current.value;
    if (!encryptedMessage || encryptedMessage.length === 0) return;
    const message = hexToDec(encryptedMessage).modPow(d.current, n.current);
    setTimeout(() => {
      const messageText = numberToText(message.toString());
      const decryptedMessage = removePaddingRef.current
        ? unpadd(messageText)
        : messageText;

      outputDecryptedMessage.current!.innerHTML = decryptedMessage;
      setDecrypting(false);
    }, 1000);
  };

  return (
    <div className="App">
      <img
        src="/images/background.png"
        alt="Background"
        className="background"
      />
      <div className="main">
        <h1>RSA encryption</h1>
        <hr />
        <div className="text-center text">
          <div className="text padding-y">
            <label>P and Q length(digits): </label>
            <input
              type="number"
              value={pqLength}
              min={5}
              max={500}
              onChange={(e) => setPQLength(parseInt(e.target.value))}
            />
          </div>
          <div className="text padding-y">
            <button onClick={() => setShowDecimalValues(!showDecimalValues)}>
              Show {showDecimalValues ? 'hex' : 'decimal'} values
            </button>
          </div>
          <p>
            <b>Your private exponent:</b>
          </p>
          <textarea
            ref={privateExponentDisplay}
            className="key-view"
            readOnly={true}
          ></textarea>
        </div>
        <div className="text-center text">
          <p>
            <b>Your public exponent:</b>
          </p>
          <textarea
            ref={publicExponentDispay}
            className="key-view"
            readOnly={true}
          ></textarea>
        </div>
        <div className="text-center text">
          <p>
            <b>Modulus:</b>
          </p>
          <textarea
            ref={modulusDisplay}
            className="key-view"
            readOnly={true}
          ></textarea>
        </div>
        <hr />
        <div className="wraper">
          <div className="side">
            <div className="inner-wrapper">
              <h3>Encrypt:</h3>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea name="message" ref={inputMessage} rows={6}></textarea>
              </div>
              <div className="form-group">
                <label>Friends modulus(hex):</label>
                <input
                  type="text"
                  ref={inputFriendModulus}
                  placeholder="modulus"
                />
                <label>Friends public exponent(hex):</label>
                <input
                  type="text"
                  ref={inputFriendPublicExponent}
                  placeholder="public exponent"
                />
              </div>
              <div className="center">
                <div className="text padding-y">
                  <label htmlFor="add-padding-checkbox">Add padding: </label>
                  <input
                    type="checkbox"
                    name="add-padding-checkbox"
                    checked={addPaddnig}
                    onChange={() => setAddPadding(!addPaddnig)}
                  />
                </div>
                <button onClick={handleEncrypt}>
                  {encrypting && <ClipLoader size={10} />} encrypt
                </button>
              </div>
              <div className="form-group">
                <label htmlFor="encrypted-message">
                  Encrypted message(hex):
                </label>
                <textarea
                  name="encrypted-message"
                  ref={outputEncryptedMessage}
                  rows={6}
                  readOnly={true}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="side">
            <div className="inner-wrapper">
              <h3>Decrypt:</h3>
              <div className="form-group">
                <label htmlFor="message">Encrypted message(hex):</label>
                <textarea
                  name="message"
                  ref={inputEncryptedMessage}
                  rows={6}
                ></textarea>
              </div>
              <div className="center">
                <div className="text padding-y">
                  <label htmlFor="remove-padding-checkbox">
                    Remove padding:
                  </label>
                  <input
                    type="checkbox"
                    name="remove-padding-checkbox"
                    checked={removePadding}
                    onChange={() => setRemovePadding(!removePadding)}
                  />
                </div>
                <button onClick={handleDecrypt} className="btn">
                  {decrypting && <ClipLoader size={10} />}
                  decrypt
                </button>
              </div>
              <div className="form-group">
                <label htmlFor="encrypted-message">Decrypted message:</label>
                <textarea
                  name="encrypted-message"
                  ref={outputDecryptedMessage}
                  rows={6}
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
