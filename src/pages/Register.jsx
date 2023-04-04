/* create a form for registering user */
import { React, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../context/LogContext'

function Register() {
    const { isLogged, setLogged } = useContext(AuthContext);
    const navigateTo = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    })
    //handle submit 
    function handleSubmit(e) {
        e.preventDefault();

        axios.post("http://localhost:3000/register", formData)
            .then((response) => {
                console.log(response);
                // Handle successful registration
                if (response.status === 200) {
                    setLogged(true)
                    localStorage.setItem('token', response.data.token);
                    axios.get("http://localhost:3000/posts", {
                        headers: {
                            Authorization: `Bearer ${response.data.token}`,
                        }
                    })
                        .then(response => {
                            if (response.status === 200) {
                                console.log(response)
                                navigateTo('/posts')
                            }
                        })
                }
            })
            .catch((error) => {
                console.error(error);
                // Handle registration error
            });
    }
    function handleInputChange(e) {

        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }
    if (isLogged) {
        return (
            <h3>account created successfully</h3>
        )
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="form-container">
                <label htmlFor="username" className="form-label">Username:</label>
                <input onChange={handleInputChange} value={formData.username} type="text" id="username" name="username" className="form-input" />

                <label htmlFor="password" className="form-label">Password:</label>
                <input onChange={handleInputChange} value={formData.password} type="password" id="password" name="password" className="form-input" />

                <label htmlFor="email" className="form-label">Email:</label>
                <input onChange={handleInputChange} value={formData.email} type="email" id="email" name="email" className="form-input" />

                <button type="submit" className="form-button">Register</button>
            </form>
            <div>
                <Link to="/login">have an account? login</Link>
            </div>

        </>
    )
}

export default Register;