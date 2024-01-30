import React from 'react'
import './MsgStyles.css'

function RcvdMsg({message, timestamp}) {
  return (
    <div class="container rcvd">
        <div class="received-msg">
            {message}
            <div class="time">
                {timestamp}
            </div>
        </div>
    </div>
  )
}

export default RcvdMsg