import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Signin from './component/Signin';
import Users from './component/Users';
import AddUser from './component/AddUser';
import UpdateUser from './component/UpdateUser';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoutes from "./utlils/ProtectedRoutes"

// const isLogedin=()=>{
//   const data=JSON.parse(localStorage.getItem('user'));
//   if(data){
//     return true
//   }
//   else{
//     return false;
//   }
// }
  // const isAuthenticated=JSON.parse(localStorage.getItem('user'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Signin />}/>
    <Route path='/home/*' element={<App />}></Route>
    <Route path='/user' element={<Users/>}/>
      <Route path='/addUser' element={<AddUser/>}/> 
      <Route path='/updateUser/:id' element={<UpdateUser/>}/>
  </Routes>
    
  </BrowserRouter>
);

reportWebVitals();
