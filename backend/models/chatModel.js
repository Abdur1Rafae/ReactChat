const mongoose = require('mongoose');

const chatModel = mongoose.Schema({
    chatName:{
        type: String,
    },
    isGroup:{
        type: Boolean,
    },
    users:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    latestMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    groupAdmin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    messages:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }
},{
    timeStamp: true
});

const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;