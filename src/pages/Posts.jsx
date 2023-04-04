import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);
    const navigateTo = useNavigate();
    let postsElements;

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch('http://localhost:3000/posts', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await res.json();
                await setPosts(data.result);
                if (res.status === 401) {
                    console.log(res)
                    // postsElements = <h2>error</h2>
                    setError(true);
                    setTimeout(() => {
                        navigateTo('/login');
                    }, 2000);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchPosts();
    }, []);

    if (posts && posts.length) {
        postsElements = posts.map((post) => (
            <div className='post' key={post._id}>
                <h1>
                    <strong>title:</strong> {post.title}
                </h1>
                <div>
                    <strong>price:</strong> {post.price}
                </div>
                <div>
                    <strong>description:</strong> {post.description}
                </div>
                <div>
                    <strong>location:</strong> {post.location}
                </div>
                <div>
                    <strong>rating:</strong> {post.avgRating} <strong>/5</strong>
                </div>
                <div>
                    <Link to={`/posts/${post._id}`}>View more</Link>
                </div>
            </div>
        ));
    }

    return (
        <>
            {error ? (
                <h2>Please login or register</h2>
            ) : (
                postsElements || <h2>Loading...</h2>
            )}
        </>
    );
}

export default Posts;
