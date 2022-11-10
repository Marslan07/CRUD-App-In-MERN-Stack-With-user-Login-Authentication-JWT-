import axios from "axios";
import CryptoJS from "crypto-js";
import forge from "node-forge";

const URL = "http://localhost:8000";

export const Api = axios.create({ baseURL: URL });

var publicKey = `this is my secret key`;

var pubkey = `-----BEGIN PUBLIC KEY-----
MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBe7RHxteqfVgVZsvkX4TUf
Uaa6OW0TYDwFsgnv4P/QxlAZ8mUV/2GMBd+JSODHmouoQ1fxGA+jkqH9IoMKwMfO
5pvTPvhkh/zVjSZhagCRtRoRfSE9XuvurdPlHwb7AwUe+RdhmbozYBYU0EiCje/r
FGqkHAKl93HbzZLX2Yb3cX/n4KZev1EMIiAIhDcqG7/3zZkVyQEfD2m8P8uNnpv+
0dkBIYQ/XG3pKTQPWpa+NSt/UPfRC/VD2QuAxLA4WReH+yFs121KHlqpXO1D3Ybr
+slWP7PMTF7ghNnqJlEjWBomoBOywHpSErtHWhK719IWoOQ5idyQgdhhoROp6S1F
AgMBAAE=
-----END PUBLIC KEY-----`;

var privkey = `-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQBe7RHxteqfVgVZsvkX4TUfUaa6OW0TYDwFsgnv4P/QxlAZ8mUV
/2GMBd+JSODHmouoQ1fxGA+jkqH9IoMKwMfO5pvTPvhkh/zVjSZhagCRtRoRfSE9
XuvurdPlHwb7AwUe+RdhmbozYBYU0EiCje/rFGqkHAKl93HbzZLX2Yb3cX/n4KZe
v1EMIiAIhDcqG7/3zZkVyQEfD2m8P8uNnpv+0dkBIYQ/XG3pKTQPWpa+NSt/UPfR
C/VD2QuAxLA4WReH+yFs121KHlqpXO1D3Ybr+slWP7PMTF7ghNnqJlEjWBomoBOy
wHpSErtHWhK719IWoOQ5idyQgdhhoROp6S1FAgMBAAECggEAA+gLqf/LhP0cQUG9
QH9TGVPZ4aYFWBvIvI9EG2wN+wB+QWMZR9t3nzSKq3KlVXGFt8n1r4VG93tMUUd/
Twz57AjPdtULkc+K1xr07mNXXKewR/H3UTg7y1m5857gQaoxJsIndSvHXt/gaMDd
iwneSrVPYiuI7F2PgPUnytw30qz7N/R+fYBCUI4VdC4mJuejKsnt2Zshh+5E/haJ
u/BEGJj8EZTaoYIcz6Irkl6hTgnVCLdXc0rOJwHXBq1FIp02zBIk1wT41bj13AyR
X+O+Rtn+qBYS8UtVaREX+pPvucjz0zH324TMFNDvVkfE/xTyre32Ixcscdoy6eBj
KYdAwQKBgQCipnpzI66f5Y0wYafWESmYitL3pUhSFpWwyROWPlEn05P+y+8+aAij
15GzAjOOa3fAHqQCsgI9thn0o0JWQeyCaLB9p+aILsQyODJQMvaoyKCcDx2huRJF
DbLU0D1htA8TxxPeAbiKppW189z6N5zDWvI6FGtQTWNK0YvOU+lE8QKBgQCVaCdq
YT84bgTYp/FTO+WF1Le/APkf4zDUukPcOrRwYpKNjate9ep+D8pEWJhNpX9VrwtK
3nfIRwgUcXY4LpV0QLWHRxg0rdVnd91/gJyf0F28UKaTmzi0gW0FOjDbJfFCuoA+
qaj1fyi3kORXv18OFI/PKLJiBSuUS4WnHKDdlQKBgQCBhUilP5jjQ4z3Jgzc7rXM
/1+YTUoV9F4ndTffwKgnqtiDYiqV64pVzmf7wJkFpJarqrq4WsBmHAj3QrqkrcKE
5pEEvxtY/sTFqPKH4s2BAqLDI1ZZXmMqEgqCZYE7uIL5IOK1O3GVF6rIRfWGW5q+
BkI19eSvAbE79zn5h+COQQKBgARasrtg9iy42B9QVbItTrUly+0fJCOPxX6Npyil
9VhJJyhE9refxyPBZg2z30x0BFAE9/lInokRuOSPofhlMyneMOwuYEA4yL1pOuVa
ZDYsJm80koY+wdpQ41KBrabVZkChmtc4rpnpCNDAwkbkZurMIpzQ/NHqgKijwtNp
/C45AoGAdX1+lH7y4HlDNI6VbjFNhq/wKtnSRVO7eUI0ZUKDDsthgrE4OhLmRbER
TB6RQLHA0TkCYrirtYxzJHmPNMgQ7lRR9rMvqYvslKd5ao2cXcNr8mCeJrdn16rg
Ome2HWTEEeQ62AhLBAIkbknSKaGdeJ1cDE5cDeDLqkuhr6ImPV4=
-----END RSA PRIVATE KEY-----`;

export const getLocalRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.refreshToken;
};

export const updateLocalAccessToken = (token) => {
  let user = JSON.parse(localStorage.getItem("user"));
  user.token = token;
  localStorage.setItem("user", JSON.stringify(user));
};

// Add a request interceptor

Api.interceptors.request.use(
  function (config) {
    if (localStorage.getItem("user")) {
      const token = JSON.parse(localStorage.getItem("user")).token;

      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      config.headers["Authorization"] = `Bearer `;
    }

    let encypted = CryptoJS.AES.encrypt(
      JSON.stringify(config),
      publicKey
    ).toString();

    debugger;
    var pki = forge.pki;
    var rsa = forge.pki.rsa;

    var keypair = rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
    var pubKeyPEM = pki.publicKeyToPem(keypair.publicKey);
    var privKeyPEM = pki.privateKeyToPem(keypair.privateKey);
    console.log(pubKeyPEM);
    console.log(privKeyPEM);
    const RSA_PUBLIC_KEY = forge.pki.publicKeyFromPem(pubkey);

    var ciphertext = RSA_PUBLIC_KEY.encrypt(publicKey, "RSA-OAEP", {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha1.create(),
      },
    });
    console.log("rsa data is " + ciphertext);
    config.data = { encypted, ciphertext };
    // config.data = { encypted, publicKey };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor

Api.interceptors.response.use(
  (res) => {
    console.log(res);
    try {
      console.log(res.data.user);
      const user = res.data.user;
      const RSA_PRIVATE_KEY = forge.pki.privateKeyFromPem(privkey);

      var ciphertext = RSA_PRIVATE_KEY.decrypt(user.publicKey, "RSA-OAEP", {
        md: forge.md.sha256.create(),
        mgf1: {
          md: forge.md.sha1.create(),
        },
      });
      let bytes = CryptoJS.AES.decrypt(user.encypted, ciphertext);
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      if (decryptedData) {
        return decryptedData;
      } else {
        console.log("encrypted data not found");
      }
    } catch (error) {
      return console.log(error);
    }
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await Api.post("/user/refreshToken", {
            refreshToken: getLocalRefreshToken(),
          });

          const { token } = rs;
          updateLocalAccessToken(token);

          return Api(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);
