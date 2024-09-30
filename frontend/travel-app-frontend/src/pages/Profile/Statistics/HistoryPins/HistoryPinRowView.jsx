import React, { useState, useEffect, useContext } from 'react';
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
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
            <TableCell className="font-medium text-nowrap">{pin.countryName}</TableCell>
            <TableCell className="text-nowrap">{(pin.city == null) ? ("-") : pin.city}</TableCell>
            <TableCell className="text-right text-nowrap">
                <ReactTimeAgo timeStyle="round" date={new Date(pin.createdAt)} locale="en-US" className="text-sm text-gray-500"/>
            </TableCell>
        </TableRow>   
    );
};

export default HistoryPinRowView;
