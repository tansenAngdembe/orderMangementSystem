const Product = require("../model/Product_schema");

const showItems = async (req, res) => {
    try {
        const items = await Product.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(400).json({ error: err.massage });

    }
}
const findItems = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ err: "Product not found." });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ err: error.message })  
    }
}


const insertItems = async (req, res) => {
    try {
       
        const { name, price, description,image, category } = await req.body;
        const newProduct = new Product({ name: name, price: price, description: description, image:image, category:category}); //, image: imagePath 
        await newProduct.save();
        res.status(200).send("Data inserted");

    } catch (error) {
        res.status(400).json({ error: "Some things went gone wrong" })
    }
}

const updateItems = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ err: "Product not found." })
        const { name, price, description, image } = await req.body;
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        await product.save();
        res.status(200).json({ msg: "Scuccessfully product upated;" })

    } catch (error) {
        res.status(400).json({ err: error.message })

    }
}
const deleteItems = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ err: "Product not found." });
        res.status(200).json({ msg: "Item deleted successfully!" })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}




module.exports = {
    showItems,
    findItems,
    insertItems,
    updateItems,
    deleteItems
}

