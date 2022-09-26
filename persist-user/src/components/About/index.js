import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'

const About = () => {
    const [search, setSearch] = useSearchParams()
    const navigate = useNavigate()
    const loaction = useLocation()
    const param = useParams()
    const name = search.get('name')
    console.log('name', name)
    // useEffect(() => {
    //     setTimeout(() => {
    //         navigate("/",{replace:false})
    //     },3000)
    // },[])
    return (
        <>
            <div>About {name}</div>
            <Routes>
                <Route path="/team" element={<h1>Team</h1>}/>
                <Route path="/founder" element={<h1>Founder</h1>}/>
            </Routes>
        </>
    )
}

export default About