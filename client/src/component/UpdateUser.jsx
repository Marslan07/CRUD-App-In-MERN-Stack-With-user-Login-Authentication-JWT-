import { Button, FormControl, FormGroup,Input,InputLabel, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateUser,getUser } from '../services/api'

const UpdateUser = () => {

  const defaultValue={
    name:'',
    email:'',
    password:'',
    phone:'',
    address:'',
      }
    const [user,setUser]=useState(defaultValue)
    
    useEffect(()=>{
      loadUserData()
    },[])
    
    const {id}= useParams();

    const loadUserData= async ()=>{
      const res= await getUser(id)
      setUser(res.data)
    }

    const navigate=useNavigate()


    const handlechanhe=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
        // console.log(user)
    }

    const handleUpdateUser=async()=>{
        await updateUser(user, id)
        navigate('/home')
    }

  return (
    <FormGroup className='input-form'>
        <Typography variant='h4' className='typography'>Update User</Typography>
        <FormControl>
        <InputLabel>Name</InputLabel>
        <Input name='name' onChange={(e)=> handlechanhe(e)} value={user.name}/>
        </FormControl>
        <FormControl>
        <InputLabel>Email</InputLabel>
        <Input name='email' onChange={(e)=> handlechanhe(e)} value={user.email}/>
        </FormControl>
        <FormControl>
        <InputLabel>Phone</InputLabel>
        <Input name='phone' onChange={(e)=> handlechanhe(e)} value={user.phone}/>
        </FormControl>
        <FormControl>
        <InputLabel>Address</InputLabel>
        <Input name='address' onChange={(e)=> handlechanhe(e)} value={user.address}/>
        </FormControl>
        <FormControl>
        <Button variant='contained' onClick={()=> handleUpdateUser()}>Update User </Button>
        </FormControl>
    </FormGroup>
  )
}

export default UpdateUser