var jwt = require('jsonwebtoken');
require('dotenv').config();
const usermodel = require('../Model/UserModel')

let secretKey = process.env.secret;

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    // console.log(token);
    if (!token) {
        res.status(401).json({
            message: "auth failed",
        })
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded) {
            let data = await usermodel.find({ _id: decoded._id });
            if (data) {
                req._id = data._id;
                next();
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: "Internal Invalid token" });
    }


}

module.exports = {
    verifyToken,
}