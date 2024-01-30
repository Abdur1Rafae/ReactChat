import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { IconButton } from '@mui/material';
import './groupStyles.css'

function CreateGroup() {
  return (
    <div className='create-group-container'>
        <div class='input-container'>
            <input type='text' placeholder='Enter Group Name'></input>
        </div>
        <div class='icon-container'>
            <IconButton size="mediem">
                <NavigateNextIcon fontSize='medium'></NavigateNextIcon>
            </IconButton>
        </div>
    </div>
  )
}

export default CreateGroup