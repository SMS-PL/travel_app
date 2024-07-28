import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import MainContainer from "@/components/MainContainer/MainContainer";
import { useState, useEffect } from 'react';

import { Button } from "@/components/ui/button";
import Post from "@/components/Post/Post";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {useInView} from "react-intersection-observer";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";

const Home = () => {
	const authHeader = useAuthHeader();
	const {ref, inView} = useInView();

	const [addNewPost, setAddNewPost] = useState(false);

	useEffect(() => {
		if(inView) fetchNextPage();
	}, [inView]);

	const fetchPost = async (page) => {
		const response = await fetch(`http://localhost:5000/api/v1/posts/feed?feedType=home&pageSize=5&pageNumber=${page.pageParam}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json', 
				"Authorization": authHeader,
			},
		});
		return await response.json();
	}

	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
		refetch
	} = useInfiniteQuery({
		queryKey: ['posts'],
		queryFn: fetchPost,
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages) => {
			return lastPage.length === 0 ? null : pages.length + 1;
		},
	})

	useEffect(() => {
		if(addNewPost) {
			setAddNewPost(false);
			refetch({ refetchPage: (page, index) => index === 0 })
		}
	}, [addNewPost]);

	return (
        <MainContainer type="homeFeed" setAddNewPost={setAddNewPost}>

			{status == "pending" ? (
				<Card className="mt-5 w-full">
					<CardHeader className="flex flex-row">
						<Skeleton className="h-12 w-12 rounded-full" />
						<div className="px-2 w-fit">
							<Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px] mt-2" />
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
				data.pages[0].empty == true ? (
					<div className="">
						No posts...
					</div> 
				) : (
					<>
						{data.pages.map((group, i) => (
							group.content.map((post) => (
								<Post
									key={post.id}
									postId={post.id}
									content={post.content}
									countryId={post.countryId}
									imageUrl={post.imageUrl}
									authorId={post.authorId}
									createdAt={post.createdAt}
									lastUpdated={post.lastUpdated}
									likes={post.likes}
									hearts={post.hearts}
									setAddNewPost={setAddNewPost}
									
								/>
							))
						))}
					</>
				)
			)}

			{hasNextPage && <div ref={ref} className=""></div>}

        </MainContainer>
    )
}

export default Home;
