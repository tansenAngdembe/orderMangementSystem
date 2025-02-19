const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin")


exports.verifyToken = async (req, res, next) => {
    try {
        // Bearer token
        const authToken = req.headers["authorization"];
        console.log(authToken)

        // console.log(authToken); return Bearer token
        const token = authToken && authToken.split(" ")[1];
        console.log(token)
        if (!token) return res.status(401).json({ msg: "Not authorized" })
        //   jwt.verify(token, process.env.JWT_SECRECT_KEY, (err, user) => {
        //     if (err) return res.status(403);
        //     req.user = user;
        //     console.log(req.user)
        //     next()

        //     // })
        const decode = jwt.verify(token, process.env.JWT_SECRECT_KEY);
        const user = await Admin.findById(decode.userid)
        // const userPass = await Admin.findById(decode.userid).select("password")
        req.user = user;
        //    console.log(userPass)
        // res.status(200).json({user:decode})

        next()

    } catch (error) {
        res.status(500).json({ err: error });
    }
}



