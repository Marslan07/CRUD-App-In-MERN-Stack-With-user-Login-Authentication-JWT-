import { Button,Typography } from '@mui/material'
import Table from 'react-bootstrap/Table';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { getUsers , deleteUser } from '../services/api'

const Users = () => {
  const [users,setUsers]=useState([])
  const navigate=useNavigate()

  useEffect(()=>{
    if(!(localStorage.getItem('user'))){
      return navigate('/login')
    }
    getAllUsers();
  },[])

  const getAllUsers=async()=>{
    const res=await getUsers();
    setUsers(res);
    console.log(res);
  }

  const handleDeleteUser=async(id)=>{
    await deleteUser(id);
    getAllUsers();
  }

  return (
    <>
    <Typography variant='h4' className='typography-user'>Users Data</Typography>
    <Table  striped bordered hover size="sm">
      <thead>
        <tr>
          <td>Id</td>
          <td>Name</td>
          <td>Email</td>
          <td>Password</td>
          <td>Phone</td>
          <td>Address</td>
          <td>Created By</td>
          <td>Created Date</td>
          <td>Updated By</td>
          <td>Updated Date</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
      {users && users.length > 0 ? (
            users.map((user,index)=>{
              return (
                <tr key={index}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.created_by}</td>
                <td>{user.created_date}</td>
                <td>{user.updated_by}</td>
                <td>{user.updated_date}</td>
                <td className='tbl-btn'>
                <Button variant='contained' component={Link} to={`/updateUser/${user._id}`}>Update</Button>
                 &nbsp; 
                <Button variant='contained' onClick={()=> handleDeleteUser(user._id)}>Delete</Button></td>
              </tr>
                );})
            ) : (
              <div className="no-data">
                <h2>No Data Found</h2>
              </div>
            )}
       
      </tbody>
    </Table>
        </>
  )
}

export default Users