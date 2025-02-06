const mongoose = require('mongoose');



const OrderedSchema = new mongoose.Schema({
    tableNumber: {
        type: String,
        required: true
    },
    orderList:{
        type: Array,
        required: true
    }

})

// create a model
const Ordered = mongoose.model("Ordered", OrderedSchema);
module.exports = Ordered;

