const express = require("express")
const Router = express.Router()
const {getAllMessages, sendMessage} = require('../controllers/messageController')

const {protect} = require('../middleware/authMiddleware')

Router.get('/getMessages/:chatID', protect, getAllMessages)
Router.post('/sendMessage/:chatID', protect, sendMessage)

module.exports = Router