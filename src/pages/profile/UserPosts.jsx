import { React, useEffect, useState, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/LogContext'
import VideoPlayer from '../../components/VideoPlayer'
import axios from 'axios'

import fetchData from '../../utils/fetchData'

function UserPosts() {
    const { token, isLogged, setLogged, setRefresh } = useContext(AuthContext)
    const { id } = useParams()
    const navigateTo = useNavigate()
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState({})


    const deletePost = async () => {
        const res = await axios.delete(`http://localhost:3000/posts/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            },)
        const data = res.data
        if (data.status === 200) {
            setRefresh(true)
            navigateTo('..')
        }
    }



    useEffect(() => {
        fetchData(`http://localhost:3000/posts/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setPost(prev => data.post)
                setLoading(false)

            })
            .catch(error => {
                console.log(error.message)
            });

        fetchData()
    }, [id])

    return (
        <>

            {!loading ? (
                <section className="post-details" >
                    <h2>Title: {post.title}</h2>
                    <div className="post-price">Price: {post.price}</div>
                    <p className="post-description">Description: {post.description}</p>
                    {post.videos && post.videos.length > 0 &&
                        <VideoPlayer src={post.videos[0]?.path} width={300} height={400} />}
                    <div>
                        <h3>Created by: {post.author.username}</h3>
                        <strong className="post-location">Location: {post.location}</strong>
                    </div>
                    <div>
                        <button >
                            update Post
                        </button>
                        <button onClick={deletePost}>
                            Delete Post
                        </button>
                    </div>
                    <Link to="/profile" >go back?</Link >

                </section>)
                : (<h2>Loading ...</h2>)}
        </>
    )
}

export default UserPosts