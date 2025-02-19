const Ordered = require("../model/Ordered");



const orders = async (req, res) => {   
    try{
        const {_id,tableNumber,price,state,orderList} = await req.body;
        const order = new Ordered({_id, tableNumber,state, price, orderList})
        order.save()
        
        res.status(201).json({msg:"Order created successfully", order});

    }catch(error){
        res.status(500).json({msg:"error", error: error.message})

    }
}
const orderList = async (req,res)=>{
    try{
         const getallorder = await Ordered.find();
         res.status(201).json({msg:"Successfull", getallorder})
    }catch(error){
         res.status(500).json({error:error.message})
    }
}

const updateSatus = async(req,res)=>{
    try {
        const findWithId = await Ordered.findById(req.params.id);
        const {order_state} = req.body;
        findWithId.state = order_state || findWithId.state
        await findWithId.save()
        res.status(200).json({msg:"Status successfully update", findWithId})
        
        
    } catch (error) {
        res.status(500).json({error:error.message})        
    }

}

module.exports = {orders, orderList,updateSatus};