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

const FriendshipNotification = () => {
	const authHeader = useAuthHeader();
	const [open, setOpen] = useState(false);

	const { globalRefreshFriendship, setGlobalRefreshFriendship } = useContext(RefreshFriendshipContext);

    const [isLoading, setIsLoading] = useState(true);
	const [localRefetch, setLocalRefetch] = useState(false);

    const [dataFriendship, setDataFriendship] = useState(null);
    const [notificationCounter, setNotificationCounter] = useState(true);


	useEffect(() => {
		
		fetchReceivedFriendship();
		setLocalRefetch(false);
		setGlobalRefreshFriendship(false);

	}, [localRefetch, globalRefreshFriendship]); // aktualnie wczytuje nowe powiadomienia, po refreshu strony

	const fetchReceivedFriendship = async () => {
		setIsLoading(true);

        fetch(`http://localhost:5000/api/v1/friendship/receivedRequests`, {
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
			setDataFriendship(data);
			setIsLoading(false);
		})
		.catch(error => {
			console.log(error.message);
		});
	};

    return (
		<DropdownMenu className="mx-5" open={open} onOpenChange={setOpen} >
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
					{(dataFriendship && dataFriendship.length != 0) ? (
						dataFriendship.slice().reverse().map((user, i) => (
							<UserRowView 
								key={`userFriendship${user.id}${i}`}
								user={user}
								setLocalRefetch={setLocalRefetch}
								setGlobalRefreshFriendship={setGlobalRefreshFriendship}
							/>
						))
					) : (
						<div className="flex flex-col justify-center items-center">
							<Icons.userPlusFill className="fill-current w-20 h-20 cursor-pointer opacity-20" />
							<p className="text-sm text-gray-400">No friend requests</p>
						</div>
					)}

					
				</DropdownMenuGroup>

			</DropdownMenuContent>
		</DropdownMenu>
    );
};

export default FriendshipNotification;
