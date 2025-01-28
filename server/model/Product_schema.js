const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name: { type: String, require },
    price: { type: Number, require },
    description: { type: String },
    category: { type: String, required:true },
    image: { type: [String], required:false },

})
const Produt= mongoose.model("Product", productSchema);
module.exports  = Produt;