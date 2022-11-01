import  Jwt  from "jsonwebtoken";
import NodeRsa from "node-rsa"

// import CryptoJS from 'crypto-js'

export const verifyToken=async(req,res,next)=>{
  // const pkey=`U2FsdGVkX1/UKsIymzaX+x7QPnBjd+pzASZtCOd6c4t49GPW7n2EHBNmH8VXZWDTZIH/r4t+GgFkIuWqDxk4Zc8+ERzMG4u4NORbT62dj13fBZDTq9CJkEumvUzlvXaxpbi6kAqTEcVboch78KYt6U5PxGIxXkQEmfM0aMgch3LlxBgM8zdJws7bXc8Ffq+p/px2Wpo3SAV8sHXwkZon0osZqd5Fxdr1wCfKZBmAANgKzxYrOZTyqc+/U1naSScDQx14SRsOTLriBSy/buXIfoFpeY6wUO0qG5OYbMvDfUrW2CZQZKpRYE9ApWuCib+ih9AWdDoKvIbmI4nUhOsWvKfKz4bYvch7+kaITOLrnilV8LB7F86rS7sjOFeQVbakZaV5qzbuCJE6e0al+jODlDd4NV2FovVL8XsZfZh4P6HJS+KpbVasoqTR8ou8QfBmpVXL2C0Ug31cjAR8G07o/jy0Lw4hwR4xtiucJYpW4M1Ff/0NNCAfaGR1b3uZejwtOTfN49u5k1qcdBg6ZcDxdCirT+8cp2blcrq5z8yhx1T5sd4+CGeT8UY0sINd356q3ZnSV641THK3MrSEp1jCtH5Gt3oJql7umDTgW/IWSnzAWI8Ia4uKQeFGcJ6xZAMvGceRYHfPcSMF8uBTeIHHcDbnk0DnkJ+CbX2kGaIwrVgC8w5e4pUVLz16Mfd3bDdtT0GgEwUujDuaerz+0BvePspPhwDAYCXoqATr6xyoiJi3F5LVsnGeq4sYc85vVWK6VKa0Fgk1pLbWmC3WUCUwwg1GXsjL9dq8chTfFqXnE+Y3D2Ev0ABVVnF8jG9pmut7JTcvf9cfnqh+rjr3N+eHERCnRcZV9TlTu01Q3a3/J6oRgaOUNdvXELEY4HRKkT34m508vNzwLFOMYM5ylUeHKRd5r+QUmHScOCpxRlCoKcc=
  // `
  // const bytes=CryptoJS.AES.decrypt(req.body, req.body.PublicKey)
  // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // const token= req.body;
    var privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ
WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR
aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB
AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv
xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH
m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd
8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF
z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5
rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM
V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe
aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil
psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz
uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876
-----END RSA PRIVATE KEY-----`

let key_private= new NodeRsa(privateKey);

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if(!token) {
       return await res.status(401).json({ message: "user/token not found" });
    }
 
    // Authenticate token
    try {
      const user = Jwt.verify(token, process.env.JWT);
      
      if(user){
        req.user=user;
        // console.log("verify"+ token)
        next();
      }
      else{
          return res.status(401).json({errors: "token is not verified"})
        
      }
    } catch (error) {
      res.status(401).json({errors: "Invalid token"})
    };
}
export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next);
    // verifyToken(req,res, async()=>{
    //     if(req.user.id != req.body.id){
    //         return await res.status(401).json("You are not authenticated!")
    //     }
    //     else{
    //         // return await res.status(201).json("user is authenticated");
    //         next();
    //     }
    // })
}
// export const verifyRefresh=(refreshToken)=>{
//   try {
//     const decoded = Jwt.verify(refreshToken,process.env.REFRESH_TOKEN_KEY);
//     return decoded === refreshToken;
//    } catch (error) {
//     // console.error(error);
//     return console.error(error);
//    }
// }




