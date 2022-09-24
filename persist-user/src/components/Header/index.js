import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <div style={{ display: 'flex', columnGap: '20px' }}>
            <NavLink to="/" end style={({ isActive }) => ({ color: (isActive ? 'red' : 'pink') })} >{({ isActive }) => isActive ? "Active Home" : "Home"}</NavLink>
            <NavLink to="/about?name=jay" style={({ isActive }) => ({ color: (isActive ? 'red' : 'pink') })}>{({ isActive }) => isActive ? "Active About" : "About"}</NavLink>
            <NavLink to="/post" style={({ isActive }) => ({ color: (isActive ? 'red' : 'pink') })}>{({ isActive }) => isActive ? "Active Post" : "Post"}</NavLink>
        </div>
    )
}

export default Header