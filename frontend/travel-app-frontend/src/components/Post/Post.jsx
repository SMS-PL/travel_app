import React from 'react';
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
import { useState, useEffect, useRef } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import Reaction from "@/components/Reaction/Reaction";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Icons } from "@/components/icons";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ReactTimeAgo from 'react-time-ago';
import { useToast } from "@/components/ui/use-toast";
import CommentRowView from './../Comments/CommentRowView';
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import { cn } from './../../lib/utils';
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

function Post({postId, content, countryId, imageUrl, authorId, createdAt, lastUpdated, setAddNewPost, likes, hearts, className}) {
    const authHeader = useAuthHeader();
	const navigate = useNavigate();
    const auth = useAuthUser();
    const { toast } = useToast();
    
    const [user, setUser] = useState({});
    const [countryCode, setCountryCode] = useState("");

    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [commentsData, setCommentsData] = useState([[]]);
    const [refetchComments, setRefetchComments] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);
    const [refetch, setRefetch] = useState(false);

    const [friendshipStatus, setFriendshipStatus] = useState(null);

    const {
        register,
        handleSubmit,
        // watch,
        reset,
        formState: { errors, isValid },
    } = useForm();



    useEffect(() => {
        fetchComments();
        setRefetch(false);
        
	}, [currentPage, refetch]);

    

    useEffect(() => {
        fetchAuthorData();

	}, [authorId]);
    
    useEffect(() => {
		getStatusOfFriendship();
	}, [user]);

    useEffect(() => {
        fetchCountryData();
    }, [countryId]);

    const getStatusOfFriendship = () => {
        if(user.id !== undefined) {
            fetch(`http://localhost:5000/api/v1/friendship/status/${user.id}`, {
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
                console.log(data.message);
                setFriendshipStatus(data.message);
            })
            .catch(error => {
                console.log(error.message);
            });
        }
    };

    const fetchComments = async () => {
        setIsLoading(true);

        fetch(`http://localhost:5000/api/v1/comments/${postId}?pageSize=${pageSize}&pageNumber=${currentPage}&sortBy=datedesc`, {
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
            setTotalElements(data.totalElements);
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

    
    const fetchCountryData = () => {
        fetch(`http://localhost:5000/api/v1/countries/${countryId}`, {
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
            setCountryCode(data.iso);
        })
        .catch(error => {
            console.log(error.message);
        });
    };

    const fetchAuthorData = () => {
        fetch(`http://localhost:5000/api/v1/users/${authorId}`, {
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
            fetch(`http://localhost:5000/api/v1/comments/${postId}`, {
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
                setRefetch(true);
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

    // funkcja do usuwania postu
    const deletePostOnClick = () => {
        console.log("Authorization Header: ", authHeader); // Dodaj to logowanie

        fetch(`http://localhost:5000/api/v1/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', 
                "Authorization": authHeader,
            },
        })
        .then(response => {
            if (!response.ok) {
                console.log(response);
                throw new Error("Blad sieci!");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            toast({
                title: "Hurrah!",
                description: "Post deleted successfully!",
                className: "bg-green-800"
            })
            setAddNewPost(true);
        })
        .catch(error => {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Failed to delete post!",
                description: error.message,
            })
        });
    };

    return (
        <Card className="mt-5 w-full">
            {/* AUTOR POSTA */}
            <CardHeader className="flex flex-row pb-1 cursor-pointer">
                {/* <Link to={`/profile/${user.id}`} className="flex flex-row"> */}
                <HoverUserInfo userData={user} >
                    <div className="flex flex-row items-center justify-center">
                        <Avatar>
                            <AvatarImage src="https://picsum.photos/200/200" alt="stock img" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    
                        <div className="px-2 w-fit">
                            <CardTitle className="text-nowrap flex flex-row justify-center items-center gap-2">
                                <p>{user.firstName} {user.lastName}</p>

                                {friendshipStatus == "FRIEND" ? (
                                    <Icons.userCheckFill className="h-5 w-5 fill-lime-600" />
                                ) : null }

                            </CardTitle>
                            <CardDescription className="text-nowrap">
                                <ReactTimeAgo timeStyle="round" date={new Date(createdAt)} locale="en-US" className="text-sm text-gray-500"/>
                            </CardDescription>
                            
                        </div>
                    </div>
                </HoverUserInfo>
                {/* </Link> */}
                <div className="w-full flex flex-row justify-end">
                    <img src={`https://flagsapi.com/${countryCode}/flat/64.png`} alt="" className="w-[40px] cursor-pointer" />
                    
                    {parseInt(user.id) == parseInt(auth.id) ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Icons.dotsVertical className="fill-gray-500 w-5 h-5 cursor-pointer" />
                                </DropdownMenuTrigger>

                                <DropdownMenuContent>
                                    <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                                        <AlertDialog>
                                            <AlertDialogTrigger>
                                                Delete
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete the post from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction type="button" onClick={deletePostOnClick} >Continue</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                        </DropdownMenu>
                        </>
                    ) : null}
                </div>
            </CardHeader>
            

            {/* OPIS I ZDJĘCIE */}
            <CardContent>
                {content}
                <Skeleton className="w-full h-[500px] mt-4" />

                {/* przycisk do włączania/wyłączania komentarzy */}
                <div className="flex justify-between mt-5">
                    <Reaction likes={likes} hearts={hearts} postId={postId} />
                    <Button type="button" variant="secondary" onClick={() => {setIsCommentsOpen(!isCommentsOpen)}} className="flex flex-row items-center justify-center gap-2">
                        
                        {isCommentsOpen ?
                            <Icons.commentFill className="fill-current w-6 h-6" /> :
                            <Icons.commentEmpty className="fill-current w-6 h-6" /> 
                        }


                        {/* TUTAJ LICZNIK KOMENTARZY DODAĆ */}
                        {totalElements}
                    </Button>
                </div>
            </CardContent>
            

            {/* KOMENTARZE */}
            <CardFooter className="w-full flex flex-col">
                {isCommentsOpen ? (
                    <>
                        <Separator className="mt-2 mb-8" />

                        <form onSubmit={handleSubmit(addNewComment)} className="flex flex-row gap-3 w-full items-center mb-5">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="w-full">
                                <Textarea
                                    id="commentContent"
                                    placeholder="Type your comment here."
                                    className="resize-y"

                                    {...register("commentContent", {
                                        required: "Comment is required",
                                    })}

                                />
                                {errors.commentContent === "required" && (
                                    <p className="text-red-500 text-sm">Comment is required!</p>
                                )}
                            </div>

                            <Button type="submit" variant="ghost" className="" size="icon">
                                <Icons.sendMessageFill className="fill-primary w-5 h-5" />
                            </Button>
                        </form>
                            
                            {isLoading ? (
                                <div className="flex flex-row items-center gap-3 w-full my-3">
                                    <Skeleton className="h-10 w-10 rounded-full flex-none" />
                        
                                    <div className="flex flex-col items-start gap-2 w-full">
                                        <div className="flex flex-row items-center gap-3 w-full">
                                            <Skeleton className="w-[100px] h-[20px] flex-none" />
                                            <Skeleton className="max-w-full w-[50%] h-[20px]" />
                                        </div>
                                        
                                        <Skeleton className="w-[60px] h-[15px] flex-none" />
                                    </div>          
                                </div>


                            ) : (
                                commentsData.map((group, i) => (
                                    group.map((commentData, j) => 
                                        <CommentRowView 
                                            key={`commentView${postId}${i}${j}`}
                                            postId={postId}
                                            commentData={commentData}
                                            commentsData={commentsData}
                                            setCommentsData={setCommentsData}
                                            setRefetch={setRefetch}
                                        />
                                    )

                                ))
                            )}

                            {!isLastPage &&
                                <Button variant="ghost" onClick={() => {handleNextPage()}}>Load more...</Button>
                            } 

                    </>
                    
                ) : null}
            </CardFooter>

            <div>

            </div>
        </Card>
    );
}

export default Post;
