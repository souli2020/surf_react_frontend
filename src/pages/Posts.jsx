import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/LogContext'

import axios from 'axios';


function Posts() {
    const { token, isLogged, setLogged } = useContext(AuthContext)
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);
    //pagination : default is page = 1
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [hasPrevPage, setHasPrevPage] = useState(false)
    const [hasNextPage, setHasNextPage] = useState(true)
    const [prevPage, setPrevPage] = useState(0)
    const [nextPage, setNextPage] = useState(2)

    const navigateTo = useNavigate();
    let postsElements;

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch(`http://localhost:3000/posts?page=${currentPage}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                });
                const data = await res.json();
                console.log(data)
                // setLogged(true);

                setPosts(data.result.docs);
                setTotalPages(data.result.totalPages);
                if (data.result.hasPrevPage) {
                    setHasPrevPage(true)
                    setPrevPage(data.result.prevPage)
                }
                else {
                    setHasPrevPage(false);
                }
                if (data.result.hasNextPage) {
                    setNextPage(data.result.nextPage)
                    setHasNextPage(true)
                }
                else {

                    setHasNextPage(false)
                }

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
    }, [currentPage]);




    const handleNextPage = () => {
        setCurrentPage(nextPage);
    };
    const handlePrevPage = () => {
        setCurrentPage(prevPage);
    };

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
        <React.Fragment>
            {error ? (
                <h2>Please login or register</h2>
            ) : (
                <React.Fragment>
                    {totalPages > 1 && (
                        <div className="pagination">
                            {hasPrevPage && (
                                <button onClick={handlePrevPage}>previous</button>
                            )}
                            <p>
                                {currentPage} of {totalPages}
                            </p>
                            {hasNextPage && (
                                <button onClick={handleNextPage}>next</button>
                            )}
                        </div>
                    )}
                    {postsElements || <h2>Loading...</h2>}

                </React.Fragment>
            )}
        </React.Fragment>
    );

}

export default Posts;
