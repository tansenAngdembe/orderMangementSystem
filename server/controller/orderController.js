const { set } = require("mongoose");
const Ordered = require("../model/Ordered");



const orders = async (req, res) => {   
    try{
        const response = await req.body;
        // console.log(req.body)
        
        const setOrder = new Set(response.map((i)=>i.tableNumber));
        const table = setOrder.values().next().value;
        // const order = response.map((i)=>({itemId:i.itemId, quantity:i.quantity})); 
        const order = response.reduce((acc,items)=>{
            const {itemId,qunatity,tableNumber} = items;
            

        },{})
       
      
       
        // const newOrder = new Ordered(order);
        // const saveOrder = await newOrder.save();
        res.status(201).json({msg:"Order created successfully", saveOrder});

    }catch(error){
        res.status(500).json({msg:"error", error: error.message})

    }


}
module.exports = {orders};

