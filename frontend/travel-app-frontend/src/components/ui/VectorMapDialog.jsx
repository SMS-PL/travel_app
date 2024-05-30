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
import VectorWorldMap from '@/components/VectorWorldMap/VectorWorldMap';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const VectorMapDialog = ({userId}) => {
	const authHeader = useAuthHeader();


	const [userCountry, setUserCountry] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/visited-countries/${userId}?pageSize=300&pageNumber=0`, {
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
			setUserCountry(data);
		})
		.catch(error => {
			console.log(error.message);
		});

	}, []);

    return (
        <Dialog>
            <DialogTrigger>
                <Button className="text-white gap-1">
                    <Icons.mapEmpty className="fill-current w-5 h-5" /> 
                    Open map
                </Button>
            </DialogTrigger>

            <DialogContent className="flex flex-col justify-center items-center max-w-full w-[800px] p-10">
                <DialogHeader>
                    <DialogTitle>Interactive map</DialogTitle>

                    <DialogDescription>
                        The countries visited by the user are marked in blue.
                    </DialogDescription>

                    <VectorWorldMap userCountry={userCountry}/>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default VectorMapDialog;
