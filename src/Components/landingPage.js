import React, {useState} from 'react'
import Login from './login/Login'
import Register from './register'

const LandingPage = () => {
    const [displayFOrm, setDisplayFOrm] = useState("Login")

    const toggleForm = (formName) => {
        setDisplayFOrm(formName)
    }
  return (
    <div>
        {
            displayFOrm === "Login" ? <Login onFormSwitch = {toggleForm}/> : <Register onFormSwitch = {toggleForm}/>
        }
    </div>
  )
}

export default LandingPage