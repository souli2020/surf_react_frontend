import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/LogContext'
import axios from "axios"

function ResetPassword() {

    const { resetToken } = useParams()
    const navigateTo = useNavigate()
    const { token } = useContext(AuthContext)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        confirm: ''
    })
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
        handleOpenModal()
    }, []);

    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    function handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/reset/${resetToken}`, formData, {
                headers: {

                    Authorization: `Bearer ${token}`
                },
            });
            if (response.status === 200) {
                setIsModalOpen(false);
                navigateTo('..')
            }

        } catch (error) {
            alert('It seems like the link for validation is broken. Please try again')


        }
    };

    return (

        <div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Update Password</h2>
                        <div className="form-container">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="password">New Password:</label>
                                    <input type="password" id="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirm">Confirm Password:</label>
                                    <input type="password" id="confirm" name="confirm" placeholder="confirm" value={formData.confirm} onChange={handleChange} required />
                                </div>
                                <button type="submit" id="submitBtn">Submit</button>
                            </form>
                        </div>
                        <button className="modal-close" onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );




}

export default ResetPassword