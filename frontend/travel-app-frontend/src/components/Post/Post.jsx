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
import { useState, useEffect } from 'react';
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

function Post({postId, content, countryId, imageUrl, authorId, createdAt, lastUpdated, setAddNewPost, likes, hearts, className}) {
	const [user, setUser] = useState({});
    const [countryCode, setCountryCode] = useState("");

	const authHeader = useAuthHeader();
	const navigate = useNavigate();
    const auth = useAuthUser();
    const { toast } = useToast();

    useEffect(() => {
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

	}, [authorId]);

    useEffect(() => {
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
    }, [countryId]);


    const deleteOnClick = () => {
        

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
            <CardHeader className="flex flex-row pb-1">
                <Link to={`/profile/${user.id}`} className="flex flex-row">
                    <Avatar>
                        <AvatarImage src="https://picsum.photos/200/200" alt="stock img" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                
                    <div className="px-2 w-fit">
                        <CardTitle className="text-nowrap">{user.firstName} {user.lastName}</CardTitle>
                        <CardDescription className="text-nowrap">
                            <ReactTimeAgo timeStyle="round" date={createdAt} locale="en-US" className="text-sm text-gray-500"/>
                        </CardDescription>
                        
                    </div>
                </Link>

                <div className="w-full flex flex-row justify-end">
                    <img src={`https://flagsapi.com/${countryCode}/flat/64.png`} alt="" className="w-[40px] cursor-pointer" />
                    
                    {parseInt(user.id) == parseInt(auth.id) ? (
                        <>
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <><Icons.trashEmpty className="h-6 w-6 fill-gray-500 cursor-pointer hover:transition-all hover:fill-secondary"/></>
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
                                        <AlertDialogAction onClick={deleteOnClick} >Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </>
                    ) : null}
                </div>
            </CardHeader>

            <CardContent>
                {content}
                <Skeleton className="w-full h-[500px] mt-4" />
                {/* <img src="https://picsum.photos/600/600" alt="" className="w-full"/> */}
            </CardContent>
            
            <CardFooter className="flex justify-between">
                <Reaction  likes={likes} hearts={hearts} postId={postId} />
            </CardFooter>
        </Card>
    );
}

export default Post;
