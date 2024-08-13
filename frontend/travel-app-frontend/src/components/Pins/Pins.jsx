import React, { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Skeleton } from "@/components/ui/skeleton";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Icons } from "@/components/icons";
import PinDialog from "@/components/Pins/PinDialog";

function Pins() {
    const authHeader = useAuthHeader();
    const auth = useAuthUser();
    const { toast } = useToast();
    const navigate = useNavigate();

    const [pinsData, setPinsData] = useState(null);
    const [myPinsData, setMyPinsData] = useState(null);
	const [refetch, setRefetch] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPins = async () => {
            await setIsLoading(true);
            await fetchPins(0, 9);
            await fetchOnlyMyPins();
            await setRefetch(false);
            await setIsLoading(false);
        };

        loadPins();
        

    }, [refetch]);


    const fetchPins = async (pageNumber, pageSize) => {
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
			// console.log("Wykryto odświeżenie wszystkich pinów");
            setPinsData(data);
		})
		.catch(error => {
			console.log(error.message);
		});
	};

    const fetchOnlyMyPins = async () => {
        fetch(`http://localhost:5000/api/v1/pins/my/active`, {
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
            // console.log("Wykryto odświeżenie tylko moich pinów");

            setMyPinsData([data]);
            // console.log([data]);
            // console.log([[...pinsData], [data]]);
            // console.log({
            //     ...pinsData,
            //     content: data[0],
            //     totalElements: +pinsData.totalElements + 1,
            //     numberOfElements: +pinsData.numberOfElements + 1
            // });
            // console.log(pinsData);
		})
		.catch(error => {
			console.log(error.message);
		});
    };

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

                {(!isLoading && (myPinsData !== null)) && (myPinsData[0].length > 0) && 
                    <PinDialog
                        userPinsArray={myPinsData}
                        setRefetch={setRefetch}
                        refetch={refetch}
                    />
                }

                {(isLoading || pinsData == null) ? (
                    <>
                        <Skeleton className="w-[50px] h-[50px] rounded-full"/>
                        <Skeleton className="w-[50px] h-[50px] rounded-full"/>
                    </>

                ) : pinsData.content.map(userPinsArray => {
                    return (
                        <PinDialog
                            key={`userPin-${userPinsArray[Object.keys(userPinsArray)][0].id}`}
                            userPinsArray={userPinsArray}
                            setRefetch={setRefetch}
                            refetch={refetch}
                        />
                    );
                })}
            </CardContent>
        </Card>
    )
}

export default Pins
