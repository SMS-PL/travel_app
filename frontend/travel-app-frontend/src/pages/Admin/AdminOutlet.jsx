import react, {useEffect} from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const AdminOutlet = ({ fallbackPath }) => {
    const isAuthenticated = useIsAuthenticated();
    const token = useAuthHeader();
    
    // sprawdzamy, czy użytkownik jest zalogowany
    if(isAuthenticated()) {
        const user = jwtDecode(token);
    
        // Sprawdzamy, czy użytkownik jest adminem
        if(token && user.role == "ROLE_ADMIN") return <Outlet />;
        return <Navigate to={fallbackPath} replace />;
        
    } else {
        return <Navigate to={"/login"} replace />;
    }

};

export default AdminOutlet;
