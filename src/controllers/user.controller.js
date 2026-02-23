const mongoose = require('mongoose');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function registerUser(req, res) {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const user = await userModel.create({
            email,
            password: hashedPassword
        })
       const token = jwt.sign({
            id: user._id,
                
        },process.env.JWT_SECRET)
        res.cookie('token',token)
        res.status(201).json({
            message: 'User registered successfully',
           email,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error registering user', error });
    }
}
async function loginUser(req, res) {
    const {email,password}=req.body;

    try {
        const user = await userModel.findOne({
            email
        })
        if(!user){
            return res.status(400).json({message:'user not found'})
        }
        const isvaildPassword = await bcrypt.compare(password,user.password);
        if(!isvaildPassword){
            return res.status(400).json({
                message:"user not found"
            })
        }
        const token = jwt.sign({
            id: user._id
        },process.env.JWT_SECRET)
       res.cookie('token',token)
        res.status(200).json({
            message:"login successful",
            email,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error logging in user', error });
    }}
module.exports = {
    registerUser,
    loginUser
}