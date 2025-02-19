const mongoose = require('mongoose');



const OrderedSchema = new mongoose.Schema({
    _id:String,
    tableNumber: {
        type: String,
        required: true
    
    },
    price:{
        type:Number,
        required:true
    },
    state:{
        type:String,
        // enum:["pending","completed"]

    },
    orderList:{
        type: Array,
        required: true
    },
    time:{
        type:Date,
        default:Date.now
    }
   

})
// this is document middleware to delete the data automatically if the state is completed
OrderedSchema.post("findOneAndUpdate",async function(doc,next){
    if(doc && doc.state === "completed"){
        setTimeout(async ()=>{
            await doc.deleteOne();
            next()
        },0)
    }
    
})
const Ordered = mongoose.model("Ordered", OrderedSchema);
// create a model
module.exports = Ordered;

