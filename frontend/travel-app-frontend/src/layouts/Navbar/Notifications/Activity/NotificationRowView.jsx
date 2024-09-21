import React from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Icons } from "@/components/icons";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useState, useEffect } from 'react';

const NotificationRowView = ({notificationGroup, ...props}) => {
    const authHeader = useAuthHeader();

    const nullUser = "TravShare User";

    const [isLoading, setIsLoading] = useState(true);

    const [typeNotifications, setTypeNotifications] = useState(null);
    const [counterNotifications, setCounterNotifications] = useState(0);

    const [contentId, setContentId] = useState(null);
    const [postIdFromCommentId, setPostIdFromCommentId] = useState(null);

    const [notifications, setNotifications] = useState(null);

    const [user0, setUser0] = useState(null);
    const [user1, setUser1] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        setTypeNotifications(notificationGroup.type);
        setContentId(notificationGroup.contentId);
        setNotifications(notificationGroup.notifications);
        setCounterNotifications(notificationGroup.notifications.length);

        if(notificationGroup.notifications.length == 1) {
            fetchAuthorData(notificationGroup.notifications[0].authorId, 0);

        } else if(notificationGroup.notifications.length >= 2) {
            fetchAuthorData(notificationGroup.notifications[0].authorId, 0);
            fetchAuthorData(notificationGroup.notifications[1].authorId, 1);
        }
        if(notificationGroup.type == 2) {
            getPostIdFromCommentId(notificationGroup.contentId);
        }

        setIsLoading(false);

    }, [notificationGroup]);


    const fetchAuthorData = (authorId, index) => {
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
            if(index == 0) {
                setUser0(data);
            } else if(index == 1){
                setUser1(data);
            }
		})
		.catch(error => {
			console.log(error.message);
		});
    };

    const getPostIdFromCommentId = (commentId) => {
        fetch(`http://localhost:5000/api/v1/posts/comment/${commentId}`, {
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
            setPostIdFromCommentId(data.postId);
		})
		.catch(error => {
			console.log(error.message);
		});
    };


    if(typeNotifications == 0) {

        if(counterNotifications == 1) {
            return (
                <Link to={`/post/${contentId && contentId}`} className="cursor-pointer">
                    <div className="bg-secondary p-2 rounded-lg mb-2 w-full flex flex-row justify-start items-center gap-2 relative">
                        <Avatar className="w-[45px] h-[45px] relative">
                            <AvatarImage src={user0 && user0.photoUrl} alt="stock img" className="object-cover bg-black" />
                            <AvatarFallback>
                                {user0 && `${String(user0.firstName)[0]}${String(user0.lastName)[0]}`}
                            </AvatarFallback>
                            <Icons.commentFill className="h-4 w-4 fill-white bg-green-600 rounded-full box-content p-[3px] absolute bottom-[0px] right-[10px]" />
                        </Avatar>
                        <div>
                            <span className="font-bold">
                                {user0 === null && nullUser}
                                {user0 && user0.firstName} {user0 && user0.lastName}
                            </span>
                            {` commented your post!`}
                        </div>
                    </div>
                </Link>
            );
        } else if(counterNotifications == 2) {
            return (
                <Link to={`/post/${contentId && contentId}`} className="cursor-pointer">
                    <div className="bg-secondary p-2 rounded-lg mb-2 w-full flex flex-row justify-start items-center gap-2 relative">
                        <Avatar className="w-[45px] h-[45px] relative">
                            <AvatarImage src={user0 && user0.photoUrl} alt="stock img" className="object-cover bg-black" />
                            <AvatarFallback>{user0 && `${String(user0.firstName)[0]}${String(user0.lastName)[0]}`}</AvatarFallback>
                            <Icons.commentFill className="h-4 w-4 fill-white bg-green-600 rounded-full box-content p-[3px] absolute bottom-[0px] right-[10px]" />
                        </Avatar>
                        <div>
                            <span className="font-bold">
                                {user0 === null && nullUser}
                                {user0 && user0.firstName} {user0 && user0.lastName}
                            </span>
                            {` and `}
                            <span className="font-bold">
                                {user1 === null && nullUser}
                                {user1 && user1.firstName} {user1 && user1.lastName}
                            </span>
                            {` commented your post!`}
                        </div>
                    </div>
                </Link>
            );
        } else if(counterNotifications > 2) {
            return (
                <Link to={`/post/${contentId && contentId}`} className="cursor-pointer">
                    <div className="bg-secondary p-2 rounded-lg mb-2 w-full flex flex-row justify-start items-center gap-2 relative">
                        <Avatar className="w-[45px] h-[45px] relative flex flex-row justify-start items-start">
                            <AvatarImage src={user0 && user0.photoUrl} alt="stock img" className="object-cover bg-black" />
                            <AvatarFallback>{user0 && `${String(user0.firstName)[0]}${String(user0.lastName)[0]}`}</AvatarFallback>
                            <Icons.commentFill className="h-4 w-4 fill-white bg-green-600 rounded-full box-content p-[3px] absolute bottom-[0px] right-[10px]" />
                        </Avatar>
                        <div>
                            <span className="font-bold">
                                {user0 === null && nullUser}
                                {user0 && user0.firstName} {user0 && user0.lastName}
                            </span>
                            {` and `}
                            <span className="font-bold">
                                {user1 === null && nullUser}
                                {user1 && user1.firstName} {user1 && user1.lastName}
                            </span>
                            {` and others commented your post!`}
                        </div>
                    </div>
                </Link>
            );
        }

    } else if(typeNotifications == 1) {


        if(counterNotifications == 1) {
            return (
                <Link to={`/post/${contentId && contentId}`} className="cursor-pointer">
                    <div className="bg-secondary p-2 rounded-lg mb-2 w-full flex flex-row justify-start items-center gap-2 relative">
                        <Avatar className="w-[45px] h-[45px] relative">
                            <AvatarImage src={user0 && user0.photoUrl} alt="stock img" className="object-cover bg-black" />
                            <AvatarFallback>{user0 && `${String(user0.firstName)[0]}${String(user0.lastName)[0]}`}</AvatarFallback>
                            <Icons.likeFill className="h-4 w-4 fill-white bg-primary rounded-full box-content p-[3px] absolute bottom-[0px] right-[10px]" />
                        </Avatar>
                        <div>
                            <span className="font-bold">
                                {user0 === null && nullUser}
                                {user0 && user0.firstName} {user0 && user0.lastName}
                            </span>
                            {` reacted to your post!`}
                        </div>
                    </div>
                </Link>
            );
        } else if(counterNotifications == 2) {
            return (
                <Link to={`/post/${contentId && contentId}`} className="cursor-pointer">
                    <div className="bg-secondary p-2 rounded-lg mb-2 w-full flex flex-row justify-start items-center gap-2 relative">
                        <Avatar className="w-[45px] h-[45px] relative">
                            <AvatarImage src={user0 && user0.photoUrl} alt="stock img" className="object-cover bg-black" />
                            <AvatarFallback>{user0 && `${String(user0.firstName)[0]}${String(user0.lastName)[0]}`}</AvatarFallback>
                            <Icons.likeFill className="h-4 w-4 fill-white bg-primary rounded-full box-content p-[3px] absolute bottom-[0px] right-[10px]" />
                        </Avatar>
                        <div>
                            <span className="font-bold">
                                {user0 === null && nullUser}
                                {user0 && user0.firstName} {user0 && user0.lastName}
                            </span>
                            {` and `}
                            <span className="font-bold">
                                {user1 === null && nullUser}
                                {user1 && user1.firstName} {user1 && user1.lastName}
                            </span>
                            {` reacted to your post!`}
                        </div>
                    </div>
                </Link>
            );
        } else if(counterNotifications > 2) {
            return (
                <Link to={`/post/${contentId && contentId}`} className="cursor-pointer">
                    <div className="bg-secondary p-2 rounded-lg mb-2 w-full flex flex-row justify-start items-center gap-2">
                        <Avatar className="w-[45px] h-[45px] relative">
                            <AvatarImage src={user0 && user0.photoUrl} alt="stock img" className="object-cover bg-black" />
                            <AvatarFallback>{user0 && `${String(user0.firstName)[0]}${String(user0.lastName)[0]}`}</AvatarFallback>
                            <Icons.likeFill className="h-4 w-4 fill-white bg-primary rounded-full box-content p-[3px] absolute bottom-[0px] right-[10px]" />
                        </Avatar>
                        <div>
                            <span className="font-bold">
                                {user0 === null && nullUser}
                                {user0 && user0.firstName} {user0 && user0.lastName}
                            </span>
                            {` and `}
                            <span className="font-bold">
                                {user1 === null && nullUser}
                                {user1 && user1.firstName} {user1 && user1.lastName}
                            </span>
                            {` and others reacted to your post!`}
                        </div>
                    </div>
                </Link>
            );
        }

    } else if(typeNotifications == 2) {


        if(counterNotifications == 1) {
            return (
                <Link to={`/post/${postIdFromCommentId && postIdFromCommentId}`} className="cursor-pointer">
                    <div className="bg-secondary p-2 rounded-lg mb-2 w-full flex flex-row justify-start items-center gap-2 relative">
                        <Avatar className="w-[45px] h-[45px] relative">
                            <AvatarImage src={user0 && user0.photoUrl} alt="stock img" className="object-cover bg-black" />
                            <AvatarFallback>{user0 && `${String(user0.firstName)[0]}${String(user0.lastName)[0]}`}</AvatarFallback>
                            <Icons.heartFill className="h-4 w-4 fill-white bg-red-500 rounded-full box-content p-[3px] absolute bottom-[0px] right-[10px]" />
                        </Avatar>
                        <div>
                            <span className="font-bold">
                                {user0 === null && nullUser}
                                {user0 && user0.firstName} {user0 && user0.lastName}
                            </span>
                            {` reacted to your comment!`}
                        </div>
                    </div>
                </Link>
            );
        } else if(counterNotifications == 2) {
            return (
                <Link to={`/post/${postIdFromCommentId && postIdFromCommentId}`} className="cursor-pointer">
                    <div className="bg-secondary p-2 rounded-lg mb-2 w-full flex flex-row justify-start items-center gap-2 relative">
                        <Avatar className="w-[45px] h-[45px] relative">
                            <AvatarImage src={user0 && user0.photoUrl} alt="stock img" className="object-cover bg-black" />
                            <AvatarFallback>{user0 && `${String(user0.firstName)[0]}${String(user0.lastName)[0]}`}</AvatarFallback>
                            <Icons.heartFill className="h-4 w-4 fill-white bg-red-500 rounded-full box-content p-[3px] absolute bottom-[0px] right-[10px]" />
                        </Avatar>
                        <div>
                            <span className="font-bold">
                                {user0 === null && nullUser}
                                {user0 && user0.firstName} {user0 && user0.lastName}
                            </span>
                            {` and `}
                            <span className="font-bold">
                                {user1 === null && nullUser}
                                {user1 && user1.firstName} {user1 && user1.lastName}
                            </span>
                            {` reacted to your comment!`}
                        </div>
                    </div>
                </Link>
            );
        } else if(counterNotifications > 2) {
            return (
                <Link to={`/post/${postIdFromCommentId && postIdFromCommentId}`} className="cursor-pointer">
                    <div className="bg-secondary p-2 rounded-lg mb-2 w-full flex flex-row justify-start items-center gap-2 relative">
                        <Avatar className="w-[45px] h-[45px] relative">
                            <AvatarImage src={user0 && user0.photoUrl} alt="stock img" className="object-cover bg-black" />
                            <AvatarFallback>{user0 && `${String(user0.firstName)[0]}${String(user0.lastName)[0]}`}</AvatarFallback>
                            <Icons.heartFill className="h-4 w-4 fill-white bg-red-500 rounded-full box-content p-[3px] absolute bottom-[0px] right-[10px]" />
                        </Avatar>
                        <div>
                            <span className="font-bold">
                                {user0 === null && nullUser}
                                {user0 && user0.firstName} {user0 && user0.lastName}
                            </span>
                            {` and `}
                            <span className="font-bold">
                                {user1 === null && nullUser}
                                {user1 && user1.firstName} {user1 && user1.lastName}
                            </span>
                            {` and others reacted to your comment!`}
                        </div>
                    </div>
                </Link>
            );
        }

    } else {
        return null;
    }
};

export default NotificationRowView;
