import CryptoJS from 'crypto-js'

const NEXT_PUBLIC_CRYPTO_SECRET_KEY =
  typeof process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY === 'string' ? process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY : ''

export const decryptData = (data: string) => {
  const bytes = CryptoJS.AES.decrypt(data, NEXT_PUBLIC_CRYPTO_SECRET_KEY)

  return bytes.toString(CryptoJS.enc.Utf8)
}
function generateKey() {
  return CryptoJS.SHA256(process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY as string)
}

function generateIV() {
  return CryptoJS.lib.WordArray.random(16) // 128-bit IV
}

export function encryptData(plainText: string) {
  const key = generateKey()
  const iv = generateIV()

  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  // Combine IV + ciphertext
  const combined = iv.concat(encrypted.ciphertext)

  // Encode as Base64 string
  return CryptoJS.enc.Base64.stringify(combined)
}
