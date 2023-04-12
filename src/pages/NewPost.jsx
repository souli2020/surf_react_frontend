import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewPost() {
    const navigateTo = useNavigate()
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [videos, setVideos] = useState([]);
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleVideosChange = (event) => {
        setVideos(Array.from(event.target.files));
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append("title", title);
        formData.append("price", price);
        for (let i = 0; i < videos.length; i++) {
            formData.append("videos", videos[i]);
        }
        formData.append("description", description);
        formData.append("location", location);

        fetch("http://localhost:3000/posts/new", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Post created:", data);
                navigateTo('/posts');
            })
            .catch((error) => {
                console.error("Error creating post:", error);
            });
    };

    return (
        <div>
            <h1>Create a New Post!</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="price"
                        placeholder="price"
                        value={price}
                        onChange={handlePriceChange}
                    />
                </div>
                <div>
                    <input
                        type="file"
                        name="videos"
                        accept="video/*"
                        multiple
                        onChange={handleVideosChange}
                    />
                </div>
                <div>
                    <textarea
                        name="description"
                        placeholder="description"
                        aria-placeholder="description"
                        value={description}
                        onChange={handleDescriptionChange}
                    ></textarea>
                </div>
                <div>
                    <input
                        type="text"
                        name="location"
                        placeholder="location"
                        value={location}
                        onChange={handleLocationChange}
                    />
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
}

export default NewPost;
