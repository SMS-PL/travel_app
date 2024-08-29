import React, { useState, useEffect, useContext } from 'react';
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "@/components/firebase";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { RefreshFriendshipContext } from '@/contexts/RefreshFriendshipContext';
import HorizontalBarChart from "@/pages/Profile/Statistics/HorizontalBarChart/HorizontalBarChart";
import AchievementsDialog from "@/pages/Profile/Statistics/Achievements/AchievementsDialog";
import FriendsListDialog from "@/pages/Profile/Statistics/FriendsListDialog/FriendsListDialog"
import VectorMapDialog from "@/pages/Profile/Statistics/VectorWorldMap/VectorMapDialog";
import HistoryPinsDialog from "@/pages/Profile/Statistics/HistoryPins/HistoryPinsDialog";

const ProfileStatistics = ({userId}) => {
	const authHeader = useAuthHeader();
	const auth = useAuthUser();
    const { toast } = useToast();
    const signIn = useSignIn();

	const [isLoading, setIsLoading] = useState(true);

	const [userCountry, setUserCountry] = useState(null);
	const [userAchievements, setUserAchievements] = useState(null);
	const [userFriendsList, setUserFriendsList] = useState(null);
    const [countriesLength, setCountriesLength] = useState(0);
	
    const [counterHistoryPins, setCounterHistoryPins] = useState(null);

	const { globalRefreshFriendship, setGlobalRefreshFriendship } = useContext(RefreshFriendshipContext);


	useEffect(() => {
		setIsLoading(true);

		getUserCountries(10, 0);
		getUserAchievements(10, 0);
		fetchCountries();
		getUserFriendsList();

		setIsLoading(false);

	}, [userId]);

	useEffect(() => {
		getUserFriendsList();
		setGlobalRefreshFriendship(false);

	}, [globalRefreshFriendship]);

	const getUserCountries = (pageSize, pageNumber) => {
		fetch(`http://localhost:5000/api/v1/visited-countries/${userId}?pageSize=${pageSize}&pageNumber=${pageNumber}`, {
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
			setUserCountry(data);
		})
		.catch(error => {
			console.log(error.message);
		});
	};

	const fetchCountries = () => {
        fetch(`http://localhost:5000/api/v1/countries/`, {
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
            setCountriesLength(data.length);
        })
        .catch(error => {
            console.log(error.message);
        });
    };

	const getUserAchievements = (pageSize, pageNumber) => {
		fetch(`http://localhost:5000/api/v1/achievements/${userId}?pageSize=${pageSize}&pageNumber=${pageNumber}`, {
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
		})
		.catch(error => {
			console.log(error.message);
		});
	};

	const getUserFriendsList = () => {
		fetch(`http://localhost:5000/api/v1/friendship/${userId}`, {
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
			setUserFriendsList(data);
		})
		.catch(error => {
			console.log(error.message);
		});
	};
	

    return (
		<div className="w-full mt-4 grid gap-2 sm:gap-4 md:gap-6 md:mt-8 grid-cols-2 sm:grid-cols-4 backdrop-blur-[150px]">
			{/* VISITED COUNTRIES */}
			<Card x-chunk="dashboard-01-chunk-2" className="w-full flex flex-col justify-between col-span-1 sm:col-span-1 p-4 ">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
					<CardTitle className="text-base sm:text-lg font-bold leading-5">
						Visited countries
					</CardTitle>
				</CardHeader>

				<CardContent className="pb-4 p-0">
					<div className="flex items-baseline gap-1 text-4xl sm:text-5xl font-bold tabular-nums leading-none mb-2">
						{userCountry && userCountry.totalElements}
						<span className="text-base font-normal text-muted-foreground">
							{`/${countriesLength}`}
						</span>
					</div>
					<HorizontalBarChart value={userCountry && userCountry.totalElements} countriesLength={countriesLength}/>
				</CardContent>

				<CardFooter className="p-0 pt-3">
					<VectorMapDialog userId={userId}/>
				</CardFooter>
			</Card>

			{/* ACHIEVEMENTS EARNED*/}
			<Card x-chunk="dashboard-01-chunk-2" className="w-full flex flex-col justify-between col-span-1 p-4">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
					<CardTitle className="text-base sm:text-lg font-bold leading-5">
						Achievements earned
					</CardTitle>
				</CardHeader>

				<CardContent className="p-0 my-2">
					<div className="flex flex-row gap-1 justify-start items-end text-4xl sm:text-5xl font-bold">
						{userAchievements && userAchievements.totalElements}
					</div>
				</CardContent>

				<CardFooter className="p-0 w-full">
					<AchievementsDialog userAchievements={userAchievements} />
				</CardFooter>
			</Card>

			{/* FRIENDS */}
			<Card x-chunk="dashboard-01-chunk-2" className="w-full flex flex-col justify-between col-span-1 p-4 ">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
					<CardTitle className="text-base sm:text-lg font-bold leading-5">
						Friends
					</CardTitle>
				</CardHeader>

				<CardContent className="p-0 my-2">
					<div className="flex flex-row gap-1 justify-start items-end text-4xl sm:text-5xl font-bold">
						{userFriendsList && userFriendsList.length}
					</div>
				</CardContent>

				<CardFooter className="p-0">
					<FriendsListDialog userFriendsList={userFriendsList} />
				</CardFooter>
			</Card>

			{/* History */}
			<Card x-chunk="dashboard-01-chunk-2" className="w-full flex flex-col justify-between col-span-1 p-4 ">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
					<CardTitle className="text-base sm:text-lg font-bold leading-5">
						History of all pins
					</CardTitle>
				</CardHeader>

				<CardContent className="p-0 my-2">
					<div className="flex flex-row gap-1 justify-start items-end text-4xl sm:text-5xl font-bold">
						{/* {userFriendsList && userFriendsList.length} */}
						{counterHistoryPins && counterHistoryPins}
					</div>
				</CardContent>

				<CardFooter className="p-0">
					{/* <FriendsListDialog userFriendsList={userFriendsList} /> */}
					<HistoryPinsDialog userId={userId} setCounterHistoryPins={setCounterHistoryPins}/>
				</CardFooter>
			</Card>
		</div>
    );
};

export default ProfileStatistics;
