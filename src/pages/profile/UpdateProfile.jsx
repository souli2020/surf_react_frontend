import React, { useState, useContext, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/LogContext'

import axios from 'axios';

function UpdateProfile() {
    const navigateTo = useNavigate()
    const { token, isLogged, setLogged } = useContext(AuthContext)


    const user = useOutletContext();
    const [formData, setFormData] = useState({
        username: user?.username || '',
        currentPassword: '',
        newPassword: '',
        passwordConfirmation: '',
        email: user?.email || '',
        image: '',
    });
    const [passwordsMatch, setPasswordsMatch] = useState(true); // added state for password match validation
    const [isModalOpen, setIsModalOpen] = useState(false)


    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
        handleOpenModal()
    }, []);

    const handleChange = (event) => {
        const { name, value, files } = event.target;

        if (name === 'image') {
            const file = files[0];
            const imageUrl = URL.createObjectURL(file);

            setFormData((prevFormData) => ({
                ...prevFormData,
                image: file,
                imageUrl: imageUrl,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
        handlePasswordConfirmationChange(event)
    };
    const handlePasswordConfirmationChange = (event) => {
        const { value } = event.target;

        // update passwordsMatch state
        setPasswordsMatch(value === formData.newPassword);
    };
    //modal functions
    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData();
        form.append('type', 'profile');
        form.append('username', formData.username);
        form.append('currentPassword', formData.currentPassword);
        form.append('newPassword', formData.newPassword);
        form.append('passwordConfirmation', formData.passwordConfirmation);
        form.append('email', formData.email);
        form.append('image', formData.image);


        try {
            const response = await axios.put('http://localhost:3000/profile', form, {
                headers: {

                    Authorization: `Bearer ${token}`
                },
            });
            console.log(response.data);
            navigateTo('..')
        } catch (error) {
            const err = error.response.data.err;
            alert(err)
            setTimeout(() => {
                navigateTo('.')

            }, 2000)

        }
    };

    return (
        <div>
            <button type="button" onClick={handleOpenModal}>Update Profile?</button>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content update-modal">

                        <form onSubmit={handleSubmit} id="update-profile" encType="multipart/form-data">
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" name="username" placeholder="username" value={formData.username} onChange={handleChange} autoFocus required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="current-password">Current Password (required):</label>
                                <input type="password" id="current-password" name="currentPassword" placeholder="current password" value={formData.currentPassword} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="new-password">New Password:</label>
                                <input type="password" id="new-password" name="newPassword" placeholder="new password" value={formData.newPassword} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password-confirmation">New Password Confirmation:</label>
                                <input type="password" id="password-confirmation" name="passwordConfirmation" placeholder="password confirmation" value={formData.passwordConfirmation} onChange={handleChange} />
                            </div>
                            {!passwordsMatch ?
                                (<div className="form-error" style={{ color: 'red' }}>New Password not matches</div>) :
                                (<div className="form-error" style={{ color: 'green' }}> Passwords matches</div>)
                            }

                            <div className="form-group" id="validation-message"></div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" placeholder="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Image:</label>
                                <small>(this will delete the existing profile image)</small>
                                <input type="file" id="image" name="image" onChange={handleChange} />
                            </div>
                            <button type="submit" id="submitBtn">Submit</button>
                        </form>
                        <button className="modal-close update-close-btn" onClick={handleCloseModal}>Close</button>

                    </div>
                </div>
            )}
        </div >
    );
}

export default UpdateProfile;
