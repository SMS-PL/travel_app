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

const UserRowViewNotification = ({user, ...props}) => {

    return (
        <div className="w-full flex flex-row items-center hover:bg-secondary rounded-md p-1 hover:underline" {...props} >
            <Avatar>
                <AvatarImage src={user.profilePicture || "https://picsum.photos/200/200"} alt={`${user.firstName} ${user.lastName}`} />
                <AvatarFallback>{`${user.firstName[0]}${user.lastName[0]}`}</AvatarFallback>
            </Avatar>
        
            <div className="px-2">
                <CardTitle className="text-sm">{user.firstName} {user.lastName}</CardTitle>
            </div>



        </div>
    );
};

export default UserRowViewNotification;
