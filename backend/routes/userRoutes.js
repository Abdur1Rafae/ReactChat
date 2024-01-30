const express = require("express");
const {loginController, registerController, addFriend, removeFriend} = require("../controllers/userController")
const Router = express.Router();

const { protect } = require('../middleware/authMiddleware')
Router.post('/login', loginController)
Router.post('/register', registerController)
Router.post('/addFriend', protect, addFriend)
Router.delete('/removeFriend', protect, removeFriend)

module.exports = Router;