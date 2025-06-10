type EncryptionsAlgorithm = "AES-CBC" | "AES-CTR" | "AES-GCM" | "RSA-OAEP";

const createHash = async (value: string) =>
  await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));

export const encrypt = async (
  plainText: string,
  key: string,
  algorithm: EncryptionsAlgorithm = "AES-GCM",
  keyLength: number = 256
) => {
  // create a random 96-bit initialization vector (IV)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const secretKey = await crypto.subtle.importKey(
    "raw",
    await createHash(key),
    {
      name: algorithm,
      length: keyLength,
    },
    true,
    ["encrypt", "decrypt"]
  );

  const cipherText = await crypto.subtle.encrypt(
    {
      name: algorithm,
      iv,
    },
    secretKey,
    new TextEncoder().encode(plainText)
  );

  return [
    Buffer.from(iv).toString("base64"),
    Buffer.from(cipherText).toString("base64"),
    Buffer.from([algorithm, keyLength].join(":")).toString("base64"),
  ].join(".");
};

export const decrypt = async (encryptedText: string, key: string) => {
  const [iv, cipherText, encodedAlgorithm] = encryptedText.split(".");
  const [algorithm, keyLength] = Buffer.from(encodedAlgorithm, "base64")
    .toString("utf-8")
    .split(":");

  const secretKey = await crypto.subtle.importKey(
    "raw",
    await createHash(key),
    {
      name: algorithm,
      length: Number(keyLength),
    },
    true,
    ["encrypt", "decrypt"]
  );

  const clearText = await crypto.subtle.decrypt(
    {
      name: algorithm,
      iv: Buffer.from(iv, "base64"),
    },
    secretKey,
    Buffer.from(cipherText, "base64")
  );

  return new TextDecoder().decode(clearText);
};
