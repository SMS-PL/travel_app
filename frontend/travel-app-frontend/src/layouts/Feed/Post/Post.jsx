import React, { useState, useEffect, useRef, useContext, Suspense } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import Reaction from "@/layouts/Feed/Post/Reaction";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Icons } from "@/components/icons";

import ReactTimeAgo from 'react-time-ago';
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
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
import { useImperativeHandle } from 'react';
import HoverUserInfo from "@/components/ui/HoverUserInfo";
import { RefreshFriendshipContext } from '@/contexts/RefreshFriendshipContext';
import HoverPopoverInputInfo from "@/components/ui/HoverPopoverInputInfo";
import EditPostDialog from "@/layouts/Feed/Post/EditPostDialog";
import DeletePostDialog from "@/layouts/Feed/Post/DeletePostDialog";
import CommentRowView from '@/layouts/Feed/Post/Comment/CommentRowView';
import EditCommentDialog from "@/layouts/Feed/Post/Comment/EditCommentDialog";
import SpinLoading from '@/components/ui/SpinLoading';

function Post({postData, setAddNewPost, setRefetchPosts, isCommentsOpenFeature = false}) {    
    const authHeader = useAuthHeader();
    const auth = useAuthUser();

    const navigate = useNavigate();
    const { toast } = useToast();

    const [user, setUser] = useState({});
    const [countryISO, setCountryISO] = useState(postData.countryIso3);
    const [countryName, setCountryName] = useState(postData.countryName);

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // komentarze
    const [isCommentsOpen, setIsCommentsOpen] = useState(isCommentsOpenFeature);
    const [commentsData, setCommentsData] = useState([[]]);
    const [refetchComments, setRefetchComments] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { globalRefreshFriendship, setGlobalRefreshFriendship } = useContext(RefreshFriendshipContext);
    // const [friendshipStatus, setFriendshipStatus] = useState(null);

    const [isImageLoading, setIsImageLoading] = useState(true);

    // paginacja komentarzy
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);

    console.log(postData);

    const {
        register,
        handleSubmit,
        // watch,
        reset,
        formState: { errors, isValid },
    } = useForm();

    useEffect(() => {
        if(isCommentsOpen) {
            fetchComments();
            setRefetchComments(false);
        }
	}, [currentPage, isCommentsOpen, refetchComments, postData]);

    
    useEffect(() => {
        fetchAuthorData();

	}, [postData.authorId]);
    
    // useEffect(() => {
	// 	getStatusOfFriendship();
    //     setGlobalRefreshFriendship(false);
	// }, [user, globalRefreshFriendship]);

    // useEffect(() => {
    //     fetchCountryData();
    // }, [postData.countryId]);

    // const getStatusOfFriendship = () => {
    //     if(user.id !== undefined && auth !== null) {
    //         fetch(`http://localhost:5000/api/v1/friendship/status/${auth && user.id}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json', 
    //                 "Authorization": authHeader,
    //             },
    //         })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Błąd sieci!');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             // console.log(data.message);
    //             setFriendshipStatus(data.message);
    //         })
    //         .catch(error => {
    //             console.log(error.message);
    //         });
    //     }
    // };

    const fetchComments = async () => {
        setIsLoading(true);

        fetch(`http://localhost:5000/api/v1/comments/${postData.id}?pageSize=${pageSize}&pageNumber=${currentPage}&sortBy=datedesc`, {
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
            setCommentsData(prevData => {
                if(data.first) {
                    return [data.content]
                }
                return [...prevData, data.content]
            });
            setTotalElements(data.totalElements);
            setTotalPages(data.totalPages);
            setIsLastPage(data.last);
            setIsLoading(false);

            // toast({
            //     title: "Hurrah!",
            //     description: "Fetch comments!",
            //     className: "bg-green-800"
            // })
		})
		.catch(error => {
			console.log(error.message);
		});
    };

    
    // const fetchCountryData = () => {
    //     if(postData.countryId > 0) {
    //         fetch(`http://localhost:5000/api/v1/countries/${postData.countryId}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json', 
    //                 "Authorization": authHeader,
    //             },
    //         })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Błąd sieci!');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setCountryISO(data.iso);
    //             setCountryName(data.nicename)
    //         })
    //         .catch(error => {
    //             console.log(error.message);
    //         });
    //     } else {
    //         setCountryISO(null);
    //     }
    // };

    const fetchAuthorData = () => {
        fetch(`http://localhost:5000/api/v1/users/${postData.authorId}`, {
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
			setUser(data);
		})
		.catch(error => {
			console.log(error.message);
			navigate("/");
		});
    };

    // edit content of POST
    // const editPost = (newContent) => {

    // };

 

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };
    
    const handleNextPage = () => {
        if (currentPage < (totalPages-1)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // funkcja do dodawania komentarza
    const addNewComment = async (values) => {
        if (isValid) {
            fetch(`http://localhost:5000/api/v1/comments/${postData.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    "Authorization": authHeader,
                },
                body: JSON.stringify({
                    "content": values.commentContent,
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Błąd sieci!');
                }
                return response.json();
            })
            .then(data => {
                toast({
                    title: "Hurrah!",
                    description: "Comment added correctly!",
                    className: "bg-green-800"
                })
                
                reset();
                setCommentsData(prevData => {
                    return [[data], ...commentsData]
                });
                setCurrentPage(0);
                setRefetchComments(true);
            })
            .catch(error => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.message,
                })
                console.log(error.message);
            });

        } else {
            alert("INVALID");
        }
    };


    return (
        <Card className="w-full">
            {/* AUTOR POSTA */}
            <CardHeader className="flex flex-row pb-1 justify-between">
                {/* <Link to={`/profile/${user.id}`} className="flex flex-row"> */}
                
                <HoverUserInfo userData={user} >
                    <div className="flex flex-row justify-center items-start">
                        <Avatar>
                            <AvatarImage src={user && user.photoUrl} alt="stock img" className="object-cover bg-black" />
                            <AvatarFallback>{user && `${String(user.firstName)[0]}${String(user.lastName)[0]}`}</AvatarFallback>
                        </Avatar>
                    
                        <div className="px-2 w-fit h-full">
                            {/* {postData.id} */}
                            <CardTitle className="flex-wrap flex flex-row justify-start items-center gap-2 hover:underline">
                                <p className="text-sm md:text-base">{user.firstName} {user.lastName}</p>

                                {user.friendStatus == "FRIEND" ? (
                                    <Icons.userCheckFill className="h-5 w-5 fill-lime-600" />
                                ) : null }

                            </CardTitle>
                            <CardDescription className="text-nowrap">
                                <ReactTimeAgo timeStyle="round" date={new Date(postData.createdAt)} locale="en-US" className="text-sm text-gray-500"/>
                            </CardDescription>
                            
                        </div>
                    </div>
                </HoverUserInfo>
                {/* </Link> */}
                <div className="flex flex-row justify-end items-center">
                    {countryISO === null ? (
                        <div className="w-[40px] h-[25px] bg-gray-700 flex justify-center items-center text-xl text-white font-bold rounded-[1px]">?</div>
                    ) :
                        <HoverPopoverInputInfo content={countryName} className="w-fit px-4 py-2 flex-wrap text-sm bg-primary text-white font-bold">
                            <img src={`https://flagsapi.com/${countryISO}/flat/64.png`} alt="" className="w-[40px] cursor-pointer" />
                        </HoverPopoverInputInfo>
                    }
                    
                    {auth && (parseInt(user.id) == parseInt(auth.id)) && (
                        <>
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

                            <DeletePostDialog 
                                postId={postData.id}
                                isOpen={isDeleteDialogOpen}
                                setIsOpen={setIsDeleteDialogOpen}
                                onClose={() => setIsDeleteDialogOpen(false)}
                                setRefetchPosts={setRefetchPosts}     
                            />

                            <EditPostDialog
                                postId={postData.id}
                                prevContent={postData.content}
                                isOpen={isEditDialogOpen}
                                setIsOpen={setIsEditDialogOpen}
                                onClose={() => setIsEditDialogOpen(false)}
                                setRefetchPosts={setRefetchPosts}
                            />
                        </>
                    )}
                </div>
            </CardHeader>
            
            {/* OPIS I ZDJĘCIE */}
            <CardContent className="break-all" >
                {postData.content}
                <Link to={`/post/${postData && postData.id}`} className="cursor-pointer">
                    <img 
                        src={postData.imageUrl} 
                        alt="" 
                        className={cn(isImageLoading ? "h-[400px] bg-secondary" : "h-fit max-h-[800px] bg-black", "w-full object-cover border-2 rounded-lg mt-4 ")} 
                        onLoad={() => setIsImageLoading(false)} 
                        loading="lazy" 
                    />
                </Link>

                {/* przycisk do włączania/wyłączania komentarzy */}
                <div className="flex justify-between h-fit mt-5">
                    <Reaction 
                        postId={postData.id}
                        likes={postData.likes}
                        hearts={postData.hearts}
                        liked={postData.liked}
                        hearted={postData.hearted}
                    />
                    
                    <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={() => {setIsCommentsOpen(!isCommentsOpen)}} 
                        className="hover:bg-transparent flex flex-row items-center justify-center gap-2 p-2 group"
                    >
                        {isCommentsOpen ?
                            <Icons.commentFill className="fill-primary w-5 h-5 group-hover:fill-primary" /> :
                            <Icons.commentEmpty className="fill-gray-500 w-5 h-5 group-hover:fill-primary" /> 
                        }
                        <span className="group-hover:text-primary">
                            {totalElements}
                        </span>
                    </Button>

                </div>
            </CardContent>
            

            {/* KOMENTARZE */}
            <CardFooter className="p-0">
                {isCommentsOpen ? (
                    <div className="w-full flex flex-col h-fit p-6 pt-0">
                        <Separator className="mt-0 mb-8" />

                        <form 
                            onSubmit={handleSubmit(addNewComment)} 
                            className="flex flex-row gap-3 w-full items-center pb-3 box-content relative"
                        >
                            <Avatar>
                                <AvatarImage src={auth && auth.photoUrl} alt="stock img" className="object-cover bg-black" />
                                <AvatarFallback>{`${auth && auth.firstName[0]}${auth && auth.lastName[0]}`}</AvatarFallback>
                            </Avatar>

                            <div className="absolute right-[-12px] top-[-25px] z-40">
                                <HoverPopoverInputInfo
                                    content={"The maximum length of the comment is 255 characters."}
                                />
                            </div>

                            <div className="w-full ">
                                <Textarea
                                    id="commentContent"
                                    placeholder="Type your comment here."
                                    className="resize-y bg-secondary border-0"

                                    {...register("commentContent", {
                                        required: "Comment is required",
                                        maxLength: {
                                            value: 255,
                                            message: "The maximum length of the comment is 255 characters",
                                        },
                                    })}

                                />
                                {errors.commentContent === "required" && (
                                    <p className="text-red-500 text-sm">Comment is required!</p>
                                )}
                            </div>

                            <Button type="submit" variant="ghost" className="p-0" size="icon" disabled={!isValid}>
                                <Icons.sendMessageFill className="fill-primary w-5 h-5" />
                            </Button>
                        </form>
                            
                            {(isLoading || (commentsData == [[]])) ? (
                                <SpinLoading className="w-full flex justify-center items-center py-2" />

                            ) : (
                                commentsData.map((group, i) => (
                                    group.map((commentData, j) => 
                                        <CommentRowView 
                                            key={`commentView${postData.id}${i}${j}`}
                                            commentId={commentData.id}
                                            commentData={commentData}
                                            commentsData={commentsData}
                                            setCommentsData={setCommentsData}
                                            setRefetch={setRefetchComments}
                                        />
                                    )
                                ))
                            )}

                            {(!isLoading && !isLastPage) &&
                                <Button 
                                    variant="link" 
                                    onClick={() => {handleNextPage()}}
                                >
                                    Load more...
                                </Button>
                            }
                    </div>
                    
                ) : null}
            </CardFooter>

        </Card>
    );
}

export default Post;
