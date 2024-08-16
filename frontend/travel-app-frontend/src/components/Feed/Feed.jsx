import React from 'react';
import { useState, useEffect } from 'react';
import {useInView} from "react-intersection-observer";
import {useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icons } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Post from "@/components/Post/Post";
import AddPost from "@/components/AddPost/AddPost";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const Feed = ({type = "home", userId = null}) => { // type = home/friends/profile
	const authHeader = useAuthHeader();
	const auth = useAuthUser();

	const [addNewPost, setAddNewPost] = useState(false);
	const {ref, inView} = useInView();

    // do poprawnego ładowania postów
    const location = useLocation().pathname;    
    // const key = "home";


    useEffect(() => {
		if(inView) fetchNextPage();
	}, [inView]);

    const fetchPost = async (page) => {

        if(type != "profile") {
            const response = await fetch(`http://localhost:5000/api/v1/posts/feed?feedType=${type}&pageSize=5&pageNumber=${page.pageParam}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 
                    "Authorization": authHeader,
                },
            });
            return await response.json();
        } else if(type == "profile" && userId) {
            const response = await fetch(`http://localhost:5000/api/v1/posts/user/${userId}?pageSize=5&pageNumber=${page.pageParam}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 
                    "Authorization": authHeader,
                },
            });
            return await response.json();
        }
	};

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
		queryKey: ['posts', location],
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
        <div>
			{((type == "home") || 
			(type == "friends") || 
			(type == "profile" && userId == auth.id)) && 
			<AddPost setAddNewPost={setAddNewPost}/> }
            

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
					<div className="flex flex-col justify-center items-center mt-7">
						<Icons.emptyBox className="fill-current w-[90px] h-[90px] opacity-20" />
						<p className="font-base text-sm text-gray-400">No posts...</p>
					</div>
				) : (
					<>
						{data.pages.map((group, i) => (
							group.content.map((post) => (
								<Post
									key={post.id}
									postData={post}
									setAddNewPost={setAddNewPost}
									refetch={refetch}
								/>
							))
						))}
					</>
				)
			)}

			{hasNextPage && <div ref={ref} className=""></div>}
        </div>
    )
};

export default Feed;
