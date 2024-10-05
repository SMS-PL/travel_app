import React, { useState, useEffect, useContext } from 'react';
import { Icons } from "@/components/icons";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserRowView from "@/layouts/Navbar/Notifications/Friendship/UserRowView";
import { RefreshFriendshipContext } from '@/contexts/RefreshFriendshipContext';
import SpinLoading from '@/components/ui/SpinLoading';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import{
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@radix-ui/react-icons";

const FriendshipNotification = () => {
	const authHeader = useAuthHeader();
	const [open, setOpen] = useState(false);

	const { globalRefreshFriendship, setGlobalRefreshFriendship } = useContext(RefreshFriendshipContext);

    const [isLoading, setIsLoading] = useState(true);
	const [localRefetch, setLocalRefetch] = useState(false);

    const [dataFriendship, setDataFriendship] = useState(null);

	// paginacja
	const [currentPage, setCurrentPage] = useState(0);
	const [pageSize, setPageSize] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [refetchData, setRefetchData] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);

	useEffect(() => {
		if(open) {
			fetchReceivedFriendship();
			setLocalRefetch(false);
			// setGlobalRefreshFriendship(false);
		}
	}, [localRefetch, open, currentPage]);
	// }, [localRefetch, open, globalRefreshFriendship]);

	const fetchReceivedFriendship = async () => {
		setIsLoading(true);

        fetch(`http://localhost:5000/api/v1/friendship/receivedRequests?pageNumber=${currentPage}&pageSize=${pageSize}`, {
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
			// setDataFriendship(data.content);
			// setDataFriendship(prevData => {
			// 	const newData = data.content.filter(
			// 		newUser => !prevData?.some(user => user.id === newUser.id)
			// 	);
			// 	return data.first ? newData : [...prevData, ...newData];
			// });

			setDataFriendship(prevData => {
                if(data.first) {
                    return data.content
                }
                return [...prevData, ...data.content]
            });

			setTotalPages(data.totalPages);
			setIsLastPage(data.last);

		})
		.catch(error => {
			console.log(error.message);
		})
		.finally(() => {
			setIsLoading(false);
		})
	};

	const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };
    
    const handleNextPage = () => {
        if (currentPage < (totalPages-1)) {
            setCurrentPage(prev => prev + 1);
        }
    };

    return (
		<DropdownMenu 
			className="mx-5" 
			open={open} 
			onOpenChange={setOpen}
		>
			<DropdownMenuTrigger 
				className="flex items-center justify-center rounded-full cursor-pointer" 
				onPointerDown={() => setLocalRefetch(true)}
			>
				<Icons.userCheckFill className={cn(open ? "fill-primary" : "fill-current", "w-[30px] h-[30px]")} /> 
			</DropdownMenuTrigger>

			<DropdownMenuContent className="max-w-[100vw] w-[400px] p-2" align="end" forceMount>
				<DropdownMenuLabel className="font-bold pb-2">
					<p className="text-base font-bold leading-none">
						Invitations to friends
					</p>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />
				
				<DropdownMenuGroup className="py-2 max-h-[500px] h-fit overflow-y-auto">

					{!dataFriendship && <SpinLoading className="w-full flex justify-center items-center" /> }

					{dataFriendship && dataFriendship.length != 0 && (
						dataFriendship.slice().reverse().map((user, i) => (
							<UserRowView 
								key={`userFriendship${user.id}${i}`}
								user={user}
								setLocalRefetch={setLocalRefetch}
								setGlobalRefreshFriendship={setGlobalRefreshFriendship}
							/>
						)))
					}

					{dataFriendship && (dataFriendship.length == 0) && (
						<div className="flex flex-col justify-center items-center">
							<Icons.userPlusFill className="fill-current w-20 h-20 cursor-pointer opacity-20" />
							<p className="text-sm text-gray-400">No friend requests</p>
						</div>
					)}

					{(!isLoading && !isLastPage) &&
						<Button 
							variant="link" 
							onClick={() => {handleNextPage()}}
							className="w-full p-0 h-fit"
						>
							Load more...
						</Button>
					} 
					
				</DropdownMenuGroup>

			</DropdownMenuContent>
		</DropdownMenu>
    );
};

export default FriendshipNotification;
