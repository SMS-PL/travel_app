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
	const authHeader = useAuthHeader();


    return (
        <MainContainer type="exploreFeed">
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
        </MainContainer>
    )
}

export default FriendsFeed;
