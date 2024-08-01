import React from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import ReactTimeAgo from 'react-time-ago';
import { useState, useEffect } from 'react';
import { cn } from './../../lib/utils';
import {
    Cross1Icon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DotsHorizontalIcon
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import MapComponent from "@/components/MapComponent/MapComponent";
import PinSettingsButton from "@/components/ui/PinSettingsButton";
import { Icons } from "@/components/icons";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const PinDialog = ({userPinsArray, refetch, setRefetch}) => {
    const auth = useAuthUser();

    const [howMuchPins, setHowMuchPins] = useState(0);

    const [currentPinIndex, setCurrentPinIndex] = useState(0);

    useEffect(() => {
        setHowMuchPins(+userPinsArray[Object.keys(userPinsArray)].length)
    }, [refetch, userPinsArray]);


    const nextPin = () => {
        if(currentPinIndex < (howMuchPins-1)) {
            setCurrentPinIndex(currentPinIndex + 1);
        } else if(currentPinIndex === (howMuchPins-1)) {
            setCurrentPinIndex(0);
        }
    }

    const prevPin = () => {
        if(currentPinIndex > 0) {
            setCurrentPinIndex(currentPinIndex - 1);
        } else if(currentPinIndex === 0) {
            setCurrentPinIndex(howMuchPins-1);
        }
    }


    return (
        <Dialog key={`userPin-${userPinsArray[Object.keys(userPinsArray)][0].id}`} > 
            <DialogTrigger>
                <div  className="flex flex-col justify-center items-center ">
                    <div className="w-[50px] h-[50px] rounded-full bg-secondary flex justify-center items-center border-solid border-2 border-primary cursor-pointer">
                    </div>

                    <div className="mt-1 text-gray-500 text-sm flex flex-col text-center">
                        <p>{userPinsArray[Object.keys(userPinsArray)][currentPinIndex].author.firstName}</p>
                    </div>
                </div>
            </DialogTrigger>

            <DialogContent className="flex flex-col justify-center items-center max-w-full w-[800px]">
  
                {/* PASECZKI NA GÓRZE */}
                <div className={cn(" grid-flow-col grid gap-2 mt-5 w-full h-1", howMuchPins > 0 ? `grid-cols-${howMuchPins}` : null)}>
                    {Array.from({ length: howMuchPins }).map((_, i) => (
                        <div key={`howMuchPins-${i}`} className={cn(`h-full rounded-lg`, currentPinIndex === i ? "bg-primary" : "bg-secondary")}>
                        </div>
                    ))}
                </div>

                {/* ZDJECIE IMIE NAZWISKO CZAS CLOSE */}
                <div className="flex flex-row justify-between items-center w-full">
                        {/* <p>{userPinsArray[Object.keys(userPinsArray)][0].author.firstName}</p> */}
                    <div className="flex flex-row justify-center items-center gap-3 text-nowrap w-fit">
                        <div className="w-[50px] h-[50px] rounded-full bg-secondary border-solid border-2 border-primary">
                        </div>

                        <p className="text-white font-bold text-md flex justify-center items-center h-full">
                            {userPinsArray[Object.keys(userPinsArray)][currentPinIndex].author.firstName} {userPinsArray[Object.keys(userPinsArray)][currentPinIndex].author.lastName}
                        </p>

                        <div className="flex justify-center items-center w-fit h-full">
                            <ReactTimeAgo timeStyle="round" date={new Date(userPinsArray[Object.keys(userPinsArray)][currentPinIndex].createdAt)} locale="en-US" className="text-sm text-gray-500"/>
                            {/* {console.log(typeof new Date(userPinsArray[Object.keys(userPinsArray)][currentPinIndex].createdAt))} */}
                        </div>
                    </div>

                    <div className="w-full flex justify-end items-center">
                        {auth.id == userPinsArray[Object.keys(userPinsArray)][currentPinIndex].author.id &&
                            <PinSettingsButton 
                                pinId={userPinsArray[Object.keys(userPinsArray)][currentPinIndex].id}
                                userId={userPinsArray[Object.keys(userPinsArray)][currentPinIndex].author.id}
                                setRefetch={setRefetch}
                                setCurrentPinIndex={setCurrentPinIndex}
                            />
                        }
                        {/* <AlertDialogCancel className="p-3 rounded-full"><Cross1Icon /></AlertDialogCancel> */}

                    </div>
                </div>

                {/* STRZAŁKI MAPA */}
                <div className="flex flex-row justify-center items-center">
                    <Button 
                        variant="ghost" 
                        className="p-2"
                        onClick={() => prevPin()}
                    >
                        <ChevronLeftIcon className="h-6 w-6 cursor-pointer hover:bg-secondary rounded-md" />
                    </Button>

                    <div className="w-full rounded-xl border bg-card text-card-foreground shadow">
                        {/* <img className="w-full rounded-md" src="https://lh3.googleusercontent.com/ILV2_Xm--SVih4MElRmFeu6k6YIdxD72ic7a3-qWJgGgDcyU_UzIPOTg8vEr4zjH5UhYlmFKpVV2ukBJOz_I_d24vlS96b2dE2873T53=rw-e365-w900" alt="" srcset="" /> */}
                        <MapComponent 
                            lat={userPinsArray[Object.keys(userPinsArray)][currentPinIndex].localization.x}
                            lng={userPinsArray[Object.keys(userPinsArray)][currentPinIndex].localization.y}
                        />
                    </div>
                    
                    <Button 
                        variant="ghost" 
                        className="p-2"
                        onClick={() => nextPin()}
                    >
                        <ChevronRightIcon className="h-6 w-6 cursor-pointer hover:bg-secondary rounded-md" />
                    </Button>                
                </div>

                {/* TEKST LOKALIZACJA */}
                <div className="w-full flex flex-row justify-center items-center gap-1">
                    <Icons.mapEmpty className="fill-current w-5 h-5" /> 

                    <p className="text-md font-bold text-center">
                        {userPinsArray[Object.keys(userPinsArray)][currentPinIndex].city}, {userPinsArray[Object.keys(userPinsArray)][currentPinIndex].countryName}
                    </p>
                </div>

            </DialogContent> 
        </Dialog>
    )
}

export default PinDialog;
