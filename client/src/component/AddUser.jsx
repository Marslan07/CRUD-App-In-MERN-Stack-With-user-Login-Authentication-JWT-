import { Button, FormControl, FormGroup,Input,InputLabel, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../services/api'

const AddUser = () => {
    const defaultValue={
        name:'',
        email:'',
        password:'',
        phone:'',
        address:''
    }

    const navigate=useNavigate()

    const [user,setUser]=useState(defaultValue)

    const handlechanhe=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
        console.log(user)
    }

    const handleAddUser=async()=>{
        const result=await addUser(user)
        // console.log("result of add: "+Object.keys(result.data.user));
        navigate('/home')
    }

  return (
    <FormGroup className='input-form'>
        <Typography variant='h4' className='typography'>Add User</Typography>
        <FormControl>
        <InputLabel>Name</InputLabel>
        <Input name='name' onChange={(e)=> handlechanhe(e)}/>
        </FormControl>
        <FormControl>
        <InputLabel>Email</InputLabel>
        <Input type='email' name='email' onChange={(e)=> handlechanhe(e)}/>
        </FormControl>
        <FormControl>
        <InputLabel>Password</InputLabel>
        <Input name='password' onChange={(e)=> handlechanhe(e)}/>
        </FormControl>
        <FormControl>
        <InputLabel>Phone</InputLabel>
        <Input name='phone' onChange={(e)=> handlechanhe(e)}/>
        </FormControl>
        <FormControl>
        <InputLabel>Address</InputLabel>
        <Input name='address' onChange={(e)=> handlechanhe(e)}/>
        </FormControl>
        <FormControl>
        <Button variant='contained' onClick={()=> handleAddUser()}>Add User </Button>
        </FormControl>
    </FormGroup>
  )
}

export default AddUser