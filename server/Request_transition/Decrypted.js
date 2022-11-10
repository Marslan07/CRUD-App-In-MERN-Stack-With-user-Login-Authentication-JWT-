import CryptoJS from "crypto-js";
import forge from "node-forge"

const privkey=`-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`

export const decrypted = (req, res, next) => {
  try {
    const user = req.body;
    const user_id=req.params;

    const RSA_PRIVATE_KEY=forge.pki.privateKeyFromPem(privkey)
    var ciphertext =  RSA_PRIVATE_KEY.decrypt(user.ciphertext, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha1.create()
      }
    });

    if (user || user_id) {
      let bytes = CryptoJS.AES.decrypt(user.encypted, ciphertext);
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log(decryptedData.data);
      if (decryptedData) {
        req.body = decryptedData.data;
      }
      next();
    }
     else {
      console.log("encrypted data not found");
      res.status(500).json(error.message, " encrypted data not found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
