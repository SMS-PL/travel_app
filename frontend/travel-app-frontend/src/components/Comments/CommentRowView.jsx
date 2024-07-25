import React from 'react'
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import ReactTimeAgo from 'react-time-ago';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function CommentRowView({postId, commentData, commentsData, setCommentsData}) {
	const authHeader = useAuthHeader();
    const auth = useAuthUser();
    const { toast } = useToast();

    const [reactionCounter, setReactionCounter] = useState(commentData.reactionCount);

    const deleteComment = () => {
        // console.log(commentData.id);
		fetch(`http://localhost:5000/api/v1/comments/${commentData.id}`, {
			method: 'DELETE',
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
            //console.log("Komentarz usunięty pomyślnie!");
            //setResetCommentsData(true);
            //setRefetchComments(true);
            // setCommentsData(prevComments => prevComments.filter(comment => comment.content.id !== commentData.id));
            
            setCommentsData(
                commentsData.map((group, i) => (
                    group.filter(comment => comment.id !== commentData.id)
                ))
            );
            // queryClient.setQueryData(['comments', postId], oldData => {
            //     if (!oldData) return oldData;
            //     return {
            //         ...oldData,
            //         pages: oldData.pages.map(page => ({
            //             ...page,
            //             content: page.content.filter(comment => comment.id !== commentData.id),
            //         })),
            //     };
            // });
            toast({
                title: "Hurrah!",
                description: "Comment deleted correctly!",
                className: "bg-green-800"
            })
		})
		.catch(error => {
			console.log(error.message);
		});
    };

    const reactionComment = () => {
        fetch(`http://localhost:5000/api/v1/comments/${commentData.id}/react`, {
			method: 'POST',
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
            console.log("Reakcja zarejestrowana pomyślnie!");
		})
		.catch(error => {
			console.log(error.message);
		});
    };

    return (
        <div className="flex flex-row items-center gap-5 w-full my-3">
            <Skeleton className="h-10 w-10 rounded-full" />

            <div className="flex flex-col w-full">
                <div className="flex flex-row items-center gap-3">
                    <p className="font-bold">{commentData !== null && commentData.author.firstName} {commentData.author.lastName}</p> 
                    <p className=" text-sm">{commentData !== null && commentData.content}</p>
                </div>

                <div className="flex flex-row gap-2">
                    <ReactTimeAgo timeStyle="round" date={new Date(commentData !== null && commentData.createdAt)} locale="en-US" className="text-sm text-gray-500"/>
                    {auth.id == commentData.author.id && (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Icons.dotsVertical className="fill-gray-500 w-5 h-5 cursor-pointer" />
                            </DropdownMenuTrigger>
                            
                            <DropdownMenuContent>
                                <DropdownMenuItem className="cursor-pointer" onClick={() => {deleteComment()}}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        )
                    }
                </div>

            </div>

            <div className="flex flex-row items-center gap-2">
                <p className="text-sm font-thin">{commentData !== null && commentData.reactionCounter}</p>
                <Icons.heartEmpty className="fill-white w-4 h-4 cursor-pointer" />
            </div>
            {/* <div>{commentData.content}</div> */}
            
        </div>
    )
}

export default CommentRowView;
