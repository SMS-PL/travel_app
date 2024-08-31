import React, { useState, useEffect } from 'react';
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
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import VectorWorldMap from './VectorWorldMap';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import SpinLoading from '@/components/ui/SpinLoading';

const VectorMapDialog = ({userId, userCountry, setUserCountry}) => {
	const authHeader = useAuthHeader();

    useEffect(() => {
        getUserCountries(300, 0);

	}, [userId]);

    const getUserCountries = (pageSize, pageNumber) => {
		fetch(`http://localhost:5000/api/v1/visited-countries/${userId}?pageSize=${pageSize}&pageNumber=${pageNumber}`, {
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
			setUserCountry(data);
		})
		.catch(error => {
			console.log(error.message);
		});
	};

    return (
        <Dialog>
            <DialogTrigger className="text-white gap-1" asChild>
                {userCountry && 
                    <div>
                        <Button className="text-white gap-[4px] px-[10px]">
                            <Icons.locationPinFill className="fill-current w-4 h-4" /> 
                            Open map
                        </Button>
                    </div>
                }
            </DialogTrigger>

            <DialogContent className="flex flex-col justify-center items-center max-w-full w-[800px] rounded-lg py-8 px-5 sm:p-10">
                <DialogHeader className="w-full text-center sm:text-start">
                    <DialogTitle className="font-extrabold">Interactive map</DialogTitle>
                    <DialogDescription>
                        The countries visited by the user are marked in <span className="text-primary font-bold">blue</span>.
                    </DialogDescription>
                </DialogHeader>

                {!userCountry && <SpinLoading className="w-full flex justify-center items-center" /> }
                {userCountry && <VectorWorldMap userCountry={userCountry} />}
                
            </DialogContent>
        </Dialog>
    );
};

export default VectorMapDialog;
