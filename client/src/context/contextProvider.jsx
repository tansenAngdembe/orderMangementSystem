import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reducer } from "../reducer/reducer";
import { getAllOrderList } from "../api";

const ContextProvider = createContext()

let inital_state = {
    order_state: "pending",
    order_data: [],
    total_order: 0,
    pending_order: 0,
    time: "",
    order_same_id: []
}
const AppProvider = ({ children }) => {
    const navigation = useNavigate()
    const [state, dispatch] = useReducer(reducer, inital_state)
    // const [user, setUser] = useState(false)
    const user = false

    useEffect(() => {
        getAllOrderList("orderlist").then((result) => (
            //   console.log(result)
            dispatch({ type: "GET-ORDER", payload: result })
        )
        );

    }, [])

    return (
        <ContextProvider.Provider value={{
            state, dispatch, navigation, user

        }}>{children}</ContextProvider.Provider>
    )

}
const Provider = () => {
    return useContext(ContextProvider)
}

export { AppProvider, Provider };




