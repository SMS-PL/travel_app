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
import VectorMapDialog from "@/components/VectorWorldMap/VectorMapDialog";
import {useInView} from "react-intersection-observer";
import {useInfiniteQuery} from "@tanstack/react-query";
import Post from "@/components/Post/Post";
import AddPost from "@/components/AddPost/AddPost";
import FriendshipButton from '@/components/Friendships/FriendshipButton';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import AchievementView from "@/components/Achievements/AchievementView";
import AchievementsDialog from "@/components/Achievements/AchievementsDialog";
import HorizontalBarChart from "@/components/Charts/HorizontalBarChart";

function Profile() {
	const { userId } = useParams();
	const isAuthenticated = useIsAuthenticated();
	const authHeader = useAuthHeader();
	const navigate = useNavigate();
	const auth = useAuthUser();

	const [isLoading, setIsLoading] = useState(true);
	const [userData, setUserData] = useState("");
	const [posts, setPosts] = useState([]);
	const [userCountry, setUserCountry] = useState(null);
	
	const [userAchievements, setUserAchievements] = useState(null);

	const {ref, inView} = useInView();
	const [addNewPost, setAddNewPost] = useState(false);
	
	// do poprawnego ładowania postów
	const location = useLocation();
	const key = location.pathname;


	useEffect(() => {
		if(inView) fetchNextPage();
	}, [inView]);

	const fetchPost = async (page) => {
		const response = await fetch(`http://localhost:5000/api/v1/posts/user/${userId}?pageSize=5&pageNumber=${page.pageParam}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json', 
				"Authorization": authHeader,
			},
		});
		return await response.json();
	}

	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
		refetch
	} = useInfiniteQuery({
		queryKey: ['posts', key],
		queryFn: fetchPost,
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages) => {
			return lastPage.length === 0 ? null : pages.length + 1;
		},
	});

	// refetch po dodaniu nowego posta
	useEffect(() => {
		if(addNewPost) {
			setAddNewPost(false);
			refetch({ refetchPage: (page, index) => index === 0 });
		}
	}, [addNewPost]);

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
		// console.log(userCountry);

		getUserCountries(10, 0);
		getUserAchievements(10, 0);

	}, [userId]);


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
				{/* <Skeleton className="h-[200px] w-[2000px] " /> */}
				<div className="h-[200px] w-[98vw] bg-gray-600 "></div>
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
			

			<div className="max-w-full w-[800px] flex flex-col justify-center items-center pt-14">

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

			<div className="flex flex-col max-w-full w-[800px] gap-4 pt-4 md:gap-8 md:pt-8">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 ">
                    <Card x-chunk="dashboard-01-chunk-2" className="col-span-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-base font-bold">
                                Visited countries
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* <div className="flex flex-row gap-1 justify-start items-end">
								<span className="text-5xl font-bold">
									{userCountry && userCountry.totalElements}
								</span>
								<span className="text-sm font-normal text-muted-foreground">
									/239
								</span>
							</div> */}

							<div className="flex items-baseline gap-1 text-5xl font-bold tabular-nums leading-none mb-2">
								{userCountry && userCountry.totalElements}
								<span className="text-base font-normal text-muted-foreground">
									/239
								</span>
							</div>
							<HorizontalBarChart value={userCountry && userCountry.totalElements} />


							{/* <span className="fill-foreground text-2xl font-bold">
								{`${userCountry && userCountry.totalElements}/239`}
							</span> */}
                        </CardContent>
                    </Card>

                    <Card x-chunk="dashboard-01-chunk-2" className="col-span-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
							<CardTitle className="text-base font-bold">
								Achievements earned
                            </CardTitle>
							
                        </CardHeader>
                        <CardContent>
							<div className="flex flex-row gap-1 justify-start items-end text-5xl font-bold">
								{userAchievements && userAchievements.totalElements}
							</div>
                        </CardContent>
                    </Card>

                    <Card x-chunk="dashboard-01-chunk-2" className="flex flex-col justify-between sm:grid-rows-2 col-span-2 sm:col-span-1">
                        <CardHeader className="pb-3">
							<CardTitle className="text-base font-bold">
								Achievements
                            </CardTitle>
							<CardDescription>
								Check all the achievements the user has unlocked
							</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex flex-row justify-start lg:justify-center items-start">
							{/* {userAchievements && (userAchievements.content.slice(0, 2).map((achievement, i) => {
								console.log(i);
								return (
									<AchievementView key={`userAchievements${achievement.id}`} achievement={achievement}/>
								)
							}))} */}
							<AchievementsDialog userAchievements={userAchievements} />
                        </CardFooter>
                    </Card>
					
					<Card x-chunk="dashboard-01-chunk-2" className="flex flex-col justify-between col-span-2 sm:col-span-1">
                        <CardHeader className="pb-3">
							<CardTitle className="text-base font-bold">
								Interactive map
								{/* <Icons.mapEmpty className="fill-muted-foreground w-7 h-7" />  */}
                            </CardTitle>
							<CardDescription>
								Check out the world map showing the countries the user has visited
							</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex flex-row justify-start lg:justify-center items-start">
							<VectorMapDialog userId={userId}/>
                        </CardFooter>
                    </Card>
                </div>
            </div>
			

			<div className="flex flex-col max-w-full w-[800px] gap-2 pt-5 md:pt-8 ">
				
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
			</div>

			
        </MainContainer>
    );
}

export default Profile;
