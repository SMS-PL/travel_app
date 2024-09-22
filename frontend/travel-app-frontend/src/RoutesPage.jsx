import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import AdminOutlet from "@/pages/Admin/AdminOutlet";

import Profile from "@/pages/Profile/Profile";
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

const RoutesPage = () => {

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                {/* public */}
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register />} />

                {/* private */}
                <Route element={<AuthOutlet fallbackPath='/login' />}>
                    <Route path='/' element={<Home/>} />
                    <Route path='/friends-feed' element={<FriendsFeed/>} />
                    <Route path='/profile/:userId' element={<Profile />} />
                    <Route path='/post/:postId' element={<PostPage />} />
                    <Route path='/logout' element={<Logout />} />
                </Route>

                {/* admins */}
                <Route element={<AdminOutlet fallbackPath="/" />}>
                    <Route path='/admin' element={<AdminDashboard/>} />
                    <Route path="/admin/users" element={<UsersManagement />} />
                    <Route path="/admin/posts" element={<PostsManagement />} />
                </Route> 


                {/* error page */}
                <Route path='*' element={<ErrorPage />}/>

            </Routes>
        </BrowserRouter>
    );
};

export default RoutesPage;
