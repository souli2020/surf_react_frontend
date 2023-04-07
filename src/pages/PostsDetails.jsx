import { React, useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AuthContext } from '../context/LogContext'

import fetchData from '../utils/fetchData'

function PostDetails() {

    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState({})
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
    }, [])

    return (

        !loading ? (<section className="post-details" >
            <h2>Title: {post.title}</h2>
            <div className="post-price">Price: {post.price}</div>
            <p className="post-description">Description: {post.description}</p>
            <div>
                <h3>Created by: {post.author.username}</h3>
                <strong className="post-location">Location: {post.location}</strong>
            </div>
            <Link to=".." relative="path">go back?</Link >
        </section>) : (<h2>Loading ...</h2>))
}




export default PostDetails