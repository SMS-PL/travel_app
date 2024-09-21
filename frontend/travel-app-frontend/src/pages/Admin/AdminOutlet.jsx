import react, {useEffect} from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const AdminOutlet = ({ fallbackPath }) => {
    const token = useAuthHeader();
    const user = jwtDecode(token);

    // Sprawdzamy, czy użytkownik jest zalogowany i jest udminem
    if(token && user.role == "ROLE_ADMIN") {
        console.log("ADMIN!!!!");
        return <Outlet />;
    } 
    
    return <Navigate to={fallbackPath} replace />;
};

export default AdminOutlet;
