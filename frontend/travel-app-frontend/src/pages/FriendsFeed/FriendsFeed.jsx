import { useNavigate } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import MainContainer from "@/components/MainContainer/MainContainer";
import { useState, useEffect } from 'react';

import { Button } from "@/components/ui/button"
import Post from "@/components/Post/Post";
import AddPost from "@/components/AddPost/AddPost";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

const FriendsFeed = () => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const authHeader = useAuthHeader();
	const navigate = useNavigate();

    useEffect(() => {
		setIsLoading(true);
		// fetch("http://localhost:5000/api/v1/posts/feed?feedType=friends&pageSize=10&pageNumber=0", {
		// 	method: 'GET',
		// 	headers: {
		// 		'Content-Type': 'application/json', 
		// 		"Authorization": authHeader,
		// 	},
		// })
		// .then(response => {
		// 	if (!response.ok) {
		// 		throw new Error('Błąd sieci!');
		// 	}
		// 	return response.json();
		// })
		// .then(data => {
		// 	setPosts(data.content);
		// 	setIsLoading(false);
		// })
		// .catch(error => {
		// 	console.log(error.message);
		// 	navigate("/");
		// });

	}, []);


    return (
        <MainContainer type="friendsFeed">

			{isLoading ? (
				<Card className="mt-5 w-full">
					<CardHeader className="flex flex-row">
						<Skeleton className="h-12 w-12 rounded-full" />

					
						<div className="px-2 w-fit">
							<CardTitle><Skeleton className="h-4 w-[250px]" /></CardTitle>
							<CardDescription className="text-nowrap"><Skeleton className="h-4 w-[250px] mt-2" /></CardDescription>
						</div>

			
					</CardHeader>

					<CardContent>
						<Skeleton className="h-14 w-full mb-5" />
						<Skeleton className="w-full h-[500px]" />
					</CardContent>
					
					<CardFooter className="flex justify-between">
						<Button variant="outline">Likes</Button>
						<Button variant="outline">Comments</Button>
					</CardFooter>
				</Card>

			) : (
				posts.map((post) => (
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
				))
			)}

        </MainContainer>
    )
}

export default FriendsFeed;
