import CryptoJS from 'crypto-js';

export const generateKeyPair = () => {
  const privateKey = CryptoJS.lib.WordArray.random(32).toString();
  const publicKey = CryptoJS.SHA256(privateKey).toString();
  return { privateKey, publicKey };
};

export const encryptMessage = (message: string, publicKey: string) => {
  return CryptoJS.AES.encrypt(message, publicKey).toString();
};

export const decryptMessage = (encryptedMessage: string, privateKey: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, privateKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};