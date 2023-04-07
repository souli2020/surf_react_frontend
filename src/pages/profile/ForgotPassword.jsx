import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link, useNavigate, Outlet, useOutletContext } from 'react-router-dom'
import { AuthContext } from '../../context/LogContext'
import axios from 'axios';

function ForgotPassword() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigateTo = useNavigate()
    const { token, isLogged, setLogged } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        email: "",
    });


    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
        handleOpenModal()
    }, []);

    const handleChange = (event) => {

        setFormData((prevFormData) => ({
            ...prevFormData,
            email: event.target.value,
        }));

    };

    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put('http://localhost:3000/profile/forgotPassword', formData, {
                headers: {

                    Authorization: `Bearer ${token}`
                },
            });
            if (response.data.status === 200) {
                alert('please check your email!');
                setFormData({ email: '' });
                handleCloseModal();
                navigateTo('..')
            }

        } catch (error) {
            const err = error.response.data
            if (err.status === 401) {
                alert(err.err)

                navigateTo('.')
            }
            console.log(error.response)

        }
    };

    return (
        <div>
            <button type="button" onClick={handleOpenModal}>Forgot password?</button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Forgot Password</h2>
                        <p>Enter your email, we will send you a link! </p>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" placeholder="email" value={formData.email} onChange={handleChange} required />
                            <button type="submit">Submit</button>
                        </form>
                        <button className="modal-close" onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
export default ForgotPassword;