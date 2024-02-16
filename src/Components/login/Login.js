import React, { useState } from 'react'
import './LoginStyles.css'
import {useForm} from 'react-hook-form'
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { UserLogin } from '../../API/Auth'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

const Login = (props) => {
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const loginHandler= async(data) => {
        setLoading(true)
        try{
            const response = await UserLogin(data)
            console.log(response)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userId', response.data._id)
            localStorage.setItem('userEmail', response.data.email)
            setLoading(false)
            setError(false)
            navigate('/app/welcome')
        } catch(error) {
            if(error.response.status == 401){
                setError("Invalid Credentials")
                console.log(error)
            }
            else{
                setError("Fill all fields")
            }
            setLoading(false);
        }
    }
  return (
    <div class="login-container">
        {
            error && <Alert severity="error">{error}</Alert>
        }
        <Backdrop
            sx={{ color: 'aquamarine', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        <h1>Login in to your account</h1>
        <div class="form-container">
            <form onSubmit={handleSubmit((data)=>{
                loginHandler(data)
            })}>
                <div class="username-container">
                    <TextField {...register("email")} id="standard-basic" label="Email" variant="standard" size="small" />
                </div>
                <div class="pass-container">
                    <TextField {...register("password")} id="standard-basic" label="Password" variant="standard" size="small" />
                </div>
                <div class="submit-container">
                    <input class="submit-button" type="Submit" value="Login"></input>
                </div>
            </form>
        </div>
        <div class="register-opt">
            <h4>New to Chat? </h4>
            <button class="reg-but" onClick={()=>props.onFormSwitch('Register')} >Register</button>
        </div>
    </div>
  )
}

export default Login