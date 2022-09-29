import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logInThunk } from '../../store/authSlice'

const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = (e) => {
        e.preventDefault()
        dispatch(logInThunk(email, password))
    }
    
    return (
        <div>
            <h1>Login In</h1>
            <form onSubmit={handleSignIn}>
                <div>Email{": "}<input type={"text"} value={email} onChange={e => setEmail(e.target.value)} /></div>
                <div>PassWord{": "}<input type={"password"} value={password} onChange={e => setPassword(e.target.value)} /></div>
                <button type='submit'>Login In</button>
            </form>
        </div>
    )
}

export default Login