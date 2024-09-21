import React, { useState, useEffect } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import AdminContainer from '@/components/AdminContainer/AdminContainer';
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
import UserRowView from './UserRowView/UserRowView';
import { cn } from '@/lib/utils';

const UsersManagement = () => {
	const authHeader = useAuthHeader();

    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [usersData, setUsersData] = useState(null);

    // paginacja
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [refetchData, setRefetchData] = useState(false);

    const fetchUsers = () => {
        if(inputValue.trim() != "") {
            setIsLoading(true);
            let replacedStr = inputValue.replace(/ /g, '-');

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
                setUsersData(data.content);                
            })
            .catch(error => {
                console.log(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
        }
    };

    const nextPage = () => {
        if(currentPage < (totalPages-1)) {
            setUsersData(null);
            setCurrentPage(prev => prev + 1);
            setRefetchData(true);
        }
    }

    const prevPage = () => {
        if(currentPage > 0) {
            setUsersData(null);
            setCurrentPage(prev => prev - 1);
            setRefetchData(true);
        }
    }

    return (
        <AdminContainer title="Users management" >

            <div className="bg-card px-5 md:px-10 py-6 md:py-8 rounded-[20px] border flex flex-row justify-center items-center gap-5 w-full max-w-[900px]">
                <form 
                    className="relative w-full"
                    
                    onSubmit={(e) => {
                        e.preventDefault();
                        fetchUsers();
                    }}
                >
                    
                    <Input
                        type="search"
                        placeholder="Search users by name..."
                        className="w-full appearance-none pr-12 shadow-none bg-secondary"
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                    />
                    <Button 
                        className="absolute top-0 right-0 text-white w-fit p-3 rounded-s-none" 
                        type="submit"
                    >
                        <Search className="h-4 w-4 " />
                    </Button>
                </form>

            </div>


            <div className="mt-4 md:mt-8 w-full max-w-[900px] h-full">
                <h2 className="font-extrabold text-xl pb-5 text-center" >
                    Results
                </h2>

                <Table className="h-full overflow-hidden">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-fit">UserID</TableHead>
                            <TableHead className="w-fit">First Name</TableHead>
                            <TableHead className="w-fit">Last Name</TableHead>
                            <TableHead className="w-fit hidden md:table-cell">Username</TableHead>
                            <TableHead className="w-fit hidden sm:table-cell">Email</TableHead>
                            <TableHead className="w-fit hidden md:table-cell">Created At</TableHead>
                            <TableHead className="w-fit text-right"></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {usersData && usersData.length != 0 && (usersData.map((user, i) => {
                            return (
                                <UserRowView 
                                    key={`userManagementAdmin${user.id}${i}`}
                                    user={user}
                                />
                            )
                        }))}
                    </TableBody>

                </Table>

                {!isLoading && (usersData === null) && (
                    <div className="w-full text-center mt-5" >
                        <span className="text-base text-muted-foreground">Start your search...</span>
                    </div>
                )}

                {!isLoading && (usersData !== null) && (usersData.length == 0) && (
                    <div className="text-gray-400 flex flex-col justify-center items-center leading-[140px] mt-5 relative">
                        <CircleOff className="h-[100px] w-[100px]" color="hsl(var(--muted-foreground))"/>
                        <span className="text-base mt-2 text-muted-foreground">No results</span>                                    
                    </div>
                )}

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
            

            

        </AdminContainer>

    );
};

export default UsersManagement;
