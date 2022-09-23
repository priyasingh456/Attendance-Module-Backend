const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const registerUser = asyncHandler(async ( req, res ) => {
    const {name, email, password, conPassword} = req.body;
    console.log(name, email);
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User Already Exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        conPassword
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error("Error occured!");
    }
});


const loginUser = asyncHandler(async ( req, res ) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error("Invalid email or password!");
    }
});

const resetPassword = asyncHandler( async (req, res) => {
    const {email, password} = req.body;
    const conPassword = password;

    const user = await User.findOne({email});

    if(user){
        const salt = await bcrypt.genSalt(10);
        let passwordEncrypt = await bcrypt.hash(password, salt);
        let conPasswordEncrypt = await bcrypt.hash(conPassword, salt);

        user.password = passwordEncrypt;
        user.conPassword = conPasswordEncrypt;
        const userInDb = await User.findOne({email});
        await User.replaceOne(userInDb, user);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(404);
        throw new Error("Given email is not found")
    }
})

const checkEmail = asyncHandler(async (req, res) => {
    const {email} = req.body;

    const user = await User.findOne({email});

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(404);
        throw new Error("Given email is not found");
    }
})

module.exports = {
    registerUser,
    loginUser,
    resetPassword,
    checkEmail
};