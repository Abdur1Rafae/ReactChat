const Chat = require('../models/chatModel')
const User = require('../models/userModel')

const fetchChats = async(req, res) => {  
    const user = req.user

    try{
        await Chat.find({users: {$elemMatch: {$eq: user._id}}})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({updatedAt: -1})
        .then(async (results)=>{
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "name email"
            })
            res.status(200).send(results)
        })
    } catch(error) {
        res.status(400).send(error.message)
    }
    
}

const accessChat = async(req, res) => {
    const user = req.user
    const chat_id = req.body

    if(!chat_id){
        res.status(400).send("No friend ID found")
    }
    else{
        var isChat = await Chat.find({
            $and:[
                {_id: chat_id},
                {users: {$elemMatch: {$eq: user._id}}}
            ]
        })
        .populate("users", "-password")
        .populate("latestMessage")
    }

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name email"
    })

    if(isChat.length>0){
        res.send(isChat[0])
    }
    else{
        res.send("No chat available")
    }
}

const createGroupChat = async(req, res) => {
    const user = req.user

    const {friendEmails} = req.body.friendEmails
    var friend_ids

    for (email in friendEmails) {
        const f_id = await User.findOne({email: email})
        if(f_id){
            friend_ids.push(f_id)
        }
        else{
            res.status(404).send(`No user with email ${email} exists`)
        }
        
    }
}

const groupExit = async(req, res) => {
    const user = req.user

    const group_id = req.body

    const validGroupExist = await Chat.find({$and:[
        {_id: group_id},
        {users: {$elemMatch : {$eq: user._id}}}
    ]})

    if(validGroupExist){
        if(validGroupExist.groupAdmin == user._id){
            validGroupExist.groupAdmin = validGroupExist.users[1]
        }

        validGroupExist.users = validGroupExist.users.filter(user_id => user_id != user._id)
        await validGroupExist.save()
    }
    else{
        res.send(404).send("Invalid group exit request")
    }
}

module.exports = {
    fetchChats,
    accessChat,
    createGroupChat,
    groupExit
}