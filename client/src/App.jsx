import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AdminLayout from './components/admin/AdminLayout'

import Dashboard from "./components/admin/Dashboard"
import Menu from './components/customer/Menu'
import InsertItems from './components/admin/InsertItems'
import MenuItems from './components/admin/MenuItems'
import MenuDetails from "./components/admin/MenuDetails"


function App() { 

  return (
    <Router>
      <Routes>
        {/* admin routes */}
        <Route path ="/admin" element={<AdminLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="insert-items"  element={<InsertItems/>}/>     
          <Route path="menu-items" element={<MenuItems/>}/>
          <Route path="menu/:id" element={<MenuDetails/>}/>
        </Route>
        <Route path="/">
         <Route index element={<Menu/>}/>

        </Route>
      </Routes>
    </Router>
   
  )
}

export default App
