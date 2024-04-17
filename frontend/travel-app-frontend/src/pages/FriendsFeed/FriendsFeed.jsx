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
import { Skeleton } from "@/components/ui/skeleton";

import {useInView} from "react-intersection-observer";
import {useInfiniteQuery} from "@tanstack/react-query";

const FriendsFeed = () => {
	const authHeader = useAuthHeader();
	const {ref, inView} = useInView();

	useEffect(() => {
		if(inView) fetchNextPage();
	}, [inView]);

	const fetchPost = async (page) => {
		const response = await fetch(`http://localhost:5000/api/v1/posts/feed?feedType=friends&pageSize=5&pageNumber=${page.pageParam}`, {
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
	} = useInfiniteQuery({
		queryKey: ['posts_friends'],
		queryFn: fetchPost,
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages) => {
			return lastPage.length === 0 ? null : pages.length + 1;
		},
	})


    return (
        <MainContainer type="friendsFeed">

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
				<>
					{data.pages.map((group, i) => (
						group.content.map((post) => (
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
					))}
					
				</>
			)}

			{hasNextPage && <div ref={ref} className=""></div>}

        </MainContainer>
    )
}

export default FriendsFeed;
