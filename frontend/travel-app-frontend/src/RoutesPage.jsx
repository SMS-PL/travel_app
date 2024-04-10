import { BrowserRouter, Route, Routes } from "react-router-dom";

// import RequireAuth from "@auth-kit/react-router/RequireAuth";
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import Profile from "./components/Profile";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import ErrorPage from "./ErrorPage";

// import Secure from "./componants/Secure";

const RoutesPage = () => {

    return (
        <BrowserRouter>
            <Routes>
                {/* public */}
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register />} />

                {/* private */}
                <Route element={<AuthOutlet fallbackPath='/login' />}>
                    <Route path='/' element={<Home/>} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/logout' element={<Logout />} />
                </Route>

                {/* error page */}
                <Route path='*' element={<ErrorPage />}/>

            </Routes>
        </BrowserRouter>
    );
};

export default RoutesPage;

            {/* <Routes>
                 <Route path={"/"} element={<Home />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/secure"} element={
                    <RequireAuth fallbackPath={"/login"}>
                        <Secure />
                    </RequireAuth>
                }/>
            </Routes> */}