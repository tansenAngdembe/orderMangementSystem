// import { createContext,useContext } from "react"
import { Provider } from "./contextProvider"
import Auth from "../components/admin/auth/Authpanel"

// const ProtectedContext = createContext()
const ProtectedRoute = ({ children }) => {
    const { user, navigation } = Provider()
    return user ? children : navigation("/admin/auth")

}

// const ProtectedProvider = ()=>{
//     return useContext(ProtectedContext)
// }
export { ProtectedRoute }