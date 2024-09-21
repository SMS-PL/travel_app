import React, { useState, useEffect, useContext } from 'react';
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
import FriendsListRowView from "./FriendsListRowView";
import HoverUserInfo from "@/components/ui/HoverUserInfo";
import SpinLoading from '@/components/ui/SpinLoading';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { RefreshFriendshipContext } from '@/contexts/RefreshFriendshipContext';
import { cn } from '@/lib/utils';
import{
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@radix-ui/react-icons";

const FriendsListDialog = ({userId}) => {
    const authHeader = useAuthHeader();

	// const { globalRefreshFriendship, setGlobalRefreshFriendship } = useContext(RefreshFriendshipContext);
    const [open, setOpen] = useState(false);

	const [userFriendsList, setUserFriendsList] = useState(null);

    // paginacja
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const [totalPages, setTotalPages] = useState(0);
    const [refetchData, setRefetchData] = useState(false);

    useEffect(() => {
        if(open) {
            setRefetchData(false);
            getUserFriendsList();
            // setGlobalRefreshFriendship(false);
        }

	}, [userId, open, refetchData]);

// }, [userId, globalRefreshFriendship, refetchData]);


    const getUserFriendsList = () => {
		fetch(`http://localhost:5000/api/v1/friendship/${userId}?pageNumber=${currentPage}&pageSize=${pageSize}`, {
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
			setUserFriendsList(data.content);
            setTotalPages(data.totalPages);
            // setCounterFriendships(data.totalElements);
		})
		.catch(error => {
			console.log(error.message);
		});
	};

    const nextPage = () => {
        if(currentPage < (totalPages-1)) {
            setUserFriendsList(null);
            setCurrentPage(prev => prev + 1);
            setRefetchData(true);
        }
    }

    const prevPage = () => {
        if(currentPage > 0) {
            setUserFriendsList(null);
            setCurrentPage(prev => prev - 1);
            setRefetchData(true);
        }
    }

    return (
        <Dialog 
            open={open} 
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <div>
                    <Button className="text-white gap-[4px] px-[10px] text-sm" >
                        <Icons.userFill className="h-[15px] w-[15px] fill-white" />
                        Show all
                    </Button>
                </div>
            </DialogTrigger>

            <DialogContent className="flex flex-col justify-center items-center max-w-full w-[700px] rounded-lg px-2 py-10 sm:p-10">
                <DialogHeader className="w-full text-center sm:text-start" >
                    <DialogTitle className="font-extrabold">All friends</DialogTitle>
                    <DialogDescription className="">Here you can find the user's friends list</DialogDescription>
                </DialogHeader>
                <div className="w-full">
                    <div className="flex flex-col justify-center items-center w-full gap-2">
                        {!userFriendsList && <SpinLoading className="w-full flex justify-center items-center" /> }
                        
                        {userFriendsList && userFriendsList.length != 0 && (userFriendsList.map((user, i) => {
                            return (
                                <FriendsListRowView key={`userFriendshipList${user.id}`} user={user} setOpen={setOpen} />
                            )
                        }))}
                    </div>

                    {userFriendsList && (userFriendsList.length == 0) && (
                        <div className="text-gray-400 flex flex-col justify-center items-center leading-[140px] pt-2 relative">
                            <Icons.userFill className="h-[100px] w-[100px] fill-white opacity-20" />
                            <span className="text-sm mt-4">The user has not friends.</span>
                        </div>
                    )}

                    {userFriendsList && (totalPages > 1) && (
                        <div className={cn("w-full flex flex-row justify-center items-center gap-1", (totalPages == 1) && "hidden")}>
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
                    )}
                    
                </div>


                
            </DialogContent>
        </Dialog>
    );
};

export default FriendsListDialog;
