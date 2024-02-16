const express = require("express")
const User= require('../models/userModel')
const Chat = require('../models/chatModel')
const dotenv = require("dotenv");
const generateToken = require('../config/generateToken')

const loginController = async(req, res) => {
    const {email, password} = req.body
    const exisUser =await  User.findOne({email})
    if(!email || !password){
        res.status(400).send("Fields not filled")
    }
    else if(exisUser){
        res.status(200).json({
            _id: exisUser._id,
            name: exisUser.name,
            email: exisUser.email,
            token: generateToken(exisUser._id)
        })
    }
    else{
        res.status(401).send("Invalid credentials")
    }
    
};


const registerController = async (req, res) => {

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.send(400);
        throw Error("All necessary input fields have not been filled.")
    }

    const existUser = await User.findOne({email})
    if(existUser){
        res.status(401);
        throw new Error("User already exists")
    }

    let friends = []

    const newUser = await User.create({name, email, password, friends})

    if(newUser){
        res.status(201).json({
            _id: newUser._id,
            name: newUser.email,
            email: newUser.email,
            token: generateToken(newUser._id)
        })
    }
    else{
        res.status(404)
        throw new Error("Error creating the new user")
    }
};

const addFriend = async(req, res) => {
    let user = req.user

    let {friendEmail} = req.body
    
    const existUser = await User.findOne({email: friendEmail})
    if(existUser){
        let newUser = await User.updateOne({_id: user._id},{$push: {friends: existUser._id}})
        await User.updateOne({_id: existUser._id}, {$push: {friends: user._id}})

        if(newUser){
            const newChat = await Chat.create({
                isGroup: false,
                users: [user._id, existUser._id],
            })
            res.status(201).json({
                _id: user._id,
                friend_id: existUser._id
            })
        }
        else{
            res.status(400).send("Error while adding friend")
        }
    }
    else{
        res.status(404).send("No user exists with the email requested")
    }
}

const removeFriend = async(req, res) => {
    let user = req.user
    let friend_id = req.body.friend_id

    const newUser = await User.updateOne({_id: user._id},{
        $pull: {friends: friend_id}
    })

    if(newUser){
        res.status(200).send("Friend removed")
    }
    else{
        res.status(400).send("Invalid friend ID")
    }
}

module.exports = {
    loginController,
    registerController,
    addFriend,
    removeFriend
}




