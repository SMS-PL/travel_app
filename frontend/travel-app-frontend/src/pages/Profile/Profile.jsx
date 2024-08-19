import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useState, useEffect, useContext } from 'react';
import MainContainer from "@/components/MainContainer/MainContainer";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { Icons } from "@/components/icons";
import VectorMapDialog from "@/pages/Profile/VectorWorldMap/VectorMapDialog";
import FriendshipButton from '@/components/FriendshipsButton/FriendshipButton';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import AchievementsDialog from "@/pages/Profile/Achievements/AchievementsDialog";
import HorizontalBarChart from "@/pages/Profile/HorizontalBarChart/HorizontalBarChart";
// import HoverPopoverInputInfo from "@/components/ui/HoverPopoverInputInfo";
import Feed from "@/layouts/Feed/Feed";
import FriendsListDialog from "@/pages/Profile/FriendsListDialog/FriendsListDialog"
import { RefreshFriendshipContext } from '@/contexts/RefreshFriendshipContext';
import ProfileImageUploader from "@/pages/Profile/ImageUploader/ProfileImageUploader";
import BackgroundImageUploader from "@/pages/Profile/ImageUploader/BackgroundImageUploader";

function Profile() {
	const { userId } = useParams();
	const isAuthenticated = useIsAuthenticated();
	const authHeader = useAuthHeader();
	const navigate = useNavigate();
	const auth = useAuthUser();

	const [isLoading, setIsLoading] = useState(true);
	const [userData, setUserData] = useState("");
	const [userCountry, setUserCountry] = useState(null);
	
	const [userAchievements, setUserAchievements] = useState(null);
	const [userFriendsList, setUserFriendsList] = useState(null);
	
    const [countriesLength, setCountriesLength] = useState(0);

	const { globalRefreshFriendship, setGlobalRefreshFriendship } = useContext(RefreshFriendshipContext);

	// zmienne do uploadowania zdjęć
	const [uploadingImageProfile, setUploadingImageProfile] = useState(false);
	const [imageProfileURL, setImageProfileURL] = useState("");

	const [uploadingImageBackground, setUploadingImageBackground] = useState(false);
	const [imageBackgroundURL, setImageBackgroundURL] = useState("");

	// ładowanie danych o użytkowniku
	useEffect(() => {
		setIsLoading(true);

		getUserData();
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

	const getUserData = () => {
		fetch(`http://localhost:5000/api/v1/users/${userId}`, {
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
			setUserData(data);
			// console.log(data);
			setImageProfileURL(data.photoUrl);
			setImageBackgroundURL(data.backgroundUrl);

			setIsLoading(false);
			
		})
		.catch(error => {
			console.log(error.message);
			console.error('Wystąpił błąd podczas wczytywania profilu użytkownika:', error);
			navigate("/");
		});
	};


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

	const getCountryById = (countryId) => {
		fetch(`http://localhost:5000/api/v1/countries/${countryId}`, {
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
        <MainContainer type="profile">

			<div className="relative flex flex-col justify-center items-center">
				
				{(!imageBackgroundURL || imageBackgroundURL == "") ? (
					<div className="w-full h-[200px] rounded-md bg-secondary"></div>
				) : (
					<img src={imageBackgroundURL} className="w-full h-[200px] rounded-md object-cover bg-black" alt="" />
				)}

				{auth.id == userId &&
					<BackgroundImageUploader 
						uploadingImage={uploadingImageBackground}
						setUploadingImage={setUploadingImageBackground}
						imageURL={imageBackgroundURL}
						setImageURL={setImageBackgroundURL}
					/> 
				}
				
				<Avatar className="absolute w-[110px] h-[110px] bottom-[-50px] border-[3px] border-primary">
					<AvatarImage src={imageProfileURL} alt="stock img" className="object-cover bg-black" />
					<AvatarFallback>{userData &&`${userData.firstName[0]}${userData.lastName[0]}`}</AvatarFallback>
					{auth.id == userId &&
						<ProfileImageUploader 
							uploadingImage={uploadingImageProfile}
							setUploadingImage={setUploadingImageProfile}
							imageURL={imageProfileURL}
							setImageURL={setImageProfileURL}
						/>
					}
				</Avatar>

			</div>
			

			<div className="w-full flex flex-col justify-center items-center pt-14">

				<div className="flex flex-col justify-center items-center">
					<h2 className="text-center scroll-m-20 text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight pt-1">
						{userData.firstName} <span className="text-primary">{userData.lastName}</span>
					</h2>
					<h3 className="text-center scroll-m-20 text-lg font-bold tracking-tight lg:text-xl">
						@{userData.username}
					</h3>
					<p>{userData.about}</p>
				</div>

				<FriendshipButton userId={userId} className="mt-3"/>
			</div>

			<div className="w-full mt-4 grid  gap-2 sm:gap-4 md:gap-6 md:mt-8 grid-cols-2 sm:grid-cols-3">
				<Card x-chunk="dashboard-01-chunk-2" className="w-full flex flex-col justify-between col-span-2 sm:col-span-1 p-4 ">
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
						{/* <AchievementsDialog userAchievements={userAchievements} /> */}
						<FriendsListDialog userFriendsList={userFriendsList} />
					</CardFooter>
				</Card>
			</div>

			<div className="w-full flex flex-col ">
				<h3 className=" text-lg font-extrabold text-center pt-4">Posts</h3>
				<Feed type="profile" userId={userId} />
			</div>
			
        </MainContainer>
    );
}

export default Profile;
