import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Skeleton } from "@/components/ui/skeleton";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Icons } from "@/components/icons";
import { useState, useEffect } from 'react';
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
import PinDialog from "../ui/PinDialog";

function Pins() {
    const authHeader = useAuthHeader();
    const auth = useAuthUser();
    const { toast } = useToast();
    const navigate = useNavigate();

    const [pinsData, setPinsData] = useState(null);
	const [refetch, setRefetch] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {
        setIsLoading(true);

        fetchPins(0, 9);
        setRefetch(false);

        setIsLoading(false);
    }, [refetch]);


    const fetchPins = (pageNumber, pageSize) => {
        fetch(`http://localhost:5000/api/v1/pins/friends?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
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
			// console.log(data);
            setPinsData(data);
		})
		.catch(error => {
			console.log(error.message);
		});
	}

    const onCreate = async () => {
        if (navigator.geolocation) {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const xCoordinate = position.coords.latitude;
            const yCoordinate = position.coords.longitude;

            fetch("http://localhost:5000/api/v1/pins/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    "Authorization": authHeader,
                },
                body: JSON.stringify({
                    "localization": {
                        "x": xCoordinate,
                        "y": yCoordinate
                    }
                }),
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(JSON.stringify(err));
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setRefetch(true);
    
                toast({
                    title: "Hurrah!",
                    description: "Successfully add pin!",
                    className: "bg-green-800"
                });
            })
            .catch(error => {
                console.log(error);
                const errorMessage = JSON.parse(error.message);
    
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: errorMessage.message,
                })
            });
            
        } else {
            console.log("Nie uzyskano lokalizacji!");
        }
    };


    return (
        <Card className="w-full">
            <CardHeader className="flex flex-col p-3">
                <h3 className="text-center scroll-m-20 text-md tracking-tight m-0 font-semibold">
                    Tell us <span className="text-primary font-extrabold">where</span> are you?
                </h3>
            </CardHeader>

            <CardContent className="flex flex-row gap-4 justify-center items-start">
                <div className="flex flex-col justify-center items-center">
                    <button onClick={onCreate} className="w-[50px] h-[50px] rounded-full bg-secondary flex border-dashed border-2 border-current justify-center items-center">
                        <Icons.plusEmpty className="h-3 w-3 fill-current" />
                    </button>
                    <p className="mt-1 text-gray-500 text-sm">Check-in</p>
                </div>

                {(isLoading || !pinsData) ? (
                    <>
                        <Skeleton className="w-[50px] h-[50px] rounded-full"/>
                        <Skeleton className="w-[50px] h-[50px] rounded-full"/>
                        <Skeleton className="w-[50px] h-[50px] rounded-full"/>
                        <Skeleton className="w-[50px] h-[50px] rounded-full"/>
                        <Skeleton className="w-[50px] h-[50px] rounded-full"/>
                        <Skeleton className="w-[50px] h-[50px] rounded-full"/>
                    </>

                ) : pinsData.content.map(userPinsArray => {
                    return (
                        <PinDialog
                            key={`userPin-${userPinsArray[Object.keys(userPinsArray)][0].id}`}
                            userPinsArray={userPinsArray}
                            setRefetch={setRefetch}
                        />
                    );
                })}

            </CardContent>
        </Card>
    )
}

export default Pins
