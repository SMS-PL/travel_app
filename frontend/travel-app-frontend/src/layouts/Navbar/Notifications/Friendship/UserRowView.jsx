import React, { useState, useEffect } from 'react';
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
import HoverUserInfo from "@/components/ui/HoverUserInfo";
import { Button } from "@/components/ui/button";


const UserRowView = ({user, setLocalRefetch, setGlobalRefreshFriendship, ...props}) => {
	const authHeader = useAuthHeader();

    const confirmFriendship = (user) => {
		fetch(`http://localhost:5000/api/v1/friendship/${user.id}`, {
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
			console.log(data);
			setLocalRefetch(true);
			setGlobalRefreshFriendship(true);
		})
		.catch(error => {
			console.log(error.message);
		});
	};

	const declineFriendship = (user) => {
		fetch(`http://localhost:5000/api/v1/friendship/${user.id}`, {
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
			console.log(data);
			setLocalRefetch(true);
			setGlobalRefreshFriendship(true);
		})
		.catch(error => {
			console.log(error.message);
		});
	};

    return (
        <div  className="flex flex-row items-center justify-between p-1 bg-secondary rounded-lg mb-2">
            <HoverUserInfo userData={user} className="flex w-full">
                <div className="w-full flex flex-row items-center hover:underline" {...props} >
                    <Avatar className="w-[45px] h-[45px]">
                        <AvatarImage 
                            src={user && user.photoUrl} 
                            alt={user && `${user.firstName} ${user.lastName}`}
                            className="object-cover bg-black"
                        />
                        <AvatarFallback>{user && `${user.firstName[0]}${user.lastName[0]}`}</AvatarFallback>
                    </Avatar>
                
                    <div className="px-2">
                        <CardTitle className="text-sm font-bold">{user.firstName} {user.lastName}</CardTitle>
                    </div>

                </div>
            </HoverUserInfo>

            <div className="flex flex-row justify-center items-center h-full">
                <Button variant="ghost" className="p-1" onClick={() => confirmFriendship(user)} >
                    <Icons.checked className="fill-current w-5 h-5 cursor-pointer hover:fill-primary" /> 
                </Button>

                <Button variant="ghost" className="p-1" onClick={() => declineFriendship(user)} >
                    <Icons.xmark className="fill-current w-5 h-5 cursor-pointer hover:fill-destructive" /> 
                </Button>

            </div>

        </div>
    );
};

export default UserRowView;

