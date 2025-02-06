import { useState,useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import AdminLayout from './components/admin/AdminLayout'

import Dashboard from "./components/admin/Dashboard"
import Menu from './components/customer/Menu'
import InsertItems from './components/admin/InsertItems'
import MenuItems from './components/admin/MenuItems'
import MenuDetails from "./components/admin/MenuDetails"
import Authpanel from "./components/admin/auth/Authpanel"


function App() { 
  const [isAuth, setIsAuth] = useState(false)
  useEffect(()=>{
    if(!sessionStorage.getItem("token")){
      setIsAuth(false)
    }
    setIsAuth(sessionStorage.getItem("token") ? true :false)
  },[isAuth])

  return (
    <Router>
      <Routes>
        {isAuth ? (
          <Route path ="/admin"  element={<AdminLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="insert-items"  element={<InsertItems/>}/>     
          <Route path="menu-items" element={<MenuItems/>}/>
          <Route path="menu/:id" element={<MenuDetails/>}/>        
        </Route>
        ):( <Route path="/admin/auth" element={<Authpanel/>}/>)}     
        {/* <Route path="/admin/auth" element={<Authpanel/>}/> */}
       
        <Route path="/">
         <Route index element={<Menu/>}/>

        </Route>
        <Route path="*" element={<Navigate to="/admin/auth" replace/>} />
      </Routes>
    </Router>
   
  )
}

export default App
