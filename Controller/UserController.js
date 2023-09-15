const userModel = require('../Model/UserModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const UserCreate = async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        console.log(req.body);
        const findUsere = await userModel.findOne({ email: email });
        if (findUsere) {
            res.status(404).json({
                message: 'User Allready Register'
            })
        } else {
            // console.log("yyy");
            let hash = await bcrypt.hash(password, 10);
            const created = await userModel.create({ name: name, email: email, password: hash, age: age });
            if (created) {
                res.status(200).json({
                    message: 'User registered successfully',
                    UsercreateData: created
                })
            } else {
                res.status(404).json({
                    message: 'Something Went Wrong'
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(
            { message: 'Internal server error' })
    }
};



const Userlogin = async (req, res) => {

    try {
        const { email, password } = req.body;
        // console.log(req.body);
        const findUres = await userModel.findOne({ email: email });
        if (findUres) {
            let passwordCompare = await bcrypt.compare(password, findUres.password)

            if (passwordCompare) {
                var secretKey = process.env.secret;
                let user = { _id: findUres._id, name: findUres.name, email: findUres.email };
                var token = jwt.sign(user, secretKey);
                if (token) {
                    // console.log("bbbbb", token);
                    res.status(200).json({
                        message: "User Login Successfully....",
                        uresData: findUres,
                        token: token
                    })
                }

            } else {
                res.status(404).json({
                    message: "Email And Password Not Match...."
                })
            }
        } else {
            res.status(404).json({
                message: "Email And Password Not Match...."
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' })
    }
}

const getUserProfileId = async (req, res) => {

    try {
        // console.log("ininininin side");
        const user = await userModel.findById({ _id: req.params.id });
        if (user) {
            res.status(200).json({
                message: "User Profile Show Successfully....",
                userData: user
            })
        } else {
            res.status(404).json({
                message: "User Not exist"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' })
    }
}

const updateUserProfile = async (req, res) => {

    try {
        const _id = req.params.id;

        const updatepro = await userModel.findByIdAndUpdate(_id, req.body)
        if (updatepro) {
            res.status(200).json({
                message: "User updateProfile Successfully....",
                userData: updatepro
            })
        } else {
            res.status(404).json({
                message: "User Not exist...."
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    UserCreate,
    Userlogin,
    getUserProfileId,
    updateUserProfile
}