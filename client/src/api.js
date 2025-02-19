import axios from "axios"

const uri = import.meta.env.VITE_URI;
const admin = import.meta.env.VITE_ADMIN;



// fetching all the data form the database
const getItems = async (endpoint) => {
    try {
        const responsData = await axios.get(`${uri}/${endpoint}`);
        return responsData.data;
    } catch (error) {
        console.log(error)
    }

}
// inserting the data into the database
const putItems = async (endpoint, formData) => {
    console.log(formData)
    try {

        // const response = await axios.post(`${uri}/${endpoint}`, formData);
        const response = await axios.post(`http://localhost:5100/api/insert`, formData);
        alert(response.data.message)
        console.log("Data adde successfully")
    } catch (error) {
        console.log(error)
    }
}

const findItems = async (endpoint, id) => {
    try {
        const response = await axios.get(`${uri}/${endpoint}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }

}
const updateItems = async (endpoint, id, updateData) => {
    try {
        const response = await axios.put(`${uri}/${endpoint}/${id}`, updateData);
        return response.data;
    } catch (error) {
        console.log(error)
    }

}
const deleteItems = async (endpoint, id) => {
    try {
        const deleteData = await axios.delete(`${uri}/${endpoint}/${id}`);

        return deleteData.data;
    } catch (error) {
        console.log(error)

    }
}



// API FUNCTION FOR CUSTOMER

const customerOrderList = async (endpoint, orderList) => {

    try {
        const response = await axios.post(`${uri}/${endpoint}`, orderList);
        // console.log(response.data)
        return  response.data;
    } catch (error) {
        console.log(error)
    }
}
// API FUNCTION TO HANDLE THE ORDERLIST- GET ALL ORDER LIST/ VIEW IN ADMIN/ORDER
const getAllOrderList =async (endpoint)=>{
    try {
        const response = await axios.get(`${uri}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
const updateStatus  = async (endpoint,id,updateState)=>{
    try {
        const response = await axios.post(`${uri}/${endpoint}/${id}`, updateState)
        return response.data
        
    } catch (error) {
        console.log(error)
        
    }
}



// LOGIN FUNCTION
const register = async (ednpoint, data) => {
    try {
        const response = await axios.post(`${admin}/${ednpoint}`, data);
        sessionStorage.setItem("token",response.data.token)
        return response;

    } catch (error) {
        console.log(error.response.data.msg)

    }

}
const login = async (endpoint, data, token) => {
    try {
        const reponse = await axios.post(`${admin}/${endpoint}`, data, {
            headers: { Authorization: `Bearer ${token}` }

        });
        return reponse;
    } catch (error) {
        console.log(error)
    }
}


// google ouath  
const oauth = async (endpoint) => {
    try {
        const response = await axios.get(`${admin}/${endpoint}`, {
            // withCredentials: true,
            headers: {
                
                "Content-Type":"application/json",
                // "Access-Control-Allow-Headers": "authorization"
            }
        })
        return response

    } catch (error) {

    }

}


export {
    getItems,
    putItems,
    findItems,
    updateItems,
    deleteItems,

    customerOrderList,
    getAllOrderList,
    updateStatus,

    register,
    login,
    oauth
}


