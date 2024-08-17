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
import HoverUserInfo from "@/components/ui/HoverUserInfo";

function CommentRowView({postId, commentData, commentsData, setCommentsData, setRefetch}) {
	const authHeader = useAuthHeader();
    const auth = useAuthUser();
    const { toast } = useToast();

    const [reactionCount, setReactionCount] = useState(0);
    const [isReacted, setIsReacted] = useState(false);

    
    useEffect(() => {
        setReactionCount(commentData.reactionCount);
        checkIsReacted();

        
    }, [isReacted, commentsData]);

    const deleteComment = () => {
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
            setCommentsData(
                commentsData.map((group, i) => (
                    group.filter(comment => comment.id !== commentData.id)
                ))
            );
            setRefetch(true);
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

    const checkIsReacted = () => {
        fetch(`http://localhost:5000/api/v1/comments/${commentData.id}/reacted`, {
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
            setIsReacted(data.reacted);
		})
		.catch(error => {
			console.log(error.message);
		});

    };

    const reactToComment = () => {
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
            setIsReacted(prevReact => !prevReact);
            // setReactionCount(data.reactionCount);
            // console.log(data);
           
            // Zaktualizuj `commentsData`, aby zwiększyć `reactionCount` odpowiedniego komentarza
            // setCommentsData(
            //     commentsData.map((group) => 
            //         group.map(comment => 
            //             comment.id === commentData.id 
            //                 ? { ...comment, reactionCount: comment.reactionCount + 1 }
            //                 : comment
            //         )
            //     )
            // );

            setCommentsData(prevCommentsData => 
                prevCommentsData.map(group => 
                    group.map(comment => {
                        if (comment.id === commentData.id) {
                            return {
                                ...comment,
                                reactionCount: isReacted ? comment.reactionCount - 1 : comment.reactionCount + 1
                            };
                        }
                        return comment;
                    })
                )
            );

            setReactionCount(prevCount => isReacted ? prevCount - 1 : prevCount + 1);

            console.log(commentsData);
		})
		.catch(error => {
			console.log(error.message);
		});
    };

    return (
        <div className="flex flex-row gap-5 w-full my-3">
            <div className="flex justify-center items-start">
                <Skeleton className="h-10 w-10 rounded-full " />
            </div>

            <div className="flex flex-col w-full">
                <div className="flex flex-row items-baseline gap-3">
                    <div className="text-sm">
                        <HoverUserInfo userData={commentData.author}>
                            <span className="font-bold hover:underline">{commentData !== null && commentData.author.firstName} {commentData.author.lastName}</span> 
                        </HoverUserInfo>
                        <span> {commentData !== null && commentData.content}</span>
                    </div>
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

            <div className="flex flex-row items-center gap-1 group cursor-pointer" onClick={() => reactToComment()}>

                {isReacted ? (
                    <Icons.heartFill className=" fill-red-500 w-4 h-4 cursor-pointer" />
                ) : (
                    <Icons.heartEmpty className="fill-current w-4 h-4 cursor-pointer group-hover:fill-red-500" />
                )}
                
                <span className="text-sm font-base text-current group-hover:text-red-500">{reactionCount}</span>
            </div>
            
        </div>
    )
}

export default CommentRowView;
