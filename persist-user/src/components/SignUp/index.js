import React, { useState } from 'react'

const SignUp = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = (e) => {
        
    }
    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <div>Email{": "}<input type={"text"} value={email} onChange={e => setEmail(e.target.value)} /></div>
                <div>PassWord{": "}<input type={"password"} value={password} onChange={e => setPassword(e.target.value)} /></div>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp