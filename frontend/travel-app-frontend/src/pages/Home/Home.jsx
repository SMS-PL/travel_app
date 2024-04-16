import { useNavigate } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import MainContainer from "@/components/MainContainer/MainContainer";
import { useState, useEffect } from 'react';

import Post from "@/components/Post/Post";
import AddPost from "@/components/AddPost/AddPost";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
  
const Home = () => {
	const [posts, setPosts] = useState([]);
	const authHeader = useAuthHeader();
	const navigate = useNavigate();

    useEffect(() => {
		fetch("http://localhost:5000/api/v1/posts/feed?feedType=home&pageSize=10&pageNumber=0", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json', 
				"Authorization": authHeader,
			},
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Błąd sieci!');
			}
			return response.json();
		})
		.then(data => {
			setPosts(data.content);
		})
		.catch(error => {
			console.log(error.message);
			navigate("/");
		});

	}, []);


    return (
        <MainContainer type="homeFeed">
			{posts.map((post) => (
				<Post
					key={post.id}
					id={post.id}
					content={post.content}
					countryId={post.countryId}
					imageUrl={post.imageUrl}
					authorId={post.authorId}
					createdAt={post.createdAt}
					lastUpdated={post.lastUpdated}
				/>
			))}
        </MainContainer>
    )
}

export default Home;
