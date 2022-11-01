import React from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'

const ProtectedRoutes = ({isAuthenticated, children}) => {
   
  if(isAuthenticated){
    return isAuthenticated.token ? children : <Navigate to='/login'/>
  }
}

export default ProtectedRoutes