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
import MapComponent from "@/components/Pins/MapComponent";
import PinSettingsButton from "@/components/Pins/PinSettingsButton";
import { Icons } from "@/components/icons";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import HoverUserInfo from "@/components/ui/HoverUserInfo";

const PinDialog = ({userPinsArray, refetch, setRefetch}) => {
    const auth = useAuthUser();

    const [howMuchPins, setHowMuchPins] = useState(0);

    const [currentPinIndex, setCurrentPinIndex] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        setHowMuchPins(+userPinsArray[Object.keys(userPinsArray)].length);
        if(+userPinsArray[Object.keys(userPinsArray)].length >= 1 ){
            setCurrentPinIndex(0);
        }
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
        <Dialog key={`userPin-${userPinsArray[Object.keys(userPinsArray)][0].id}`} onOpenChange={setOpenDialog} open={openDialog}> 
            <DialogTrigger asChild>
                <div className="flex flex-col justify-center items-center cursor-pointer min-w-[55px] w-fit">
                    <Avatar className="w-[50px] h-[50px] border-2 border-primary">
                        <AvatarImage src={userPinsArray[Object.keys(userPinsArray)][currentPinIndex].author.photoUrl} alt="stock img" className="object-cover bg-black" />
                        <AvatarFallback>{`${userPinsArray[Object.keys(userPinsArray)][currentPinIndex].author.firstName[0]}${userPinsArray[Object.keys(userPinsArray)][currentPinIndex].author.lastName[0]}`}</AvatarFallback>
                    </Avatar>
                    
                    <HoverUserInfo userData={userPinsArray[Object.keys(userPinsArray)][currentPinIndex].author} className="flex flex-row items-center" >
                        <div className="mt-1 text-gray-500 text-sm flex flex-col text-center hover:underline">
                            {userPinsArray[Object.keys(userPinsArray)][currentPinIndex].author.firstName}
                        </div>
                    </HoverUserInfo>
                </div>
            </DialogTrigger>

            <DialogContent className="flex flex-col justify-center items-center max-w-full w-[800px] max-h-full">
                <DialogTitle className="hidden"></DialogTitle>
                <DialogDescription className="hidden"></DialogDescription>

                {/* PASECZKI NA GÓRZE */}
                <div className={cn(" grid-flow-col grid gap-2 mt-3 w-full h-1", howMuchPins > 0 ? `grid-cols-${howMuchPins}` : null)}>
                    {Array.from({ length: howMuchPins }).map((_, i) => (
                        <div key={`howMuchPins-${i}`} className={cn(`h-full rounded-lg`, currentPinIndex === i ? "bg-primary" : "bg-secondary")}></div>
                    ))}
                </div>

                {/* ZDJECIE IMIE NAZWISKO CZAS CLOSE */}
                <div className="flex flex-row justify-between items-center w-full">
                        {/* <p>{userPinsArray[Object.keys(userPinsArray)][0].author.firstName}</p> */}
                    <div className="flex flex-row justify-center items-center gap-3 w-fit">
                        <HoverUserInfo userData={userPinsArray[Object.keys(userPinsArray)][currentPinIndex].author} className="flex flex-row items-center gap-2">
                            <Avatar className="w-[40px] h-[40px]">
                                <AvatarImage src={userPinsArray[Object.keys(userPinsArray)][currentPinIndex].author.photoUrl} alt="stock img" className="object-cover bg-black" />
                                <AvatarFallback>{`${userPinsArray[Object.keys(userPinsArray)][currentPinIndex].author.firstName[0]}${userPinsArray[Object.keys(userPinsArray)][currentPinIndex].author.lastName[0]}`}</AvatarFallback>
                            </Avatar>
                        
                            <p className="text-current font-bold text-base flex flex-col justify-center items-start h-full flex-wrap">
                                <span className="hover:underline">
                                    {`${userPinsArray[Object.keys(userPinsArray)][currentPinIndex].author.firstName} ${userPinsArray[Object.keys(userPinsArray)][currentPinIndex].author.lastName}`}
                                </span>
                                <ReactTimeAgo timeStyle="round" date={new Date(userPinsArray[Object.keys(userPinsArray)][currentPinIndex].createdAt)} locale="en-US" className="mt-[-3px] font-normal text-sm text-gray-500"/>
                            </p>

                        </HoverUserInfo>

                    </div>

                    <div className="w-fit flex justify-end items-center">
                        {auth.id == userPinsArray[Object.keys(userPinsArray)][currentPinIndex].author.id &&
                            <PinSettingsButton 
                                pinId={userPinsArray[Object.keys(userPinsArray)][currentPinIndex].id}
                                userId={userPinsArray[Object.keys(userPinsArray)][currentPinIndex].author.id}
                                setRefetch={setRefetch}
                                setOpenDialog={setOpenDialog}
                            />
                        }
                    </div>
                </div>

                {/* STRZAŁKI I MAPA */}
                <div className="relative flex flex-row justify-center items-center">
                    {howMuchPins > 1 && (
                        <Button 
                            variant="ghost" 
                            className="p-1 absolute bg-secondary left-5 rounded-full z-10"
                            onClick={() => prevPin()}
                        >
                            <ChevronLeftIcon className="h-6 w-6 cursor-pointer hover:bg-secondary rounded-md" />
                        </Button>
                    )}  
                    
                    <div className="w-full rounded-xl border bg-card text-card-foreground shadow">
                        {/* <img className="w-full rounded-md" src="https://lh3.googleusercontent.com/ILV2_Xm--SVih4MElRmFeu6k6YIdxD72ic7a3-qWJgGgDcyU_UzIPOTg8vEr4zjH5UhYlmFKpVV2ukBJOz_I_d24vlS96b2dE2873T53=rw-e365-w900" alt="" srcset="" /> */}
                        <MapComponent 
                            lat={userPinsArray[Object.keys(userPinsArray)][currentPinIndex].localization.x}
                            lng={userPinsArray[Object.keys(userPinsArray)][currentPinIndex].localization.y}
                        />
                    </div>

                    {howMuchPins > 1 && (
                        <Button 
                            variant="ghost" 
                            className="p-1 absolute bg-secondary right-5 rounded-full z-10"
                            onClick={() => nextPin()}
                        >
                            <ChevronRightIcon className="h-6 w-6 cursor-pointer hover:bg-secondary rounded-md" />
                        </Button> 
                    )}
                </div>

                {/* TEKST LOKALIZACJA */}
                <div className="w-full flex flex-row justify-center items-center gap-1">
                    <Icons.mapEmpty className="fill-current w-4 h-4" /> 

                    <p className="text-sm font-bold text-center">
                        {userPinsArray[Object.keys(userPinsArray)][currentPinIndex].city !== null && `${userPinsArray[Object.keys(userPinsArray)][currentPinIndex].city}, `}
                        {userPinsArray[Object.keys(userPinsArray)][currentPinIndex].countryName}
                    </p>
                </div>

            </DialogContent> 
        </Dialog>
    )
}

export default PinDialog;
