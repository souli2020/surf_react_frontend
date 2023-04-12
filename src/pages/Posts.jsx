import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/LogContext'
import VideoPlayer from '../components/VideoPlayer'
import defaultImage from '../assets/images/default-profile.jpg';

import axios from 'axios';


function Posts({ children }) {
    const { token, isLogged, setLogged } = useContext(AuthContext)
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);
    //pagination : default is page = 1
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [hasPrevPage, setHasPrevPage] = useState(false)
    const [hasNextPage, setHasNextPage] = useState(true)
    const [prevPage, setPrevPage] = useState(0)
    const [nextPage, setNextPage] = useState(2)
    const [searchParams, setSearchParams] = useSearchParams()
    //filters
    const [priceFilter, setPriceFilter] = useState('');
    const [searchFilter, setSearchFilter] = useState('');
    const [search, setSearch] = useState(false);



    const navigateTo = useNavigate();
    let postsElements;

    useEffect(() => {
        console.log('useEffect')
        async function fetchPosts() {

            const res = await fetch(`http://localhost:3000/posts?page=${currentPage}${priceFilter ? `&price=${priceFilter}` : ''}${searchFilter ? `&search=${searchFilter}` : ''}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            });
            const data = await res.json();
            if (data.status === 401) {
                console.log(401)
                setError(true);
                setLogged(false);
                localStorage.removeItem('token');
                setTimeout(() => {
                    navigateTo('/login');
                }, 2000);
            }
            else if (data.status === 404) {
                alert('No posts found Please try other filters')
                setTimeout(() => {
                    handleClearFilters()
                }, 2000);
            }
            else {
                console.log(data)
                setLogged(true);
                searchParams.set('page', currentPage);
                setSearchParams(searchParams)

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
            }




        }
        fetchPosts();
    }, [currentPage, search]);




    const handleNextPage = () => {
        setCurrentPage(nextPage);
    };
    const handlePrevPage = () => {
        setCurrentPage(prevPage);
    };
    const handlePriceChange = (event) => {
        event.stopPropagation()
        console.log(event.target.name)
        const newPriceFilter = event.target.name;
        setPriceFilter(newPriceFilter);
    };

    const handleSearchFilter = (event) => {
        const searchQuery = event.target.value;
        setSearchFilter(searchQuery);

    }
    const handleSearch = () => {
        // const price = searchParams.get('price');
        searchParams.set('price', priceFilter);
        searchParams.set('search', searchFilter)
        setSearchParams(searchParams);
        setCurrentPage(1);
        setSearch(true);

    }

    const handleClearFilters = () => {
        setSearch(false);
        setPriceFilter('');
        setSearchFilter('');
        setCurrentPage(1);
        searchParams.delete('price')
        searchParams.delete('search')
        setSearchParams(searchParams)
    }

    let filtered


    // if (priceFilter) {
    //     console.log(priceFilter)
    //     const priceFilterValue = parseFloat(priceFilter);
    //     filtered = posts.filter(post => parseFloat(post.price) < priceFilterValue)
    // }
    if (posts && posts.length) {
        postsElements = posts.map((post) => (
            <div className='post post2' key={post._id}>
                <div className="video-wrapper">
                    {post.videos && post.videos.length > 0 && (
                        <>
                            <VideoPlayer src={post.videos[0]?.path} width={300} height={400} />
                            <div className="video-details">
                                <h1 className="video-title">
                                    <strong>Title:</strong> {post.title}
                                </h1>
                                <strong>Price:</strong> {post.price} $
                                <div>
                                    <strong>Rating:</strong> {post.avgRating} <strong>/5</strong>
                                </div>
                                <Link to={`/posts/${post._id}`}>View more</Link>
                            </div>
                        </>
                    )}
                </div>
                <div className="post-location">
                    <strong>Location:</strong> {post.location}
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
                    <div className="filter-container">
                        <h2>Filter results</h2>
                        <p>less than:</p>
                        <div>

                            <button className="price-btn" name="200" onClick={handlePriceChange}>$200</button>
                            <button className="price-btn" name="500" onClick={handlePriceChange}>$500</button>
                            <button className="price-btn" name="750" onClick={handlePriceChange}>$750</button>
                            <button className="price-btn" name="1000" onClick={handlePriceChange}>$1000</button>
                        </div>


                        <label className="search-label" htmlFor='search'>
                            Search by name:
                        </label>
                        <input className="search-input" type="text" value={searchFilter} name='search' id="search" onChange={handleSearchFilter} />

                        <div>

                            <button className="search-btn" onClick={handleSearch}>Search</button>
                            <button className="clear-btn" onClick={handleClearFilters}>Clear Filters</button>
                        </div>
                    </div>


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
                    )
                    }
                    {<div className="post-container">
                        {postsElements}
                    </div> || <h2 className='load-man'></h2>}

                </React.Fragment >
            )}
        </React.Fragment >
    );

}

export default Posts;
