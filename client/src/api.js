import axios from "axios"
const uri = import.meta.env.VITE_URI;


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
const updateItems = async (endpoint, id, updateData)=>{
    try {
        const response = await axios.put(`${uri}/${endpoint}/${id}`,updateData);
        return response.data;
    } catch (error) {
        console.log(error)
    }

}
const deleteItems = async (endpoint,id)=>{
   try {
        const deleteData = await axios.delete(`${uri}/${endpoint}/${id}`);
    
        return deleteData.data;
   } catch (error) {
         console.log(error) 
    
   }
}



export {
    getItems,
    putItems,
    findItems,
    updateItems,
    deleteItems
}


