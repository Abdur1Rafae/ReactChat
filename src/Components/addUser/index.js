import React, { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { IconButton } from '@mui/material';
import { AddFriend } from '../../API/User';


import './styles.css'

function AddUser() {
  const [email, setEmail] = useState('')

  const AddFriendHandler = async() => {
    try{
      const response = await AddFriend(email)
      console.log(response)
    } catch (error) {
      
    }
  }

  return (
    <div className='add-user-container'>
        <div class='input-container'>
            <input type='text' placeholder='Enter User Email' onChange={(e)=>setEmail(e.target.value)}></input>
        </div>
        <div class='icon-container'>
            <IconButton size="medium" onClick={AddFriendHandler}>
                <NavigateNextIcon fontSize='medium'></NavigateNextIcon>
            </IconButton>
        </div>
    </div>
  )
}

export default AddUser