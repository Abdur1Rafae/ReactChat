import React from 'react'
import logo from '../../icons/favicon.ico'
import './welcome.css'

function Welcome() {
  return (
    <div class='welcome-container'>
        <img src={logo}></img>
        <caption>Bringing people together</caption>
    </div>
  )
}

export default Welcome