import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.REACT_APP_ENCRYPTION_KEY || 'default-secret-key';

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const setEncryptedStorage = (key: string, value: string): void => {
  const encrypted = encryptData(value);
  localStorage.setItem(key, encrypted);
};

export const getDecryptedStorage = (key: string): string | null => {
  const encrypted = localStorage.getItem(key);
  if (!encrypted) return null;
  
  try {
    return decryptData(encrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    localStorage.removeItem(key);
    return null;
  }
};

export const removeStorage = (key: string): void => {
  localStorage.removeItem(key);
};