require("dotenv").config();
const express = require("express");
const cors = require("cors")
const product = require("./routs/productRouts");
const body_parser = require("body-parser");

const globalErrorHandler = require("./controller/errorController");
const app = express();
app.use(cors({
    origin:"*",
    methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"], //Allow OPTIONS for preflight // preflight mean making the call before actual call to the server. and it return 
    //some http headers like Methods, Headers than make it actual call 
    allowedHeaders: ["Content-Type", "Authorization"],  //ALLOW ONLY NECESSARY HEADERS
    // cred entials:true,

}))

app.options("*",(req,res)=>{// handling Preflight Request
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS ");
    res.header("Access-Control-Allow-Headers","Content-Type, Authorization")
    res.sendStatus(204);
})
// console.log(app.get("env"))
// console.log(process.env.NODE_ENV);

const connectionDB = require("./model/db");

//middleware

app.use(body_parser.json({limit:'2mb'}));
app.use("/uploads", express.static("uploads"));// middleware that give access to the client to get server data; // uploads is static file
//Routes module middleware
app.use("/", product)


app.use(globalErrorHandler)




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








