import React from 'react'
import {AppBar,Button,Toolbar} from "@mui/material"
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate= useNavigate()

  const handleLogout=()=>{
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <AppBar position='static'>
        <Toolbar>
            <Link to='/home' className='navbar-options' style={{textDecoration: 'none'}}>
            <p  className='text'>Home</p>
            </Link>
            <Link to='/addUser' className='navbar-options' style={{textDecoration: 'none'}}>
            <p className='text'>Add User</p>
            </Link>
        <Button className='btn' variant='contained' onClick={()=> handleLogout()}>Logout </Button>
        </Toolbar>

    </AppBar>
  )
}

export default Navbar