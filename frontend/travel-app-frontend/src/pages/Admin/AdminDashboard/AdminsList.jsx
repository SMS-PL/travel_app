import React, { useState, useEffect } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { cn } from '@/lib/utils';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
    Search,
    ChevronLeftIcon,
    ChevronRightIcon,
    Ellipsis,
    CircleOff
} from "lucide-react";
import { Button } from '@/components/ui/button';
import SpinLoading from '@/components/ui/SpinLoading';
import AdminRowView from './AdminRowView';

const AdminsList = () => {
	const authHeader = useAuthHeader();

    const [isLoading, setIsLoading] = useState(false);
    const [adminsData, setAdminsData] = useState(null);

    // paginacja
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [refetchData, setRefetchData] = useState(false);

    useEffect(() => {
    
    }, []);

    const fetchAdmins = () => {
        setIsLoading(true);
        fetch(`http://localhost:5000/api/v1/users/search/${replacedStr}?pageNumber=${currentPage}&pageSize=${pageSize}`, {
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
            if(data.totalPages == 0) {
                setTotalPages(1);
            } else {
                setTotalPages(data.totalPages);
            }
            setAdminsData(data.content);                
        })
        .catch(error => {
            console.log(error.message);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const nextPage = () => {
        if(currentPage < (totalPages-1)) {
            setAdminsData(null);
            setCurrentPage(prev => prev + 1);
            setRefetchData(true);
        }
    }

    const prevPage = () => {
        if(currentPage > 0) {
            setAdminsData(null);
            setCurrentPage(prev => prev - 1);
            setRefetchData(true);
        }
    }

    return (
        <div className="mt-4 md:mt-8 w-full max-w-[900px] h-full flex flex-col justify-center items-center">
            <h2 className="font-extrabold text-xl pb-5 text-center" >
                Admins List
            </h2>

            <Table className="h-full overflow-hidden">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-fit">AdminID</TableHead>
                        <TableHead className="w-fit">First Name</TableHead>
                        <TableHead className="w-fit">Last Name</TableHead>
                        <TableHead className="w-fit hidden md:table-cell">Username</TableHead>
                        <TableHead className="w-fit hidden sm:table-cell">Email</TableHead>
                        <TableHead className="w-fit text-right"></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {adminsData && adminsData.length != 0 && (adminsData.map((user, i) => {
                        return (
                            <AdminRowView 
                                key={`userManagementAdmin${user.id}${i}`}
                                user={user}
                            />
                        )
                    }))}
                </TableBody>

            </Table>

            {/* {!isLoading && (adminsData === null) && (
                <div className="w-full text-center mt-5" >
                    <span className="text-base text-muted-foreground">No admins...</span>
                </div>
            )}

            {!isLoading && (adminsData !== null) && (adminsData.length == 0) && (
                <div className="text-gray-400 flex flex-col justify-center items-center leading-[140px] mt-5 relative">
                    <CircleOff className="h-[100px] w-[100px]" color="hsl(var(--muted-foreground))"/>
                    <span className="text-base mt-2 text-muted-foreground">No results</span>                                    
                </div>
            )} */}

            {isLoading && <SpinLoading className="w-full flex justify-center items-center" /> }
            
            <div className={cn("w-full flex flex-row justify-center items-center gap-1", (totalPages == 1) && "hidden")} >
                <Button 
                    onClick={() => prevPage()} 
                    variant="secondary"
                    className="w-fit"
                    disabled={currentPage == 0}
                >
                    <ChevronLeftIcon className="h-6 w-6 cursor-pointer rounded-md" />
                </Button>
                
                <div className="text-sm text-gray-400">{`${currentPage+1}/${totalPages}`}</div>

                <Button 
                    onClick={() => nextPage()}
                    variant="secondary"
                    className="w-fit"
                    disabled={currentPage == (totalPages-1)}
                >
                    <ChevronRightIcon className="h-6 w-6 cursor-pointer rounded-md"/>
                </Button>
            </div>
        </div>
    );
};

export default AdminsList;
