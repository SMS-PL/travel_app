import React, { useState, useEffect } from 'react';
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
import AchievementView from "./AchievementView";
import SpinLoading from '@/components/ui/SpinLoading';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { cn } from '@/lib/utils';
import{
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@radix-ui/react-icons";

const AchievementsDialog = ({userId}) => {
    const authHeader = useAuthHeader();

    const [open, setOpen] = useState(false);

    const [userAchievements, setUserAchievements] = useState(null);

    // paginacja
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [refetchData, setRefetchData] = useState(false);
	
    useEffect(() => {
        if(open) {
            setRefetchData(false);
            getUserAchievements();
        }
	}, [userId, open, refetchData]);

	const getUserAchievements = () => {
		fetch(`http://localhost:5000/api/v1/achievements/${userId}?pageSize=${pageSize}&pageNumber=${currentPage}`, {
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
			// console.log(data);
			setUserAchievements(data);
            setTotalPages(data.totalPages);
		})
		.catch(error => {
			console.log(error.message);
		});
	};

    const nextPage = () => {
        if(currentPage < (totalPages-1)) {
            setUserAchievements(null);
            setCurrentPage(prev => prev + 1);
            setRefetchData(true);
        }
    }

    const prevPage = () => {
        if(currentPage > 0) {
            setUserAchievements(null);
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
                    <Button className="text-white gap-[2px] px-[10px] text-sm" >
                        <Icons.medal2Fill className="h-5 w-5 fill-white" />
                        Show all
                    </Button>
                </div>
            </DialogTrigger>

            <DialogContent className="flex flex-col justify-center items-center max-w-full w-[700px] rounded-lg py-8 px-5 sm:p-10">
                <DialogHeader className="w-full text-center sm:text-start" >
                    <DialogTitle className="font-extrabold">All achievements</DialogTitle>
                    <DialogDescription>
                        Here you will find all achievements earned by this user.
                    </DialogDescription>
                </DialogHeader>

                <div className="w-full">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-y-scroll max-h-[70vh] pt-2 items-start gap-5">
                        {!userAchievements && <SpinLoading className="w-full flex justify-center items-center" /> }

                        {userAchievements && (userAchievements.totalElements != 0) && (userAchievements.content.slice().map((achievement, i) => {
                            return (
                                <AchievementView key={`userAchievements${achievement.id}`} achievement={achievement}/>
                            )
                        }))}
                        
                    </div>

                    {userAchievements && userAchievements.totalElements == 0 && (
                        <div className="text-gray-400 flex flex-col justify-center items-center leading-[140px] pt-2 relative">
                            {/* <img src="/medals/silver_medal.png" alt="" className="w-[170px] h-[170px] opacity-20" /> */}
                            <Icons.medal2Fill className="h-[130px] w-[130px] fill-white opacity-20" />
                            <span className="text-sm mt-4">The user has not earned any achievements yet.</span>
                        </div>
                    )}

                    {userAchievements && (userAchievements.totalPages > 1) && (
                        <div className={cn("w-full flex flex-row justify-center items-center gap-1", (totalPages == 1) && "hidden" )}>
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

export default AchievementsDialog;
