import React, { useState, useEffect } from 'react';
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
import UserRowViewNotification from "@/components/Notifications/UserRowViewNotification";
import HoverUserInfo from "@/components/ui/HoverUserInfo";
import { Button } from "@/components/ui/button";

const ReceivedFriendshipNotification = () => {
	const authHeader = useAuthHeader();

    const [isLoading, setIsLoading] = useState(true);
	const [refetch, setRefetch] = useState(false);

    const [dataFriendship, setDataFriendship] = useState(null);
    const [notificationCounter, setNotificationCounter] = useState(true);

	useEffect(() => {
		console.log("Refetch state changed:", refetch);

		fetchReceivedFriendship();
		setRefetch(false);

	}, [refetch]); // aktualnie wczytuje nowe powiadomienia, po refreshu strony

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
            setIsLoading(false);
			// console.log("Wczytano powiadomienia o znajomych");
			// console.log(data);
			setDataFriendship(data);
            // toast({
            //     title: "Hurrah!",
            //     description: "Fetch comments!",
            //     className: "bg-green-800"
            // })
		})
		.catch(error => {
			console.log(error.message);
		});
	};

	const confirmFriendship = (user) => {
		fetch(`http://localhost:5000/api/v1/friendship/${user.id}`, {
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
			setRefetch(true);
		})
		.catch(error => {
			console.log(error.message);
		});
	};

	const declineFriendship = (user) => {
		fetch(`http://localhost:5000/api/v1/friendship/${user.id}`, {
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
			setRefetch(true);
		})
		.catch(error => {
			console.log(error.message);
		});
	};


    return (
		<DropdownMenu className="mx-5">
			<DropdownMenuTrigger 
				className="bg-secondary p-[4px] flex items-center justify-center rounded-full cursor-pointer" 
				onPointerDown={() => setRefetch(true)}
			>
				<Icons.userCheckFill className="fill-current w-[25px] h-[25px]" /> 
			</DropdownMenuTrigger>

			<DropdownMenuContent className="max-w-full w-fit p-2" align="end" forceMount>
				<DropdownMenuLabel className="font-bold pb-2">
					<p className="text-sm font-bold leading-none">
						Invitations to friends
					</p>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />
				
				<DropdownMenuGroup className="pt-2">
					{!isLoading && dataFriendship && (
						dataFriendship.slice().reverse().map((user, i) => (
							<div key={`userFriendship${user.id}${i}`} className="flex flex-row items-center justify-between py-1">
								<HoverUserInfo userData={user} className="flex w-full">
									<UserRowViewNotification user={user} />
								</HoverUserInfo>

								<div className="flex flex-row justify-center items-center gap-1 h-full">
									<Button variant="ghost" className="p-2" onClick={() => confirmFriendship(user)} >
										<Icons.checked className="fill-current w-5 h-5 cursor-pointer" /> 
									</Button>

									<Button variant="ghost" className="p-2" onClick={() => declineFriendship(user)} >
										<Icons.xmark className="fill-current w-5 h-5 cursor-pointer" /> 
									</Button>

								</div>

							</div>
						))
					)}
					
				</DropdownMenuGroup>

			</DropdownMenuContent>
		</DropdownMenu>
    );
};

export default ReceivedFriendshipNotification;
