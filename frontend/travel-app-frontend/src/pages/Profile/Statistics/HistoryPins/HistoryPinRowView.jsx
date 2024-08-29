import React, { useState, useEffect, useContext } from 'react';
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "@/components/firebase";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { RefreshFriendshipContext } from '@/contexts/RefreshFriendshipContext';
import HorizontalBarChart from "@/pages/Profile/Statistics/HorizontalBarChart/HorizontalBarChart";
import AchievementsDialog from "@/pages/Profile/Statistics/Achievements/AchievementsDialog";
import FriendsListDialog from "@/pages/Profile/Statistics/FriendsListDialog/FriendsListDialog"
import VectorMapDialog from "@/pages/Profile/Statistics/VectorWorldMap/VectorMapDialog";
import HistoryPinsDialog from "@/pages/Profile/Statistics/HistoryPins/HistoryPinsDialog";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ReactTimeAgo from 'react-time-ago';


const HistoryPinRowView = ({userId, pin}) => {
	const authHeader = useAuthHeader();

    const [isLoading, setIsLoading] = useState(true);
    const [countryISO, setCountryISO] = useState(null);

    useEffect(() => {
		setIsLoading(true);
        fetchCountryData();
	}, [pin]);

    const fetchCountryData = () => {
        fetch(`http://localhost:5000/api/v1/countries/${pin.countryId}`, {
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
            setCountryISO(data.iso);
        })
        .catch(error => {
            console.log(error.message);
        });
        
    };

    return (
        <TableRow >
            
            <TableCell className="font-medium">
                {countryISO === null ? (
                    <div className="w-[40px] h-[25px] bg-gray-700 flex justify-center items-center text-xl text-white font-bold rounded-[1px]">?</div>
                ) :
                    <img src={`https://flagsapi.com/${countryISO}/flat/64.png`} alt="" className="w-[40px] cursor-pointer" />
                }
            </TableCell>
            <TableCell className="font-medium">{pin.countryName}</TableCell>
            <TableCell>{(pin.city == null) ? ("-") : pin.city}</TableCell>
            <TableCell className="text-right text-nowrap">
                <ReactTimeAgo timeStyle="round" date={new Date(pin.createdAt)} locale="en-US" className="text-sm text-gray-500"/>
            </TableCell>
        </TableRow>   
    );
};

export default HistoryPinRowView;
