import React from 'react';
import './chat.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SBSingleChat({chatID, dpURL, Name, RecentMessage, TimeStamp, isOnline}) {
  const navigate = useNavigate();
  return (
    <div class="SingleChat" onClick={()=> navigate(`chat/${chatID}`)}>
      {/* {
        dpURL === "" ? 
        <img src={AccountCircleIcon} alt="Default Profile"></img> :
        <img src={dpURL} alt="Profile"></img>
      } */}
      <div class="chat-image">
        <IconButton size="large">
          <AccountCircleIcon fontSize='large'/>
        </IconButton>
      </div>
      {
        isOnline ? 
        <div class="online-show"></div> 
        :
        <div class="offline-show"></div>
      }
      
      <div class="chat-info">
        <div class="chat-name">
          <h5>{Name}</h5>
        </div>
        <div class="chat-msg">
          <p>{RecentMessage}</p>
          <span>{TimeStamp}</span>
        </div>
      </div>
    </div>
  )
}

export default SBSingleChat