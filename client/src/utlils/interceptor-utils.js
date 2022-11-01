import axios from "axios";
// import NodeRsa from "node-rsa"

const URL='http://localhost:8000'

export const Api= axios.create({baseURL: URL,})


var publicKey = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
gwQco1KRMDSmXSMkDwIDAQAB
-----END PUBLIC KEY-----`;



// let key_public= new NodeRsa(publicKey);


export const getLocalRefreshToken=()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
  }

export const updateLocalAccessToken=(token)=>{
  debugger
    let user = JSON.parse(localStorage.getItem("user"));
    user.token= token;
    localStorage.setItem("user", JSON.stringify(user));
  }

  // export const getencryptionMethod=(data)=>{
  //   const encryptedData=key_public.encrypt(data, 'base64')
  //   return (encryptedData,key_public);
  // }
            // Add a request interceptor

            debugger
            Api.interceptors.request.use(function (config) {
                debugger
                if(localStorage.getItem('user')){
            const token = JSON.parse(localStorage.getItem('user')).token;

                  config.headers['Authorization'] =  `Bearer ${token}`;
                 
              }
              else{
                config.headers['Authorization'] =  `Bearer `;
              }
              debugger
              // let encypted = CryptoJS.AES.encrypt(JSON.stringify(config), PublicKey).toString();
              // console.log(encypted);
              // return getencryptionMethod(config);  
              return config;
              
            },
            error=>{return Promise.reject(error)});
            
            // Add a response interceptor
            debugger
            Api.interceptors.response.use(
              
              (res) => {
                debugger
                return res;
              }
                ,
                async (err) => {
                  const originalConfig = err.config;
                  // console.log(err);
                  console.log(originalConfig)
              debugger
                  if (err.response) {
                    // Access Token was expired
                    if (err.response.status === 401 && !originalConfig._retry) {
                      originalConfig._retry = true;
              
                      try {
                        const rs = await Api.post("/user/refreshToken",{
                          refreshToken:getLocalRefreshToken(),
                        });
              
                        const { token } = rs.data;
                        updateLocalAccessToken(token);
                        debugger
                        // originalConfig.headers['Authorization'] = 'Bearer ' + token;
                        // originalConfig.baseURL = undefined;
                        return Api(originalConfig);
                      } catch (_error) {
                        return Promise.reject(_error);
                      }
                    }
                  }
              
                  return Promise.reject(err);
                }
              );


            /////////////////////////////////////////
// axios.interceptors.request.use((config)=>{
//     debugger;
//     let token =''
//     if(localStorage.getItem('user')){
//         token= JSON.parse(localStorage.getItem('user').token)
//         config.headers.common.Authorization=`Bearer ${token}`
//         return config;
//     }
//   },(error)=>{
//     return Promise.reject(error);
//   });

// export const request=({...Option})=>{

//     let token="";
//     if(localStorage.getItem('user'))
//     {
//         token=JSON.parse(localStorage.getItem('user')).token;
//     }
//     Api.defaults.headers.common.Authorization=`Bearer ${token}`
//     const OnSuccess=(response)=>response;
//     const OnError=(error)=>{
//         console.log('erro while calling Api with Interceptor' ,error)
//         return error;

//     }
//     return user(Option).then(OnSuccess).catch(OnError);
// }
