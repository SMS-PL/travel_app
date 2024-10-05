import MainContainer from "@/components/MainContainer/MainContainer";
import Feed from "@/layouts/Feed/Feed";
import { Link, useNavigate, Navigate, } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const FriendsFeed = () => {
    const isAuthenticated = useIsAuthenticated();

	if (!isAuthenticated()) {
        return <Navigate to={"/login"} replace />;
    } else {
		return (
			<MainContainer type="friendsFeed" >
				<Feed type="friends"/>
			</MainContainer>
		);
	}
}

export default FriendsFeed;
