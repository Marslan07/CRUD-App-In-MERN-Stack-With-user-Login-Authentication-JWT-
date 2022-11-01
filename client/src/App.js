import './App.css';
import {Route, Routes} from "react-router-dom"
import Navbar from './component/Navbar';
import Users from './component/Users';
import AddUser from './component/AddUser';
import UpdateUser from './component/UpdateUser';
import Signin from './component/Signin';

function App() {
  return (
    <div className="App">
     <Navbar/>
     <Users/>
    </div>
  );
}

export default App;
