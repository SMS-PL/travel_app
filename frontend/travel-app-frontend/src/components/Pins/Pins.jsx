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
import HoverPopoverInputInfo from "@/components/Register/HoverPopoverInputInfo";
import { cn } from "@/lib/utils";

function Pins() {
    const authHeader = useAuthHeader();
    const auth = useAuthUser();
    const { toast } = useToast();
    const navigate = useNavigate();

    const [pinsData, setPinsData] = useState(null);
    const [myPinsData, setMyPinsData] = useState(null);
	const [refetch, setRefetch] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

    const [creatingAnimation, setCreatingAnimation] = useState(false);


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

            setCreatingAnimation(true);

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
                setCreatingAnimation(false);

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
        <Card className="w-full mb-5 ">
            <CardHeader className="flex flex-row justify-center items-center p-3 relative">
                <h3 className="text-center scroll-m-20 text-md tracking-tight m-0 font-semibold">
                    Tell us <span className="text-primary font-extrabold">where</span> are you?
                </h3>

                <div className="absolute right-2 top-0">
                    <HoverPopoverInputInfo 
                        content={"Pins are reports of the user's location, confirmed by the location module, and displayed for 24 hours. By using pins, the user unlocks the visited country."}
                    />
                </div>

            </CardHeader>

            <CardContent className="flex flex-row gap-4 justify-center items-start">
                <div className="flex flex-col justify-center items-center">
                    <div onClick={onCreate} className="w-[50px] h-[50px] rounded-full bg-secondary flex border-dashed border-2 border-current justify-center items-center cursor-pointer">
                        <Icons.plusEmpty className={cn(creatingAnimation ? "hidden" : "block", "h-3 w-3 fill-current")} />
                        <svg className={cn(creatingAnimation ? "block" : "hidden", "w-5 h-5 text-current animate-spin fill-primary")}  viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="primary"/></svg>                   
                    </div>
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
                        {/* <Skeleton className="w-[50px] h-[50px] rounded-full"/> */}
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
