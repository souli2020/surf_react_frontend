import React from 'react'
import { Link, Outlet } from 'react-router-dom'
function ProfileNavbar() {
    return (
        <div style={{ backgroundColor: '#f2f2f2', padding: '10px' }}>
            <nav style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="edit" style={{ textDecoration: 'none', color: 'black', padding: '5px' }}>Update Profile</Link>
                {/* <Link to="reset/:resetToken" style={{ textDecoration: 'none', color: 'black', padding: '5px' }}>Reset Password</Link> */}
                <Link to="forgotPassword" style={{ textDecoration: 'none', color: 'black', padding: '5px' }}>Change Password</Link>
            </nav>
        </div>

    )
}

export default ProfileNavbar