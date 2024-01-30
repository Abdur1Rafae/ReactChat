import React, { useEffect, useState } from 'react'
import './MyStyles.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import SendIcon from '@mui/icons-material/Send';
import SenderMsg from './messages/SenderMsg';
import RcvdMsg from './messages/RcvdMsg';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../Features/themeSlice';
import { FetchMessages, SendMessage } from '../API/Message';
import io from "socket.io-client"

const ENDPOINT = "http://localhost:8080"

var socket, chat
function WorkArea() {
  var Name = "User1";
  const userEmail = localStorage.getItem('userEmail')
  const userID = localStorage.getItem('userID')
  var Status = "Online";
  const chatID = useParams();
  var lightMode = useSelector((state)=> state.themeKey.value)
  const [messages, setMessages] = useState([])
  const [messagesCopy, setMessagesCopy] = useState(messages)
  const [newMessage, setNewMessage] = useState('')
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false)

  useEffect(()=>{
    socket = io(ENDPOINT)
    socket.emit("setup", userID)
    socket.on("connection", ()=> {
      setSocketConnectionStatus(!socketConnectionStatus)
    })
  })

  const SendMessageHanlder = async() => {
    try{
      const response = await SendMessage(chatID.chatID, newMessage)
      setNewMessage('')
      socket.emit("new message", newMessage)
    }
    catch(error) {

    }
    
  }

  useEffect(()=>{
    socket.on("message received", (newMessage) => {
      if(!messagesCopy || messagesCopy._id !== newMessage._id) {

      } else{
        setMessages([...messages], newMessage)
      }
    })
  })

  useEffect(()=> {
    const messages = async()=> {
      try{
        const response = await FetchMessages(chatID.chatID)
        setMessages(response)
        socket.emit("join chat", chatID.chatID)
        setMessagesCopy(messages)
      } catch(error) {

      }
    }
    messages()
  }, [])
  return (
    <div class="WorkArea-container">

      <div class={"msg-header" + (lightMode ? "" : " dark")}>
        <div class="header-left">
          <div class="chat-image">
            <IconButton size="large">
              <AccountCircleIcon fontSize='large' className={(lightMode ? "" : " dark")}/>
            </IconButton>
          </div>
          <div class="chat-info">
            <div class="chat-name">
              <h3>{Name}</h3>
            </div>
            <div class="chat-status">
              <p>{Status}</p>
            </div>
          </div>
        </div>

        <IconButton>
          <TuneIcon className={(lightMode ? "" : " dark")}></TuneIcon>
        </IconButton>
      </div>

      <div class={"msg-container" + (lightMode ? "" : " darkmsg")}>
        {
          messages.map((message)=>{
            if (message.sender.email == userEmail){
              return <SenderMsg class={(lightMode ? "" : " darkmsg")} message={message.message} timestamp='23:04'></SenderMsg>
            }
            else{
              return <RcvdMsg class={(lightMode ? "" : " darkmsg")} message={message.message} timestamp='23:04'></RcvdMsg>
            }
          })
        }
      </div>
      <div class={"msg-input"}>
        <input type='text' onChange={(e)=> setNewMessage(e.target.value)} placeholder='    Type a message' className={(lightMode ? "" : "dark") }></input>
        <div className={"msg-send-icon"+ (lightMode ? "" : " dark")}>
          <IconButton onClick={SendMessageHanlder}>
            <SendIcon className={"icon"+ (lightMode ? "" : " dark")}/>
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default WorkArea