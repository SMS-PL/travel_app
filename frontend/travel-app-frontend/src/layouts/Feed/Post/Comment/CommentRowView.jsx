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
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import DeleteCommentDialog from "@/layouts/Feed/Post/Comment/DeleteCommentDialog";
import EditCommentDialog from "@/layouts/Feed/Post/Comment/EditCommentDialog";

const CommentRowView = ({commentId, commentData, commentsData, setCommentsData, setRefetch}) => {
	const authHeader = useAuthHeader();
    const auth = useAuthUser();
    const { toast } = useToast();

    const [reactionCount, setReactionCount] = useState(0);
    const [isReacted, setIsReacted] = useState(false);

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    
    useEffect(() => {
        setReactionCount(commentData.reactionCount);
        checkIsReacted();

        
    }, [isReacted, commentsData]);



    const checkIsReacted = () => {
        fetch(`http://localhost:5000/api/v1/comments/${commentId}/reacted`, {
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
        fetch(`http://localhost:5000/api/v1/comments/${commentId}/react`, {
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
                <Avatar>
                    <AvatarImage src={commentData && commentData.author.photoUrl} alt="stock img" className="object-cover bg-black" />
                    <AvatarFallback>{commentData && `${commentData.author.firstName[0]}${commentData.author.lastName[0]}`}</AvatarFallback>
                </Avatar>
            </div>

            <div className="flex flex-col w-full">
                <div className="flex flex-row items-baseline gap-3 break-words">
                    <div className="text-sm">
                        {/* {commentData.id} */}
                        <HoverUserInfo userData={commentData.author}>
                            <span className="font-bold hover:underline">{commentData !== null && commentData.author.firstName} {commentData.author.lastName}</span> 
                        </HoverUserInfo>
                        <span className="break-words break-all"> {commentData !== null && commentData.content}</span>
                    </div>
                </div>
                
                <div className="flex flex-row gap-3 justify-start items-center">
                    <ReactTimeAgo timeStyle="round" date={new Date(commentData !== null && commentData.createdAt)} locale="en-US" className="text-sm text-gray-500"/>

                    <div className="flex flex-row items-center justify-center gap-1 group cursor-pointer" onClick={() => reactToComment()}>

                        {isReacted ? (
                            <Icons.heartFill className=" fill-red-500 w-4 h-4 cursor-pointer" />
                        ) : (
                            <Icons.heartEmpty className="fill-gray-500 w-4 h-4 cursor-pointer group-hover:fill-red-500" />
                        )}

                        <span className="text-sm font-base text-gray-500 group-hover:text-red-500">{reactionCount}</span>
                    </div>

                    {parseInt(auth.id) == parseInt(commentData.author.id) && (
                        <div className="flex justify-center items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Icons.dotsVertical className="fill-gray-500 w-5 h-5 cursor-pointer" />
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem 
                                        className="cursor-pointer"
                                        onSelect={() => setIsDeleteDialogOpen(true)}
                                    >
                                        Delete
                                    </DropdownMenuItem>

                                    <DropdownMenuItem 
                                        className="cursor-pointer"
                                        onSelect={() => setIsEditDialogOpen(true)} 
                                    >
                                        Edit post
                                    </DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DeleteCommentDialog 
                                commentId={commentData.id}
                                isOpen={isDeleteDialogOpen}
                                onClose={() => setIsDeleteDialogOpen(false)}
                                setCommentsData={setCommentsData}
                                commentsData={commentsData}
                            />

                            <EditCommentDialog
                                commentId={commentData.id}
                                prevContent={commentData.content}
                                isOpen={isEditDialogOpen}
                                setIsOpen={setIsEditDialogOpen}
                                onClose={() => setIsEditDialogOpen(false)}
                                setRefetch={setRefetch}
                            />
                        </div>
                    )}
                    
                </div>

            </div>

            
        </div>
    );
};

export default CommentRowView;
