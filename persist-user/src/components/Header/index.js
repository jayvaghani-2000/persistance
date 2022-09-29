import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../store/authSlice'
const Header = () => {
    const { authenticated } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const handleLogOut = (e) => {
        e.preventDefault()
        localStorage.removeItem("userDetails")
        dispatch(logOut())
    }
    return (
        <div style={{ display: 'flex', columnGap: '20px' }}>
            <NavLink to="/" end style={({ isActive }) => ({ color: (isActive ? 'red' : 'pink') })} >{({ isActive }) => isActive ? "Active Home" : "Home"}</NavLink>
            <NavLink to="/about?name=jay" style={({ isActive }) => ({ color: (isActive ? 'red' : 'pink') })}>{({ isActive }) => isActive ? "Active About" : "About"}</NavLink>
            <NavLink to="/post" style={({ isActive }) => ({ color: (isActive ? 'red' : 'pink') })}>{({ isActive }) => isActive ? "Active Post" : "Post"}</NavLink>
            {!authenticated && <NavLink to="/signup" style={({ isActive }) => ({ color: (isActive ? 'red' : 'pink') })}>{({ isActive }) => isActive ? "Active SignUp" : "SignUp"}</NavLink>}
            {!authenticated && <NavLink to="/login" style={({ isActive }) => ({ color: (isActive ? 'red' : 'pink') })}>{({ isActive }) => isActive ? "Active LogIn" : "LogIn"}</NavLink>}

            {authenticated && <button onClick={handleLogOut}>Log Out</button>}
        </div>
    )
}

export default Header