import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import AdminOutlet from "@/pages/Admin/AdminOutlet";
import Profile from "@/pages/Profile/Profile";
import Settings from "@/pages/Settings/Settings";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Logout from "@/pages/Logout/Logout";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import FriendsFeed from "@/pages/FriendsFeed/FriendsFeed";
import PostPage from "@/pages/PostPage/PostPage";
import AdminDashboard from "@/pages/Admin/AdminDashboard/AdminDashboard";
import UsersManagement from "@/pages/Admin/UsersManagement/UsersManagement";
import PostsManagement from "@/pages/Admin/PostsManagement/PostsManagement";
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useToast } from "@/components/ui/use-toast";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();
    const { toast } = useToast();

    const signOut = useSignOut()
	const authHeader = useAuthHeader();
	const auth = useAuthUser();

    const getUserData = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/users/${auth.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                "Authorization": authHeader,
            },
        });

        // Czy odpowiedź ma kod oznaczający blokadę czasową
        if (!response.ok) {
            signOut();
            navigate('/login');
        }
    };

    getUserData();
    
    // Renderuj dzieci tylko, gdy użytkownik jest zalogowany
    return isAuthenticated ? children : null; 
};

const RoutesPage = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                {/* public */}
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />

                {/* private */}
                <Route element={<AuthOutlet fallbackPath='/login' />}>
                    <Route
                        path='/'
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/friends-feed'
                        element={
                            <ProtectedRoute>
                                <FriendsFeed />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/profile/:userId'
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/settings'
                        element={
                            <ProtectedRoute>
                                <Settings />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/post/:postId'
                        element={
                            <ProtectedRoute>
                                <PostPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path='/logout' element={<Logout />} />
                </Route>

                {/* admins */}
                <Route element={<AdminOutlet fallbackPath="/" />}>
                    <Route
                        path='/admin'
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/admin/users'
                        element={
                            <ProtectedRoute>
                                <UsersManagement />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/admin/posts'
                        element={
                            <ProtectedRoute>
                                <PostsManagement />
                            </ProtectedRoute>
                        }
                    />
                </Route>

                {/* error page */}
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesPage;



// import React, { useState, useEffect, createContext } from 'react';
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
// import AdminOutlet from "@/pages/Admin/AdminOutlet";
// import Profile from "@/pages/Profile/Profile";
// import Settings from "@/pages/Settings/Settings";
// import Home from "@/pages/Home/Home";
// import Login from "@/pages/Login/Login";
// import Register from "@/pages/Register/Register";
// import Logout from "@/pages/Logout/Logout";
// import ErrorPage from "@/pages/ErrorPage/ErrorPage";
// import FriendsFeed from "@/pages/FriendsFeed/FriendsFeed";
// import PostPage from "@/pages/PostPage/PostPage";
// import AdminDashboard from "@/pages/Admin/AdminDashboard/AdminDashboard";
// import UsersManagement from "@/pages/Admin/UsersManagement/UsersManagement";
// import PostsManagement from "@/pages/Admin/PostsManagement/PostsManagement";
// import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
// import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

// const RoutesPage = () => {
//     const isAuthenticated = useIsAuthenticated();

//     return (
//         <BrowserRouter>
//             <ScrollToTop />
//             <Routes>
//                 <Route path='/login' element={<Login/>}/>
//                 <Route path='/register' element={<Register />} />
                
//                 <Route element={<AuthOutlet fallbackPath='/login' />}>
//                     <Route path='/' element={<Home/>} />
//                     <Route path='/friends-feed' element={<FriendsFeed/>} />
//                     <Route path='/profile/:userId' element={<Profile />} />
//                     <Route path='/settings' element={<Settings />} />
//                     <Route path='/post/:postId' element={<PostPage />} />
//                     <Route path='/logout' element={<Logout />} />
//                 </Route>

//                 <Route element={<AdminOutlet fallbackPath="/" />}>
//                     <Route path='/admin' element={<AdminDashboard/>} />
//                     <Route path="/admin/users" element={<UsersManagement />} />
//                     <Route path="/admin/posts" element={<PostsManagement />} />
//                 </Route> 


//                 <Route path='*' element={<ErrorPage />}/>

//             </Routes>
//         </BrowserRouter>
//     );
// };

// export default RoutesPage;
