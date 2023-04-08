import { React, useState, useContext } from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import { AuthContext } from '../context/LogContext'

function Login() {
    const navigateTo = useNavigate();
    const { isLogged, setLogged } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    })

    //handle submit 
    function handleSubmit(e) {
        e.preventDefault();

        axios.post("http://localhost:3000/login", formData)
            .then((response) => {
                console.log(response);
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
                // console.error(error);
                // Handle registration error
                if (error.response.status === 401) {

                    console.log('wrong password or usernames', error.response.data)
                    alert(error.response.data.msg)


                }
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
            <h3>logged success and redirected</h3>
        )
    }
    return (
        <>


            <form onSubmit={handleSubmit} className="form-container">
                <label htmlFor="username" className="form-label">Username:</label>
                <input
                    onChange={handleInputChange} value={formData.username} type="text" id="username" name="username" className="form-input" />

                <label htmlFor="password" className="form-label">Password:</label>
                <input
                    onChange={handleInputChange}
                    value={formData.password}
                    type="password" id="password" name="password" className="form-input" />

                <button type="submit" className="form-button">Login</button>
            </form>
            <div>
                <Link to="/register">You don't have an account? Register</Link>
            </div>
        </>
    )
}

export default Login