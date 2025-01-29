import React, { useState, useEffect, useContext } from 'react';
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
import HoverPopoverInputInfo from "@/components/ui/HoverPopoverInputInfo";
import { cn } from "@/lib/utils";
import { RefreshFriendshipContext } from '@/contexts/RefreshFriendshipContext';
import SpinLoading from '@/components/ui/SpinLoading';
import { Button } from '@/components/ui/button';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@radix-ui/react-icons";

function Pins() {
    const authHeader = useAuthHeader();
    const { toast } = useToast();

    const { globalRefreshFriendship, setGlobalRefreshFriendship } = useContext(RefreshFriendshipContext);
	const [localRefetch, setLocalRefetch] = useState(false);

    const [pinsData, setPinsData] = useState(null);
    const [myPinsData, setMyPinsData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

    const [creatingAnimation, setCreatingAnimation] = useState(false);

    // paginacja
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(4);
    const [totalPages, setTotalPages] = useState(0);
    const [refetchData, setRefetchData] = useState(false);

    useEffect(() => {
        // pobranie z serwera danych 
        // o meldunkach zalogowanego użytkownika
        const loadMyPins = async () => {
            await setIsLoading(true);
            await fetchOnlyMyPins();
            await setLocalRefetch(false);
            await setIsLoading(false);
        };
        loadMyPins();
    }, [localRefetch]);

    useEffect(() => {
        // pobranie z serwera danych
        // o meldunkach znajomych
        const loadFriendsPins = async () => {
            await setIsLoading(true);
            await fetchPins();
            await setRefetchData(false);
            await setIsLoading(false);
        };
        loadFriendsPins();
    }, [refetchData]);


    const fetchPins = async () => {
        fetch(`http://localhost:5000/api/v1/pins/friends?pageNumber=${currentPage}&pageSize=${pageSize}`, {
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
            setTotalPages(data.totalPages);
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
        try {
            // Sprawdzenie działania modułu geolokalizacyjnego
            if (!navigator.geolocation) {
                toast({
                    variant: "destructive",
                    title: "Geolocation not supported",
                    description: "Your browser does not support geolocation.",
                });
                return;
            }
    
            // Pobranie lokalizacji
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
    
            const xCoordinate = position.coords.latitude;
            const yCoordinate = position.coords.longitude;
    
            setCreatingAnimation(true); // Włączenie animacji dodawania meldunku
    
            // Wysyłanie żądania do API z obsługą błędów
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
                const errorData = await response.json();
                throw new Error(JSON.stringify(errorData));
            }

            setLocalRefetch(true); // Ponowne pobranie meldunków użytkownika
            setCreatingAnimation(false); // Wyłączenie animacji dodawania meldunku
    
            toast({
                title: "Hurrah!",
                description: "Successfully added pin!",
                className: "bg-green-800 text-white"
            });
    
        } catch (error) {
            // Obsługa błędów
            let errorMessage = "Unknown error occurred.";
            if (error.message.startsWith("Geolocation")) {
                errorMessage = error.message.replace("Geolocation error: ", "");
            } else if (error.message) {
                try {
                    const parsedError = JSON.parse(error.message);
                    errorMessage = parsedError.message || errorMessage;
                } catch {
                    errorMessage = error.message;
                }
            }
    
            setCreatingAnimation(false); // Wyłączenie animacji dodawania meldunku
    
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: errorMessage,
            });
        }
    };
    

    const nextPage = () => {
        if(currentPage < (totalPages-1)) {
            setPinsData(null);
            setIsLoading(true);
            setCurrentPage(prev => prev + 1);
            setRefetchData(true);
        }
    }

    const prevPage = () => {
        if(currentPage > 0) {
            setPinsData(null);
            setIsLoading(true);
            setCurrentPage(prev => prev - 1);
            setRefetchData(true);
        }
    }


    return (
        <Card className="w-full mb-5">
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

            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center items-center ">

                {/* add pin i piny użytkownika */}
                <div className="flex flex-row gap-2 sm:gap-4">
                    <div className="flex flex-col justify-center items-center w-full">
                        <div onClick={onCreate} className="w-[50px] h-[50px] rounded-full bg-secondary flex border-dashed border-2 border-current justify-center items-center cursor-pointer">
                            <Icons.plusEmpty className={cn(creatingAnimation ? "hidden" : "block", "h-3 w-3 fill-current")} />
                            <svg className={cn(creatingAnimation ? "block" : "hidden", "w-5 h-5 text-current animate-spin fill-primary")}  viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="primary"/></svg>                   
                        </div>
                        <p className="mt-1 text-gray-500 text-sm text-nowrap">Check-in</p>
                    </div>
                    

                    {(!isLoading && (myPinsData !== null)) && (myPinsData[0].length > 0) && 
                        <PinDialog
                            userPinsArray={myPinsData}
                            setRefetch={setLocalRefetch}
                            refetch={localRefetch}
                        />
                    }

                    {(isLoading || (pinsData == null)) && <SpinLoading className="flex justify-center items-center" /> }
                </div>
                
                {/* piny znajomych */}
                {!isLoading && pinsData && (pinsData.content.length != 0) && (
                    <div className="flex flex-row gap-2 bg-secondary p-3 rounded-2xl justify-center items-center h-full w-fit">
                        <div onClick={() => prevPage()} className="w-fit hover:bg-background/40 rounded-full">
                            <ChevronLeftIcon className={cn("h-6 w-6 cursor-pointer rounded-md", currentPage == 0 && "hidden")} />
                        </div>

                        <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 w-full flex-wrap">
                            {pinsData && pinsData.content.map(userPinsArray => {
                                return (
                                    <PinDialog
                                        key={`userPin-${userPinsArray[Object.keys(userPinsArray)][0].id}`}
                                        userPinsArray={userPinsArray}
                                        setRefetch={setGlobalRefreshFriendship}
                                        refetch={globalRefreshFriendship}
                                    />
                                );
                            })}
                        </div>

                        <div onClick={() => nextPage()} className="w-fit hover:bg-background/40 rounded-full">
                            <ChevronRightIcon className={cn("h-6 w-6 cursor-pointer rounded-md", currentPage == (totalPages-1) && "hidden")} />
                        </div>
                    </div>
                )}

            </CardContent>
        </Card>
    )
}

export default Pins
