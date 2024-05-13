import Navbar from "../../components/Navbar/Navbar";
import { useParams } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useState, useEffect } from 'react';
import MainContainer from "@/components/MainContainer/MainContainer";
import { useNavigate } from "react-router-dom";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
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
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function Profile() {
	const { userId } = useParams();
	const auth = useAuthUser();
	const isAuthenticated = useIsAuthenticated();
	const authHeader = useAuthHeader();
	const navigate = useNavigate();
	
	const [isLoading, setIsLoading] = useState(true);
	const [userData, setUserData] = useState("");
	const [posts, setPosts] = useState([]);
	const [friendshipStatus, setFriendshipStatus] = useState("");
	const [userCountry, setUserCountry] = useState(null);

	const [userAchievements, setUserAchievements] = useState(null);

	const [refetch, setRefetch] = useState(false);

	// ładowanie danych o użytkowniku
	useEffect(() => {
		setIsLoading(true);
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
		console.log(userCountry);

		getUserCountries(10, 0);
		getUserAchievements(10, 0);

	}, [userId]);

	// wczytywanie danych o friends
	useEffect(() => {
		setRefetch(false);
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
		
	}, [refetch]);


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
			setRefetch(true);
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
			setRefetch(true);
		})
		.catch(error => {
			console.log(error.message);
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
			console.log(data);
			setUserCountry(data);
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

    return (
        <MainContainer type="profile">

			<div className="relative flex flex-col justify-center items-center">
				<Skeleton className="h-[200px] w-[2000px] " />

				{/* {isLoading ? (
					<Skeleton className="h-[200px] w-[2000px] " />
				) : (
					<img src="https://picsum.photos/2000/300" alt="" className="w-full"/>
				)} */}

				<Avatar className="absolute w-[90px] h-[90px] border-primary border-4 bottom-[-50px]">
					<AvatarImage src="https://picsum.photos/200/200" alt="stock img" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</div>


			<div className="max-w-full w-[700px] flex flex-col justify-center items-center pt-14">

				<div className="flex flex-col justify-center items-center">
					<h2 className="text-center scroll-m-20 text-lg font-extrabold tracking-tight lg:text-2xl pt-1">
						{userData.firstName} <span className="text-primary">{userData.lastName}</span>
					</h2>
					<h3 className="text-center scroll-m-20 text-lg font-bold tracking-tight lg:text-xl">
						@{userData.username}
					</h3>
					<p>{userData.about}</p>
				</div>

				{userId === auth.id ? null : (
					<div className="mt-4">
						{friendshipStatus === "STRANGER" ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" onClick={addFriend}>
										➕ Add friend
									</Button>
								</DropdownMenuTrigger>
							</DropdownMenu>
						) : null }

						{ friendshipStatus === "SENT" ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline">
										📩 Invitation sent
									</Button>
								</DropdownMenuTrigger>
							</DropdownMenu>
						) : null }

						{ friendshipStatus === "RECEIVED" ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" onClick={addFriend}>
										✔️ Confirm the invitation
									</Button>
								</DropdownMenuTrigger>
							</DropdownMenu>
						) : null }

						{ friendshipStatus === "FRIEND" ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline">
										👥 Friend
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-full">
									<DropdownMenuItem onClick={removeFriend} className="cursor-pointer">❌ Remove friend</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : null }

					</div>
				)}
			</div>

			<div className="max-w-full w-[700px]">
				<Card className="mt-5 w-full">
					<CardHeader className="flex flex-row pb-1">
						
					</CardHeader>

					<CardContent>
						<div className="flex flex-row">
							<div className="flex flex-col w-[50%]">
								<h1>Visited Countries Ids:</h1>
							
								{userCountry && (userCountry.content.map(country => {
									return <div key={`userCountry${country.countryId}`}>{country.countryId} <br /></div>;
								}))}
							</div>

							<div className="flex flex-col w-[50%]">
							<h1>Achievements:</h1>
								{userAchievements && (userAchievements.content.map(achievement => {
									return <div key={`userAchievements${achievement.id}`}>{achievement.title} <br /></div>;
								}))} 

							</div>
							
						</div>

					</CardContent>
					
					<CardFooter className="flex justify-between">
					</CardFooter>
				</Card>
            </div>

        </MainContainer>
    );
}

export default Profile;
