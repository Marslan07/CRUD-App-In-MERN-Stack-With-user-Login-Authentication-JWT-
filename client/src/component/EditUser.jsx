import { Button, FormControl, FormGroup,Input,InputLabel, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../services/api'

const AddUser = () => {
    const defaultValue={
        name:'',
        username:'',
        phone:'',
        email:'',
        address:''
    }

    const navigate=useNavigate()

    const [user,setUser]=useState(defaultValue)

    const handlechange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
        console.log(user)
    }

    const handleUpdateUser=async()=>{
        await addUser(user)
        navigate('/home')
    }

  return (
    <FormGroup className='input-form'>
        <Typography variant='h4' className='typography'>Add User</Typography>
        <FormControl>
        <InputLabel>Name</InputLabel>
        <Input name='name' onChange={(e)=> handlechange(e)}/>
        </FormControl>
        <FormControl>
        <InputLabel>Username</InputLabel>
        <Input name='username' onChange={(e)=> handlechange(e)}/>
        </FormControl>
        <FormControl>
        <InputLabel>Email</InputLabel>
        <Input name='email' onChange={(e)=> handlechange(e)}/>
        </FormControl>
        <FormControl>
        <InputLabel>Phone</InputLabel>
        <Input name='phone' onChange={(e)=> handlechange(e)}/>
        </FormControl>
        <FormControl>
        <InputLabel>Address</InputLabel>
        <Input name='address' onChange={(e)=> handlechange(e)}/>
        </FormControl>
        <FormControl>
        <Button variant='contained' onClick={()=> handleUpdateUser()}>Update User </Button>
        </FormControl>
    </FormGroup>
  )
}

export default AddUser