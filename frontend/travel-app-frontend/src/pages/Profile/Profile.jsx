import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useState, useEffect } from 'react';
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
			// console.log("Profil wczytano poprawnie!");
			setUserData(data);
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
			console.log(data);
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
			console.log(data);
			setUserFriendsList(data);
		})
		.catch(error => {
			console.log(error.message);
		});
	};


    return (
        <MainContainer type="profile">

			<div className="relative flex flex-col justify-center items-center">
				<img src="https://picsum.photos/800/200" className="w-full h-[200px] rounded-md object-cover" alt="" />
				<Avatar className="absolute w-[110px] h-[110px] border-primary border-4 bottom-[-50px]">
					<AvatarImage src="https://picsum.photos/200/200" alt="stock img" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</div>
			

			<div className="w-full flex flex-col justify-center items-center pt-14">

				<div className="flex flex-col justify-center items-center">
					<h2 className="text-center scroll-m-20 text-lg font-extrabold tracking-tight lg:text-2xl pt-1">
						{userData.firstName} <span className="text-primary">{userData.lastName}</span>
					</h2>
					<h3 className="text-center scroll-m-20 text-lg font-bold tracking-tight lg:text-xl">
						@{userData.username}
					</h3>
					<p>{userData.about}</p>
				</div>

				<FriendshipButton userId={userId} />
			</div>

			<div className="w-full mt-4 grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 md:mt-8">
				<Card x-chunk="dashboard-01-chunk-2" className="w-full flex flex-col justify-between col-span-1 ">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-lg font-bold">
							Visited countries
						</CardTitle>
					</CardHeader>

					<CardContent className="pb-4">
						<div className="flex items-baseline gap-1 text-5xl font-bold tabular-nums leading-none mb-2">
							{userCountry && userCountry.totalElements}
							<span className="text-base font-normal text-muted-foreground">
								{`/${countriesLength}`}
							</span>
						</div>
						<HorizontalBarChart value={userCountry && userCountry.totalElements} countriesLength={countriesLength}/>
					</CardContent>

					<CardFooter>
						<VectorMapDialog userId={userId}/>
					</CardFooter>
				</Card>

				<Card x-chunk="dashboard-01-chunk-2" className="w-full flex flex-col justify-between col-span-1 ">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-lg font-bold">
							Achievements earned
						</CardTitle>
					</CardHeader>

					<CardContent className="pb-4">
						<div className="flex flex-row gap-1 justify-start items-end text-5xl font-bold">
							{userAchievements && userAchievements.totalElements}
						</div>
					</CardContent>

					<CardFooter>
						<AchievementsDialog userAchievements={userAchievements} />
					</CardFooter>
				</Card>

				<Card x-chunk="dashboard-01-chunk-2" className="w-full flex flex-col justify-between col-span-1 ">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-lg font-bold">
							Friends
						</CardTitle>
					</CardHeader>

					<CardContent className="pb-4">
						<div className="flex flex-row gap-1 justify-start items-end text-5xl font-bold">
							{userFriendsList && userFriendsList.length}
						</div>
					</CardContent>

					<CardFooter>
						{/* <AchievementsDialog userAchievements={userAchievements} /> */}
					</CardFooter>
				</Card>

			</div>

			<div className="w-full flex flex-col ">
				<h3 className=" text-lg font-extrabold text-center pt-4">Posts</h3>
				<Feed type="profile" userId={userId} />
			</div>


			{/* <div className="flex flex-col max-w-full w-[700px] gap-2 pt-5 md:pt-8 ">
				
				<h1 className="text-2xl font-extrabold tracking-tight lg:text-2xl text-center pb-0 md:pb-2">Posts</h1>
				{auth.id === userId && <AddPost setAddNewPost={setAddNewPost}/> }
				
				{status == "pending" ? (
					<Card className="mt-5 w-full">
						<CardHeader className="flex flex-row">
							<Skeleton className="h-12 w-12 rounded-full" />
							<div className="px-2 w-fit">
								<Skeleton className="h-4 w-[250px]" />
								<Skeleton className="h-4 w-[200px] mt-2" />
							</div>
						</CardHeader>
						<CardContent>
							<Skeleton className="h-14 w-full mb-5" />
							<Skeleton className="w-full h-[500px]" />
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="outline">Likes</Button>
							<Button variant="outline">Comments</Button>
						</CardFooter>
					</Card>

				) : (
					data.pages[0].empty == true ? (
						<h1 className="text-sm font-extrabold tracking-tight lg:text-md text-center mt-8">No posts...</h1>
					) : (
						<>
							{data.pages.map((group, i) => (
								group.content.map((post) => (
									<Post
										key={post.id}
										postData={post}
										setAddNewPost={setAddNewPost}
									/>
								))
							))}
						</>
					)
				)}

				{hasNextPage && <div ref={ref} className=""></div>}
			</div> */}

			
        </MainContainer>
    );
}

export default Profile;
