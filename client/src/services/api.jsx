import axios from 'axios'

import { Api } from '../utlils/interceptor-utils';


const URL='http://localhost:8000';

export const addUser= async (data)=>{
//     let token="";
// if(localStorage.getItem('user'))
// {
//     token=JSON.parse(localStorage.getItem('user')).token;
// }
// console.log('token is : ' +token);
//     try {
//       return await axios.post(`${URL}/user/useradded/add`,data,{
//         headers:{
//             'Content-Type' : 'application/json',
//             'Authorization' : `Bearer ${token}`
//         }
//     })
        
//     } catch (error) {

//         console.log('erro while calling add user Api' ,error)
//     }

// return Api({url:`/user/useradded/add`, method:'get', data:data});

return Api.post(`/user/useradded/add`, data)

}

export const getUsers=async()=>{
    debugger
//     let token="";
// if(localStorage.getItem('user'))
// {
//     token=JSON.parse(localStorage.getItem('user')).token;
// }
// console.log('token is : ' +token);
//     try {

//         return await axios.get(`${URL}/user/all`,{
//             headers:{
//                 'Content-Type' : 'application/json',
//                 'Authorization' : `Bearer ${token}`
//             }
//         }
//     )
//     } catch (error) {
//         console.log('erro while calling getUsers Api' ,error)

//     }

// return Api({url:'/user/all' , method:'get'});
return Api.get(`/user/all`)


}

export const getUser=async(id)=>{
//     let token="";
// if(localStorage.getItem('user'))
// {
//     token=JSON.parse(localStorage.getItem('user')).token;
// }
// console.log('token is : ' +token);
//     try {
//         return await axios.get(`${URL}/user/get/${id}`,{
//             headers:{
//                 'Content-Type' : 'application/json',
//                 'Authorization' : `Bearer ${token}`
//             }
//         }
//     )
        
//     } catch (error) {
//         console.log('erro while calling getUser Api' ,error)
        
    // }
// return Api({url:`/user/get/${id}` , method:'get'});

return Api.post(`/user/get/${id}`)

}
export const updateUser= async(user,id)=>{
//     let token="";
// if(localStorage.getItem('user'))
// {
//     token=JSON.parse(localStorage.getItem('user')).token;
// }
// console.log('token is : ' +token);
//     try {
//         return await axios.post(`${URL}/user/update/${id}`, user ,{
//             headers:{
//                 'Content-Type' : 'application/json',
//                 'Authorization' : `Bearer ${token}`
//             }
//         }
//      )
//     } catch (error) {
//         console.log('erro while calling UpdateUser Api' ,error)
        
//     }

// return Api({url:`/user/update/${id}`, method:'post', data:user});
return Api.post(`/user/update/${id}`,user)
}

export const deleteUser=async(id)=>{
//     let token="";
// if(localStorage.getItem('user'))
// {
//     token=JSON.parse(localStorage.getItem('user')).token;
// }
// console.log('token is : ' +token);
//     debugger
//     try {
//         return await axios.delete(`${URL}/user/delete/${id}`,{
//             headers:{
//                 'Content-Type' : 'application/json',
//                 'Authorization' : `Bearer ${token}`
//             }
//         }
//     )
//     } catch (error) {
//         console.log('erro while calling deleteUser Api' ,error)
        
//     }


// return Api({url:`/user/delete/${id}`, method:'delete'});

return Api.delete(`/user/delete/${id}`)

}

export const loginUser=async(credentials)=>{
    debugger
    try {
        return await axios.post(`${URL}/user/userlogin`, credentials).then((res)=>{
            if(res.data.result){
                localStorage.setItem("user",JSON.stringify(res.data.result))
            }
            return res.data;
        })
    } catch (error) {
       return console.log('erro while calling LoginUser Api' ,error)
        
    }
}