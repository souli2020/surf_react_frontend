import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Logout from './pages/Logout'
import Posts from './pages/Posts'
import PostDetails from './pages/PostsDetails'
import RouterLayout from './pages/Layout';
import Profile from './pages/Profile'
import UpdateProfile from './pages/profile/UpdateProfile'
import ForgotPassword from './pages/profile/ForgotPassword'
import ResetPassword from './pages/profile/ResetPassword'
import NewPost from './pages/NewPost'
import { AuthContextProvider } from './context/LogContext'
import UserPosts from './pages/profile/UserPosts'




function App() {
    return (
        <BrowserRouter>
            <Routes>


                <Route path='/' element={<AuthContextProvider>
                    <RouterLayout />
                </AuthContextProvider>}>
                    <Route index element={<Home />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route path="/posts/new" element={<NewPost />} />


                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="profile" element={<Profile />} >
                        <Route path="edit" element={<UpdateProfile />} />
                        <Route path="posts/:id" element={<UserPosts />} />
                        <Route path="reset/:resetToken" element={<ResetPassword />} />
                        <Route path="forgotPassword" element={<ForgotPassword />} />

                    </Route >
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default App