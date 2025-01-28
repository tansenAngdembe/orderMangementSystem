require("dotenv").config();
const express = require("express");
const cors = require("cors")
const product = require("./routs/productRouts");
const body_parser = require("body-parser");

const app = express();

// console.log(app.get("env"))
// console.log(process.env);

const connectionDB = require("./model/db");

//middleware

app.use(cors())
app.use(body_parser.json({limit:'2mb'}));
app.use("/uploads", express.static("uploads"));// middleware that give access to the client to get server data; // uploads is static file
//Routes module middleware
app.use("/", product)




const PORT = process.env.PORT || 5100;

const start = () => {
    try {
        app.listen(PORT, async () => {
            connectionDB();
            console.log(`Sever running on port ${PORT}!`);
            // console.log(process.env)
        });
    } catch (err) {
        console.log(err);
    }
}

start();








