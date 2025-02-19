import {React} from "react"
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";


export const Customerboard = ()=>{

   return (
    <div className="flex h-screen">
        <Navbar/>
        <main className="flex-1 overflow-auto bg-gray-50 p-8">
            <Outlet/>
        </main>

    </div>
   )

}

