import React, { useState, useEffect, useContext } from 'react';
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
import Post from "@/layouts/Feed/Post/Post";
import AddPost from "@/layouts/Feed/Post/AddPost/AddPost";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { RefreshFriendshipContext } from '@/contexts/RefreshFriendshipContext';
import SpinLoading from '@/components/ui/SpinLoading';
import { cn } from '@/lib/utils';

const Feed = ({type = "home", userId = null}) => { // type = home/friends/profile
	const authHeader = useAuthHeader();
	const auth = useAuthUser();

	const { globalRefreshFriendship, setGlobalRefreshFriendship } = useContext(RefreshFriendshipContext);

	const [addNewPost, setAddNewPost] = useState(false);
	const [isLastPage, setIsLastPage] = useState(false);

	const [refetchPosts, setRefetchPosts] = useState(false);

	const {ref, inView} = useInView();

    // do poprawnego ładowania postów
    const location = useLocation().pathname;    
    // const key = "home";

    useEffect(() => {
		if(inView && hasNextPage) fetchNextPage();
	}, [inView]);

	useEffect(() => {
		if(refetchPosts) {
			refetch();
			setRefetchPosts(false);
		}

	}, [refetchPosts]);

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

	// useEffect(() => {
	// 	refetch({ refetchPage: (page, index) => index === 0 });
	// 	setGlobalRefreshFriendship(false);
	// }, [globalRefreshFriendship]);

    return (
        <div>
			{((type == "home") || (type == "friends") || (type == "profile" && userId == auth.id)) &&
				<AddPost setAddNewPost={setAddNewPost} /> 
			}
            
			{(status == "pending" && !data) ? (
				<SpinLoading className="w-full flex justify-center items-center py-5" />

			) : (
				data.pages[0].empty == true ? (
					<div className="flex flex-col justify-center items-center mt-4">
						<Icons.emptyBox className="fill-current w-[90px] h-[90px] opacity-20" />
						<p className="font-base text-sm text-gray-400">No posts...</p>
					</div>
				) : (
					<div className="flex flex-col w-full gap-5 mt-5">
						{data.pages.map((group, i) => (
							group.content.map((post) => (
								<Post
									key={post.id}
									postData={post}
									setAddNewPost={setAddNewPost}
									setRefetchPosts={setRefetchPosts}
								/>
							))
						))}
					</div>
				)
			)}

			{hasNextPage && <div ref={ref}></div>}
        </div>
    )
};

export default Feed;
