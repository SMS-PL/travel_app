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
import { RefreshFriendshipContext } from '@/contexts/RefreshFriendshipContext';

const FriendshipRowView = ({user}) => {
    const authHeader = useAuthHeader();

    const [friendshipStatus, setFriendshipStatus] = useState("");
    const { globalRefreshFriendship, setGlobalRefreshFriendship } = useContext(RefreshFriendshipContext);

    useEffect(() => {
		getStatusOfFriendship();
        setGlobalRefreshFriendship(false);
	}, [globalRefreshFriendship]);

    const getStatusOfFriendship = () => {
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
            // console.log(data.message);
            setFriendshipStatus(data.message);
        })
        .catch(error => {
            console.log(error.message);
        });
    };

    return (
        <div className="w-full flex flex-row items-center hover:bg-secondary p-2 px-5 rounded-md hover:underline">
            <Avatar>
                <AvatarImage src={user.photoUrl} alt="stock img" className="object-cover bg-black" />
                <AvatarFallback>{`${user.firstName[0]}${user.lastName[0]}`}</AvatarFallback>
            </Avatar>
        
            <div className="px-2">
                <CardTitle className="text-sm ">{user.firstName} {user.lastName}</CardTitle>
            </div>

            <div>
                {friendshipStatus === "FRIEND" ? (
                    <Icons.userCheckFill className="h-5 w-5 fill-current" />
                ) : null }

                {friendshipStatus === "SENT" ? (
                    <Icons.envelopeCheckFill className="h-5 w-5 fill-current" />
                ) : null }

            </div>
        </div>
    );
};

export default FriendshipRowView;
