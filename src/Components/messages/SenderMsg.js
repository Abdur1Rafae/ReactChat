import React from 'react'
import './MsgStyles.css'

function SenderMsg({message, timestamp}) {
  return (
    <div class="container sent">
        <div class="sent-msg">
            {message}
            <div class="time">
                {timestamp}
            </div>
        </div>
    </div>
  )
}

export default SenderMsg