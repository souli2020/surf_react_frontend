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
import { AuthContextProvider } from './context/LogContext'



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <React.Fragment>

                    <Route path='/' element={<AuthContextProvider>
                        <RouterLayout />
                    </AuthContextProvider>}>
                        <Route index element={<Home />} />
                        <Route path="/posts" element={<Posts />} />
                        <Route path="/posts/:id" element={<PostDetails />} />

                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>

                </React.Fragment >
            </Routes>
        </BrowserRouter>
    )
}

export default App