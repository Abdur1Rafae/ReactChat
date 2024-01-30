const mongoose = require('mongoose');

const messageModel = mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },
    message:{
        type: String
    }
},{
    timeStamp: true
})

const Message = mongoose.model("Message", messageModel);

module.exports = Message;