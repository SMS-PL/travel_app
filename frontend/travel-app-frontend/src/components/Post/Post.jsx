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

function Post({id, content, countryId, imageUrl, authorId, createdAt, lastUpdated, className}) {
	const [user, setUser] = useState({});
    const [countryCode, setCountryCode] = useState("");

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
    }, [countryId])

    return (
        <Card className="mt-5 w-full">
            <CardHeader className="flex flex-row">
                <Link to={`/profile/${user.id}`} className="flex flex-row">
                    <Avatar>
                        <AvatarImage src="https://picsum.photos/200/200" alt="stock img" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                
                    <div className="px-2 w-fit">
                        <CardTitle>{user.firstName} {user.lastName}</CardTitle>
                        <CardDescription className="text-nowrap">{createdAt}</CardDescription>
                    </div>
                </Link>

                <div className="w-full flex flex-row justify-end">
                    <img src={`https://flagsapi.com/${countryCode}/flat/64.png`} alt="" className="w-[40px] cursor-pointer" />
                </div>
            </CardHeader>

            <CardContent>
                {content}
                <Skeleton className="w-full h-[500px] mt-2" />
                {/* <img src="https://picsum.photos/600/600" alt="" className="w-full"/> */}
            </CardContent>
            
            <CardFooter className="flex justify-between">
                <Button variant="outline">Likes</Button>
                <Button variant="outline">Comments</Button>
            </CardFooter>
        </Card>
    );
}

export default Post;
