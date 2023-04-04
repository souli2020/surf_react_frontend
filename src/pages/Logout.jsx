import React, { useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/LogContext'
function Logout() {
    const { isLogged, setLogged } = useContext(AuthContext);
    const navigateTo = useNavigate()
    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch('http://localhost:3000/logout')
            const data = await res.json()
            if (data.status === 200) {
                localStorage.removeItem('token')
                setLogged(false)
                navigateTo('/')
            }
        }
        fetchPosts()
    }, [])
    return (
        <div>Logout</div>
    )
}

export default Logout