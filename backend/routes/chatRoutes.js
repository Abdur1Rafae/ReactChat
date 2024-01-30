const express = require("express")
const Router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {fetchChats,accessChat,createGroupChat,groupExit} = require('../controllers/chatController')

Router.get('/', protect, fetchChats)
Router.get('/chat', protect, accessChat)
Router.post('/createGroup', protect, createGroupChat)
Router.put('/groupExit', protect, groupExit)

module.exports = Router