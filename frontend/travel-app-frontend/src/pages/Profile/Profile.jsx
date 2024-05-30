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
import { Link } from "react-router-dom";
import { Icons } from "@/components/icons";
import VectorMapDialog from "@/components/ui/VectorMapDialog";

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

			

			<div className="flex flex-col max-w-full w-[800px] gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 grid-cols-2 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <Card x-chunk="dashboard-01-chunk-2" className="col-span-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-md font-bold">
                                Total visited countries
                            </CardTitle>
                            {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
                        </CardHeader>
                        <CardContent className="">
                            <div className="text-4xl font-bold">{userCountry && userCountry.totalElements}</div>
                            {/* <p className="text-xs text-muted-foreground">
                                +19% from last month
                            </p> */}
                        </CardContent>
                    </Card>

                    <Card x-chunk="dashboard-01-chunk-2" className="col-span-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-md font-bold space-y-1.5 flex flex-row justify-between items-center">
								Total achievements
								<Icons.medalEmpty className="fill-muted-foreground w-7 h-7" /> 

                            </CardTitle>
                            {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
                        </CardHeader>
                        <CardContent>
							<div className="text-4xl font-bold">{userAchievements && userAchievements.totalElements}</div>
                            {/* <p className="text-xs text-muted-foreground">
                                +19% from last month
                            </p> */}
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-2" className="col-span-2">
                        <CardHeader>
							<CardTitle className="text-md font-bold space-y-1.5 flex flex-row justify-between items-center">
								Interactive map
								<Icons.mapEmpty className="fill-muted-foreground w-7 h-7" /> 

                            </CardTitle>
							<CardDescription>
								Check the world map where you can see the countries the user has visited
							</CardDescription>
                        </CardHeader>
                        <CardContent>
							<VectorMapDialog userId={userId}/>
                        </CardContent>
                    </Card>
{/* 
					<Card className="sm:col-span-2">
						<CardHeader className="pb-3">
							<CardTitle>Your Orders</CardTitle>
							<CardDescription className="max-w-lg text-balance leading-relaxed">
							Introducing Our Dynamic Orders Dashboard for Seamless Management and
							Insightful Analysis.
							</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button>Create New Order</Button>
						</CardFooter>
					</Card> */}

                </div>

                <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
                    <Card x-chunk="dashboard-01-chunk-5">
                        <CardHeader>
                            <CardTitle>Visited Countries Ids:</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-8">
							{userCountry && (userCountry.content.map((country, i) => {
								return <div key={`userCountry${country.countryId}${i}`}>{country.countryId} <br /></div>;
							}))}
                        </CardContent>
                    </Card>

                    <Card x-chunk="dashboard-01-chunk-5">
                        <CardHeader>
                            <CardTitle>Recently Sent Invoices</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-8">
							{userAchievements && (userAchievements.content.map(achievement => {
								return <div key={`userAchievements${achievement.id}`}>{achievement.title} <br /></div>;
							}))} 
                        </CardContent>
                    </Card>
                </div>
            </div>

			
        </MainContainer>
    );
}

export default Profile;
