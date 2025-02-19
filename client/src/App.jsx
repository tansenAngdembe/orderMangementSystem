import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLayout from './components/admin/AdminLayout'

import Dashboard from "./components/admin/Dashboard"
import Menu from './components/customer/Menu'
import InsertItems from './components/admin/InsertItems'
import MenuItems from './components/admin/MenuItems'
import MenuDetails from "./components/admin/MenuDetails"
import Authpanel from "./components/admin/auth/Authpanel"
import { Orderlayout } from './components/admin/Orderlayout'
import { Manageorder } from './components/chef/Manageorder'
import { Myorder } from './components/customer/Myorder'
import { Customerboard } from './components/customer/Customerboard'
import { ProtectedRoute } from './context/protectRout'


function App() {
  const [isAuth, setIsAuth] = useState(false)
  useEffect(()=>{
    if(!sessionStorage.getItem("token")){
      setIsAuth(false)
    }
    setIsAuth(sessionStorage.getItem("token") ? true :false)
  },[isAuth])

  return (

    <Routes>
      {/* {isAuth ? ( */}
      {/* <ProtectedRoute>        */}
      <Route path="/admin" element={ <ProtectedRoute><AdminLayout /></ProtectedRoute> }>
        <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute> } />
        <Route path="insert-items" element={<InsertItems />} />
        <Route path="menu-items" element={<MenuItems />} />
        <Route path="menu/:id" element={<MenuDetails />} />
        <Route path="orders" element={<Orderlayout />} />
        <Route path="order/:id" element={<Manageorder />} />
      </Route>
      {/* </ProtectedRoute> */}
      {/* ):( <Route path="/admin/auth" element={<Authpanel/>}/>)}      */}
      <Route path="/admin/auth" element={<Authpanel />} />
      
      <Route path="/" element={<Customerboard/>}>
        <Route index element={<Menu/>} />
        <Route path="my-orders" element={<Myorder/>} />
      </Route>
      {/* <Route path="*" element={<Navigate to="/admin/auth" replace/>} /> */}
    </Routes>
  )
}

export default App
