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

const NotificationRowView = ({notification, ...props}) => {

    const [isLoading, setIsLoading] = useState(true);

    const [typeNotification, setTypeNotification] = useState(null);
    const [contentId, setContentId] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        setTypeNotification(notification.type);
        setContentId(notification.contentId);
        setData(notification.notifications);

        setIsLoading(false);

    }, [notification]);



     // komentarz pod MOIM POSTEM
        
    return (
        <div className="bg-secondary p-2 rounded-lg mb-2 w-full">
            {notification.notifications.slice().reverse().slice(0, 1).map((item, i) => (
                <RowView 
                    key={`notifications0${item.contentId}${i}`}
                    notification={item}
                />
            ))}
        </div>
    );
};

export default NotificationRowView;

const RowView = ({notification}) => {
    const authHeader = useAuthHeader();

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchAuthorData();

    }, [notification]);

    const fetchAuthorData = () => {
        fetch(`http://localhost:5000/api/v1/users/${notification.authorId}`, {
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
		});
    };

    return (
        <div className="w-full flex flex-row text-wrap justify-start items-center gap-3 mb-2 relative">

            <Avatar className="w-[45px] h-[45px]">
                <AvatarImage src={user && user.photoUrl} alt="stock img" className="object-cover bg-black" />
                <AvatarFallback>{user && `${String(user.firstName)[0]}${String(user.lastName)[0]}`}</AvatarFallback>
            </Avatar>

            {user && (notification.type == 0) && (
                <div className="text-wrap">
                    <span className="font-bold">
                        {`${user.firstName} ${user.lastName} `}
                    </span> 
                    commented your post!
                    <Icons.commentFill className="h-4 w-4 fill-white bg-green-600 rounded-full box-content p-[3px] absolute bottom-[-5px] left-[25px]" />

                </div>
            )}

            {user && (notification.type == 1) && (
                <div className="text-wrap">
                    <span className="font-bold">
                        {`${user.firstName} ${user.lastName} `}
                    </span> 
                    reacted to your post!
                    <Icons.likeFill className="h-4 w-4 fill-white bg-primary rounded-full box-content p-[3px] absolute bottom-[-5px] left-[25px]" />

                </div>
            )}


            {user && (notification.type == 2) && (
                <div className="text-wrap">
                    <span className="font-bold">
                        {`${user.firstName} ${user.lastName} `}
                    </span> 
                    reacted to your comment!
                    <Icons.heartFill className="h-4 w-4 fill-white bg-red-500 rounded-full box-content p-[3px] absolute bottom-[-5px] left-[25px]" />
                </div>
            )}

            
        </div>
    );

};


