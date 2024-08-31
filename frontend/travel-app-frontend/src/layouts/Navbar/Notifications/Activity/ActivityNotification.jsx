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
import HoverUserInfo from "@/components/ui/HoverUserInfo";
import { Button } from "@/components/ui/button";
import { RefreshFriendshipContext } from '@/contexts/RefreshFriendshipContext';
import SpinLoading from '@/components/ui/SpinLoading';
import NotificationRowView from '@/layouts/Navbar/Notifications/Activity/NotificationRowView';
import { cn } from '@/lib/utils';

const ActivityNotification = () => {
	const authHeader = useAuthHeader();
	const [open, setOpen] = useState(false);

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);

	// obsługa paginacji
	const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(99);
    const [totalPages, setTotalPages] = useState(0);
    const [numberOfElements, setNumberOfElements] = useState(0);
	const [isFirstPage, setIsFirstPage] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);


	useEffect(() => {
		fetchNotifications();

	}, []);

	const fetchNotifications = async () => {
		setIsLoading(true);

        fetch(`http://localhost:5000/api/v1/notifications/?pageSize=${pageSize}&pageNumber=${currentPage}`, {
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

			setData(data);
			setTotalPages(data.totalPages);
			setNumberOfElements(data.numberOfElements);
			setIsFirstPage(data.first);
			setIsLastPage(data.last);

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
				// onPointerDown={() => setLocalRefetch(true)}
			>
				<Icons.bellFill className={cn(open ? "fill-primary" : "fill-current", "w-[22px] h-[22px]")} /> 
			</DropdownMenuTrigger>

			<DropdownMenuContent className="max-w-[100vw] w-[400px] p-2" align="end"  forceMount>
				<DropdownMenuLabel className="font-bold pb-2">
					<p className="text-base font-bold leading-none">
						Notifications
					</p>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />
				
				<DropdownMenuGroup className="py-2 max-h-[500px] h-fit overflow-y-auto">

				{(data && data.content.length != 0) ? (
						data.content.map((notificationGroup, i) => (
							<NotificationRowView 
								key={`notification${i}`}
								notificationGroup={notificationGroup}
							/>
						))
					) : (
						<div className="flex flex-col justify-center items-center">
							<Icons.bellFill className="fill-current w-16 h-16 cursor-pointer opacity-20" />
							<p className="text-sm text-gray-400 mt-3">No notifications!</p>
						</div>
					)}

				</DropdownMenuGroup>

			</DropdownMenuContent>
		</DropdownMenu>
    );
};

export default ActivityNotification;
