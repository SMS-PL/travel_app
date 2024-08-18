import React, { useState, useEffect, useContext } from 'react';
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
import FriendshipButton from '@/components/FriendshipsButton/FriendshipButton';

const FriendsListRowView = ({user, setOpen, ...props}) => {
	const authHeader = useAuthHeader();

    

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
			// setLocalRefetch(true);
			// setGlobalRefreshFriendship(true);
		})
		.catch(error => {
			console.log(error.message);
		});
	};

    return (
        <div className="p-2 w-full flex flex-row items-center justify-between hover:bg-secondary rounded-md hover:underline" {...props} >
            <Link to={`/profile/${user.id}`} onClick={() => setOpen(false)} className="flex flex-row justify-center items-center cursor-pointer">
                <Avatar className="w-[45px] h-[45px]">
                    <AvatarImage 
                        src={user && user.photoUrl} 
                        alt={user && `${user.firstName} ${user.lastName}`}
                        className="object-cover bg-black"
                    />
                    <AvatarFallback>{user && `${user.firstName[0]}${user.lastName[0]}`}</AvatarFallback>
                </Avatar>
            
                <div className="px-2">
                    <CardTitle className="text-base">{user.firstName} {user.lastName}</CardTitle>
                </div>
            </Link>
            <FriendshipButton userId={user.id} />
            {/* <Icons.trashEmpty className="fill-current w-[25px] h-[25px]" />  */}

        </div>
    );
};

export default FriendsListRowView;
