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

function Post({id, content, countryId, imageUrl, authorId, createdAt, lastUpdated, className}) {
	const [user, setUser] = useState({});
	const authHeader = useAuthHeader();
	const navigate = useNavigate();

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

    return (
        <Card className={className}>
            <CardHeader className="flex flex-row">
                
                <Avatar>
                    <AvatarImage src="https://picsum.photos/200/200" alt="stock img" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                
                <div className="px-2">
                    <CardTitle>{user.firstName} {user.lastName}</CardTitle>
                    <CardDescription>{createdAt}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                {content}
                <img src="https://picsum.photos/600/600" alt="" className="w-full"/>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Likes</Button>
                <Button variant="outline">Comments</Button>
            </CardFooter>
        </Card>
    );
}

export default Post;
