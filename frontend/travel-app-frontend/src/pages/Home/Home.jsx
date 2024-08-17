import MainContainer from "@/components/MainContainer/MainContainer";
import Feed from "@/layouts/Feed/Feed";

const Home = () => {

	return (
		<MainContainer type="homeFeed" >
			<Feed type="home"/>
		</MainContainer>
    );
};

export default Home;
