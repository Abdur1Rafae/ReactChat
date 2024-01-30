import React, {useState} from 'react'
import './RegisterStyles.css'
import { useForm } from 'react-hook-form'
import { TextField } from '@mui/material'
import {useNavigate} from 'react-router-dom'
import { UserRegister } from '../../API/Auth'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

const Register = (props) => {
    const { register, handleSubmit, errors } = useForm()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const registerHandler= async(data) => {
        setLoading(true)
        try{
            const response = await UserRegister(data)
            localStorage.setItem("userData", JSON.stringify(response))
            setLoading(false)
            setError(false)
            navigate('/app/welcome')
        } catch(error) {
            if(error.response.status == 401){
                setError("Invalid Credentials")
            }
            else{
                setError("Fill all fields")
            }
            setLoading(false);
        }
    }

    return (
        <div className="register-container">
            {
                error && <Alert severity="error">{error}</Alert>
            }
            <Backdrop
                sx={{ color: 'aquamarine', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <h1>Create your account</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit(registerHandler)}>
                    <div className="username-container">
                        <TextField
                            {...register("name", { required: true })}
                            id="standard-basic"
                            label="Name"
                            variant="standard"
                            size="small"
                        />
                        {errors && <p>Name is required.</p>}
                    </div>
                    <div className="email-container">
                        <TextField
                            {...register("email", { required: true })}
                            id="standard-basic"
                            label="Email"
                            variant="standard"
                            size="small"
                        />
                        {errors && <p>Email is required.</p>}
                    </div>
                    <div className="pass-contain">
                        <TextField
                            {...register("password", { required: true })}
                            id="standard-basic"
                            label="Password"
                            variant="standard"
                            size="small"
                            type="password"
                        />
                        {errors && <p>Password is required.</p>}
                    </div>
                    <div className="cpass-container">
                        <TextField
                            {...register("cpassword", { required: true })}
                            id="standard-basic"
                            label="Confirm Password"
                            variant="standard"
                            size="small"
                            type="password"
                        />
                        {errors && <p>Confirm Password is required.</p>}
                    </div>
                    <div className="submit-container">
                        <input className="submit-button" type="submit" value="Register" />
                    </div>
                </form>
            </div>
            <div className='signin-opt'>
                <h4>Existing User?</h4>
                <button className='sign-but' onClick={()=>props.onFormSwitch('Login')}>Sign In</button>
            </div>
        </div>
    )
}

export default Register;
