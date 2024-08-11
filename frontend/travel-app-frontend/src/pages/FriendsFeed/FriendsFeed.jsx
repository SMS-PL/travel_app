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
import { Icons } from "@/components/icons";

const FriendsFeed = () => {
	const authHeader = useAuthHeader();
	const {ref, inView} = useInView();
	const key = location.pathname === "/" ? "home" : "other";

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
		queryKey: ['posts_friends', key],
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
						<Skeleton className="h-8 w-full mb-5" />
						<Skeleton className="w-full h-[500px]" />
					</CardContent>
					<CardFooter className="flex justify-between">
						<div className="flex flex-row gap-3">
							<Button variant="secondary" >
								<div className="flex flex-row justify-center items-center gap-2">
									<Icons.likeEmpty className="h-6 w-6 fill-primary" />
									0
								</div>
							</Button>
							<Button variant="secondary" className="w-max-full w-[75px]" >
								<div className="flex flex-row justify-center items-center gap-1">
									<Icons.heartEmpty className="h-6 w-6 fill-red-500" />
									0
								</div>
							</Button>
						</div>
						<Button type="button" variant="secondary" className="flex flex-row items-center justify-center gap-2">
							<Icons.commentEmpty className="fill-current w-6 h-6" /> 
							0
						</Button>
					</CardFooter>
				</Card>

			) : (
				data.pages[0].empty == true ? (
					<h1 className="text-sm font-extrabold tracking-tight lg:text-md text-center mt-8">No posts...</h1>
				) : (
					<>
						{data.pages.map((group, i) => (
							group.content.map((post) => (
								<Post
									key={post.id}
									postData={post}
									// setAddNewPost={setAddNewPost}
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

export default FriendsFeed;
