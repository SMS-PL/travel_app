import React, { useState, useEffect } from 'react';
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import HorizontalBarChart from "@/pages/Profile/Statistics/HorizontalBarChart/HorizontalBarChart";
import AchievementsDialog from "@/pages/Profile/Statistics/Achievements/AchievementsDialog";
import FriendsListDialog from "@/pages/Profile/Statistics/FriendsListDialog/FriendsListDialog"
import VectorMapDialog from "@/pages/Profile/Statistics/VisitedCountriesMap/VectorMapDialog";
import HistoryPinsDialog from "@/pages/Profile/Statistics/HistoryPins/HistoryPinsDialog";
import SpinLoading from '@/components/ui/SpinLoading';

const ProfileStatistics = ({userId, visitedCountriesCount, achievementsCount, friendsCount, pinsCount}) => {
	const authHeader = useAuthHeader();

	const [countryCounter, setCountryCounter] = useState(239);

	useEffect(() => {
        fetchCountriesLength();
	}, []);

    const fetchCountriesLength = () => {
        fetch(`http://localhost:5000/api/v1/countries/ `, {
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
			console.log(data.length);
            setCountryCounter(data.length);
        })
        .catch(error => {
            console.log(error.message);
        });
        
    };
	

    return (
		<div className="w-full mt-4 grid gap-4 md:gap-6 md:mt-8 grid-cols-2 sm:grid-cols-4 backdrop-blur-[150px]">
			
			
			{/* VISITED COUNTRIES */}
			<Card x-chunk="dashboard-01-chunk-2" className="w-full flex flex-col justify-between col-span-1 sm:col-span-1 p-4 ">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
					<CardTitle className="text-base font-bold leading-[17px]">
						Visited countries
					</CardTitle>
				</CardHeader>

				<CardContent className="p-0 my-4">
					<div className="flex items-baseline gap-1 text-5xl font-extrabold tabular-nums leading-none mb-2">
						{/* {!userCountry && <SpinLoading className="w-full flex justify-center items-center" /> } */}

						
							<div className="flex flex-col w-full justify-center items-center">
								<div className="flex flex-row items-end justify-start w-full mb-2">
									{visitedCountriesCount}
									<span className="text-base font-normal text-muted-foreground">
										{`/${countryCounter}`}
									</span>
								</div>
								<HorizontalBarChart value={visitedCountriesCount} countriesLength={239}/>
							</div>
						
					</div>
				</CardContent>

				<CardFooter className="p-0 w-full">
					<VectorMapDialog 
						userId={userId} 
					/>
				</CardFooter>
			</Card>


			{/* ACHIEVEMENTS EARNED*/}
			<Card x-chunk="dashboard-01-chunk-2" className="w-full flex flex-col justify-between col-span-1 p-4">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
					<CardTitle className="text-base font-bold leading-[17px]">
						Achievements earned
					</CardTitle>
				</CardHeader>

				<CardContent className="p-0 my-4">
					<div className="flex flex-row gap-1 justify-start items-end text-5xl font-extrabold">
						{/* {!userAchievements && <SpinLoading className="w-full flex justify-center items-center" /> } */}
						{achievementsCount}
					</div>
				</CardContent>

				<CardFooter className="p-0 w-full">
					<AchievementsDialog userId={userId} />
				</CardFooter>
			</Card>


			{/* FRIENDS */}
			<Card x-chunk="dashboard-01-chunk-2" className="w-full flex flex-col justify-between col-span-1 p-4 ">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
					<CardTitle className="text-base font-bold leading-[17px]">
						Friends
					</CardTitle>
				</CardHeader>

				<CardContent className="p-0 my-4">
					<div className="flex flex-row gap-1 justify-start items-end text-5xl font-extrabold">
						{/* {!userFriendsList && <SpinLoading className="w-full flex justify-center items-center" /> } */}
						{/* {(userFriendsList !== null) && (counterFriendships !== null) && counterFriendships} */}
						{friendsCount}
					</div>
				</CardContent>

				<CardFooter className="p-0">
					<FriendsListDialog userId={userId} />
				</CardFooter>
			</Card>


			{/* History */}
			<Card x-chunk="dashboard-01-chunk-2" className="w-full flex flex-col justify-between col-span-1 p-4 ">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
					<CardTitle className="text-base font-bold leading-[17px]">
						History of pins
					</CardTitle>
				</CardHeader>

				<CardContent className="p-0 my-4">
					<div className="flex flex-row gap-1 justify-start items-end text-5xl font-extrabold">
						{/* {(counterHistoryPins === null) && <SpinLoading className="w-full flex justify-center items-center" /> }
						{counterHistoryPins && counterHistoryPins} */}
						{pinsCount}
					</div>
				</CardContent>

				<CardFooter className="p-0">
					{/* <FriendsListDialog userFriendsList={userFriendsList} /> */}
					<HistoryPinsDialog userId={userId} />

				</CardFooter>
			</Card>


		</div>
    );
};

export default ProfileStatistics;
