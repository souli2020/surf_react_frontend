import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link, useNavigate, Outlet, useOutletContext } from 'react-router-dom'
import { AuthContext } from '../context/LogContext'
import axios from 'axios'
import defaultImage from '../assets/images/default-profile.jpg';
import ResetPassword from './profile/ResetPassword';
import ProfileNavbar from '../components/ProfileNavbar';


function Profile() {


    const { resetToken } = useParams()
    const navigateTo = useNavigate()
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState()
    const { setLogged, token, isLogged } = useContext(AuthContext)
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:3000/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            const data = await res.json()
            if (data.status === 200) {
                setLogged(true)
                setUser(data.user)
                console.log(data.user)
                setPosts(data.posts)
            }
            else if (data.status === 401) {
                setLogged(false)
                setTimeout(() => {
                    navigateTo('/login')
                }, 1000);

            }
        }

        fetchData()
    }, [])
    let userPosts
    userPosts = posts.length ? userPosts = <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr 1fr" }}>{posts.map(post => {
        return <div style={{ border: "1px solid black", borderRadius: '0.5rem', padding: "12px 27px" }} key={post._id} >
            <h3>   {post.title} </h3>
            <Link to={`/posts/${post._id}`} relative='route'>View details</Link>

        </div>
    })}  </div> :
        <h2>No post yet please
            <Link to="/posts/new">create one!</Link>
        </h2>

    return (
        <>

            {
                isLogged ? <div>
                    {
                        user ? (
                            <>
                                <h2>
                                    <img src={user.image.secure_url === "/images/default-profile.jpg" ?
                                        defaultImage : user.image.secure_url}
                                        alt={`${user.username}'s Profile image`}
                                        className="profile-image"
                                        width={100}
                                    />
                                    {user.username}</h2>
                            </>) :
                            (<h2>loading profile</h2>)
                    }
                    < div >
                        <h3>Recent posts:</h3>
                        {userPosts}
                    </div >
                </div >
                    : <h2>Please login to continue</h2>
            }
            <ProfileNavbar />
            <Outlet context={user} />


        </>


    )
}




export default Profile