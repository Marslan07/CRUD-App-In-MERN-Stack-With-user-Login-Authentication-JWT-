  
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsers, loginUser } from '../services/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Signin.css"
const Signin = () => {
debugger
  const initialValue={email:'',password:''}
  const [credentials,setCredentials]=useState(initialValue)
  const navigate = useNavigate();
  
  
  // const [user,setUser]=useState([])
  // console.log(user)
  
  // useEffect(()=>{
  //   getAllUsers();
  // },[])

  // const getAllUsers=async()=>{
  //   const res= await getUsers();
  //   setUser(res.data)
  //   // console.log(res.data);
  //   }

  const handlechange = (e) => {
    setCredentials((prev)=>({...prev,[e.target.name]:e.target.value}))
  };

    
    const handleSubmit = async () => {
      if(credentials.email ==="" || credentials.password ===""){
        navigate('/')
        toast.warn("please filled the input");
        console.log("please filled the input");
  
      }
      else
      {
        const UserLogedIn= await loginUser(credentials);
        console.log('verify is: ' + UserLogedIn)

        if(UserLogedIn)
        {
          JSON.parse(localStorage.getItem("user"));
          navigate('/home')
          alert('login Successfully')
          console.log("i am login now");
        }
        else{
          toast.warn('invalid username or password');
          navigate('/');
        }
      }
    };
  
 
  return (
    <div className='signin-container'>
        <div className="Signin-title">
          <h2>Sign in</h2>
        </div>
        <div className="input-field">
        <form action="">
        <input type="text" placeholder='Enter Email' name='email' onChange={(e)=> handlechange(e)}/>
        <input type="password" placeholder='Enter Password' name='password' onChange={(e)=> handlechange(e)}/>
        </form>
        </div>
        <button className="btn-login" onClick={()=>handleSubmit()}>Login</button>
        <ToastContainer/>
    </div>
  )
}

export default Signin