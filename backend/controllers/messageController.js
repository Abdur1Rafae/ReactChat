const express = require('express')
const Message = require('../models/messageModel')
const User = require('../models/userModel')
const Chat = require('../models/chatModel')

const getAllMessages = async(req, res) => {
    try{
        const messages = await Message.find({ receiver: req.params.chatID})
        .populate("sender", "name email")
        .populate("receiver")

        res.json(messages)
    } catch(error) {
        res.status(400).send(error.message)
    }
}

const sendMessage = async(req, res) => {
    const chatID = req.params.chatID
    const {content} = req.body

    if(!content || !chatID){
        return res.status(400).send("Incomplete data error")
    }

    var newMessage = {
        sender: req.user._id,
        message: content,
        receiver: chatID
    }

    try{
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name");
        message = await message.populate("receiver");
        message = await User.populate(message, {
            path: "receiver.users",
            select: "name email"
        })

        await Chat.findByIdAndUpdate(req.body.chatID, {latestMessage: message._id})
        res.json(message)
    } catch(error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    getAllMessages,
    sendMessage
}