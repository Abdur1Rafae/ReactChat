const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const cors = require("cors")


dotenv.config();
const app = express();

app.use(express.json())
app.use(cors("*"))
const connectdb = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Database")
    } catch(err) {
        console.log("Server could not connect to Database", err.message)
    }
}
connectdb()
const server = app.listen(5000, console.log("Server running on port 5000"));

app.use('/user',userRoutes)
app.use('/msgs',messageRoutes)
app.use('/chats', chatRoutes)

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
    pingTimeout: 60000,
})

io.on("connection", (socket)=>{
    socket.on("setup", (user)=> {
        socket.join(user.data._id)
        socket.emit("connected")
    })

    socket.on("join chat", (room) => {
        socket.join(room)
    })

    socket.on("new message", (newMessageStatus)=>{
        var chat = newMessageStatus.receiver;
        if (!chat.users) {
            return console.log("chat.users not defined")
        }
        chat.users.forEach((user) => {
            if(user._id == newMessageStatus.sender._id) return

            socket.in(user._id).emit("message received", newMessageReceived)
        })
    })
})

