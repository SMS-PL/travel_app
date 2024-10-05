import React, { useState, useEffect, useContext } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Button } from "@/components/ui/button";
import { useParams } from 'react-router-dom';
import { Icons } from "@/components/icons";
import { RefreshFriendshipContext } from '@/contexts/RefreshFriendshipContext';
import SpinLoading from '@/components/ui/SpinLoading';

const FriendshipButton = ({userId, friendStatus, ...props}) => {
	const authHeader = useAuthHeader();
	const auth = useAuthUser();

	// const { globalRefreshFriendship, setGlobalRefreshFriendship } = useContext(RefreshFriendshipContext);
	// const [localRefetchFriedship, setLocalRefetchFriedship] = useState(false);

    const [friendshipStatus, setFriendshipStatus] = useState(friendStatus);

	useEffect(() => {
		setFriendshipStatus(friendStatus);
	}, [friendStatus]);

	// wczytywanie danych o friends
	// useEffect(() => {
	// 	fetchFriendshipStatus();
	// 	setLocalRefetchFriedship(false);
	// 	setGlobalRefreshFriendship(false);
		
	// }, [localRefetchFriedship, globalRefreshFriendship, userId]);
	// useEffect(() => {
	// 	fetchFriendshipStatus();
	// 	setLocalRefetchFriedship(false);
	// 	setGlobalRefreshFriendship(false);
		
	// }, [localRefetchFriedship, globalRefreshFriendship, userId]);


	const fetchFriendshipStatus = () => {
		fetch(`http://localhost:5000/api/v1/friendship/status/${userId}`, {
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
			//console.log(data);
			setFriendshipStatus(data.message);
		})
		.catch(error => {
			console.log(error.message);
		});
	};


	const addFriend = () => {
		fetch(`http://localhost:5000/api/v1/friendship/${userId}`, {
			method: 'POST',
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
			fetchFriendshipStatus();
			// setLocalRefetchFriedship(true);
			// setGlobalRefreshFriendship(true);
		})
		.catch(error => {
			console.log(error.message);
		});
	};

    const removeFriend = () => {
		fetch(`http://localhost:5000/api/v1/friendship/${userId}`, {
			method: 'DELETE',
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
			fetchFriendshipStatus();
			// setLocalRefetchFriedship(true);
			// setGlobalRefreshFriendship(true);
		})
		.catch(error => {
			console.log(error.message);
		});
	};

    return (
		<>
            {userId != auth.id && (
					<div className="flex justify-center items-center" {...props} >
						{!friendshipStatus && <SpinLoading className="w-full flex justify-center items-center" /> }

						{friendshipStatus === "STRANGER" ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" onClick={addFriend} className="flex flex-row items-center justify-center gap-2">
                                        <Icons.userPlusFill className="h-6 w-6 fill-current" />
                                        Add friend
									</Button>
								</DropdownMenuTrigger>
							</DropdownMenu>
						) : null }

						{ friendshipStatus === "SENT" ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" className="flex flex-row items-center justify-center gap-2">
                                        <Icons.envelopeCheckFill className="h-6 w-6 fill-current" />
										Invitation sent
									</Button>
								</DropdownMenuTrigger>
							</DropdownMenu>
						) : null }

						{ friendshipStatus === "RECEIVED" ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" onClick={addFriend} className="flex flex-row items-center justify-center gap-2">
                                        <Icons.userPlusFill className="h-6 w-6 fill-current" />
                                        Confirm the invitation
									</Button>
								</DropdownMenuTrigger>
							</DropdownMenu>
						) : null }

						{ friendshipStatus === "FRIEND" ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild > 
									<Button variant="outline" className="flex flex-row items-center justify-center gap-2" >
                                        <Icons.userCheckFill className="h-6 w-6 fill-current" />
										Friend
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent 
									className="w-full" 
								>
									<DropdownMenuItem 
										onClick={() => removeFriend()}
										className="cursor-pointer flex flex-row items-center justify-center gap-2"
									>
                                        <Icons.userDeleteFill className="h-6 w-6 fill-current" />
                                        Remove friend
                                    </DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : null }

					</div>
				)}
        </>
    );
};

export default FriendshipButton;
