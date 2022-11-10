import CryptoJS from "crypto-js";
import forge from "node-forge";

const public_Key = `this is my second secrey key`;

const pubkey = `-----BEGIN PUBLIC KEY-----
 MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBe7RHxteqfVgVZsvkX4TUf
 Uaa6OW0TYDwFsgnv4P/QxlAZ8mUV/2GMBd+JSODHmouoQ1fxGA+jkqH9IoMKwMfO
 5pvTPvhkh/zVjSZhagCRtRoRfSE9XuvurdPlHwb7AwUe+RdhmbozYBYU0EiCje/r
 FGqkHAKl93HbzZLX2Yb3cX/n4KZev1EMIiAIhDcqG7/3zZkVyQEfD2m8P8uNnpv+
 0dkBIYQ/XG3pKTQPWpa+NSt/UPfRC/VD2QuAxLA4WReH+yFs121KHlqpXO1D3Ybr
 +slWP7PMTF7ghNnqJlEjWBomoBOywHpSErtHWhK719IWoOQ5idyQgdhhoROp6S1F
 AgMBAAE=
 -----END PUBLIC KEY-----`;

export const encrypted = (req, res) => {
  try {
    let user_Data = req.body;
    let encypted = CryptoJS.AES.encrypt(
      JSON.stringify(user_Data),
      public_Key
    ).toString();
    var pki = forge.pki;
    var rsa = forge.pki.rsa;

    var keypair = rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
    var pubKeyPEM = pki.publicKeyToPem(keypair.publicKey);
    var privKeyPEM = pki.privateKeyToPem(keypair.privateKey);
    console.log(pubKeyPEM, privKeyPEM);

    const RSA_PUBLIC_KEY = forge.pki.publicKeyFromPem(pubkey);
    const publicKey = RSA_PUBLIC_KEY.encrypt(public_Key, "RSA-OAEP", {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha1.create(),
      },
    });

    user_Data = { encypted, publicKey };
    res.status(201).json({ user: user_Data });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
