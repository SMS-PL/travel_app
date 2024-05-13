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

    // póki co pobiera 
    const fetchPins = (pageNumber, pageSize) => {
        fetch(`http://localhost:5000/api/v1/pins/?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
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
			console.log(data);
            setPinsData(data);
		})
		.catch(error => {
			console.log(error.message);
		});
	}

    const onCreate = async () => {
        if (navigator.geolocation) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                const xCoordinate = position.coords.latitude;
                const yCoordinate = position.coords.longitude;
                
                const response = await fetch("http://localhost:5000/api/v1/pins/", {
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
                });
    
                if (!response.ok) {
                    throw new Error('Błąd sieci!');
                }
    
                const data = await response.json();
                console.log(data);
    
                setRefetch(true);
    
                toast({
                    title: "Hurrah!",
                    description: "Successfully add pin!",
                    className: "bg-green-800"
                });
            } catch (error) {
                console.log(error.message);
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.message,
                });
            }
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
                    <button onClick={onCreate} className="w-[50px] h-[50px] rounded-full bg-secondary flex border-dashed border-2 border-white justify-center items-center">
                        <Icons.plusEmpty className="h-3 w-3 fill-white" />
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

                ) : pinsData.content.map(pin => {
                    return (

                        <AlertDialog key={`userPin${pin.id}`} className="max-w-full w-[700px]">
                            <AlertDialogTrigger>
                                <div  className="flex flex-col justify-center items-center ">
                                    <div className="w-[50px] h-[50px] rounded-full bg-secondary flex justify-center items-center border-solid border-2 border-primary cursor-pointer">
                                    </div>

                                    <div className="mt-1 text-gray-500 text-sm flex flex-col text-center">
                                        <p>{pin.author.firstName}</p>
                                    </div>
                                </div>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="flex justify-between mb-3">
                                        <div>
                                            <p className="text-white font-bold text-md">{pin.author.firstName} {pin.author.lastName}</p>
                                            {/* <p className="text-sm text-gray-500">{pin.author.createdAt}</p> */}
                                            <ReactTimeAgo timeStyle="round" date={pin.createdAt} locale="en-US" className="text-sm text-gray-500"/>
                                        </div>
                                        <AlertDialogCancel>Close</AlertDialogCancel>
                                    </AlertDialogTitle>

                                    <AlertDialogDescription className="flex flex-col">
                                        <div className="w-full rounded-xl border bg-card text-card-foreground shadow">
                                            <img className="w-full rounded-md" src="https://lh3.googleusercontent.com/ILV2_Xm--SVih4MElRmFeu6k6YIdxD72ic7a3-qWJgGgDcyU_UzIPOTg8vEr4zjH5UhYlmFKpVV2ukBJOz_I_d24vlS96b2dE2873T53=rw-e365-w900" alt="" srcset="" />
                                        </div>
                                        <div className="w-full flex flex-col justify-center items-center mt-3">
                                            <p className="text-lg">{pin.city}, {pin.countryName}</p>
                                        </div>
                                        
                                        {/* This action cannot be undone. This will permanently delete the post from our servers. */}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                {/* <AlertDialogFooter>
                                    <AlertDialogAction>Continue</AlertDialogAction>
                                </AlertDialogFooter> */}

                            </AlertDialogContent>

                        </AlertDialog>


                    );
                })}

            </CardContent>
            {/* <CardFooter className="flex justify-between"></CardFooter> */}
        </Card>
    )
}

export default Pins
