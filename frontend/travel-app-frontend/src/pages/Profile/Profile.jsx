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
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { Icons } from "@/components/icons";
import FriendshipButton from '@/components/FriendshipsButton/FriendshipButton';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
// import HoverPopoverInputInfo from "@/components/ui/HoverPopoverInputInfo";
import Feed from "@/layouts/Feed/Feed";
import ProfileImageUploader from "@/pages/Profile/ImageUploader/ProfileImageUploader";
import BackgroundImageUploader from "@/pages/Profile/ImageUploader/BackgroundImageUploader";
import ProfileSettingsDialog from '@/pages/Profile/ProfileSettingsDialog/ProfileSettingsDialog';
import ProfileStatistics from '@/pages/Profile/Statistics/ProfileStatistics';

function Profile() {
	const { userId } = useParams();
	const authHeader = useAuthHeader();
	const navigate = useNavigate();
	const auth = useAuthUser();

	const [isLoading, setIsLoading] = useState(true);

	// dane o użytkowniku
	const [userData, setUserData] = useState("");
	
	// zmienne do uploadowania zdjęć
	const [uploadingImageProfile, setUploadingImageProfile] = useState(false);
	const [imageProfileURL, setImageProfileURL] = useState("");
	const [uploadingImageBackground, setUploadingImageBackground] = useState(false);
	const [imageBackgroundURL, setImageBackgroundURL] = useState("");


	// ładowanie danych o użytkowniku
	useEffect(() => {
		setIsLoading(true);
		getUserData();
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

    return (
        <MainContainer type="profile">

			<div className="relative flex flex-col justify-center items-center ">
				
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

					{/* <ProfileSettingsDialog /> */}

				</div>

				<FriendshipButton userId={userId} className="mt-3"/>
			</div>

			<ProfileStatistics userId={userId} />

			<div className="w-full flex flex-col ">
				<h3 className=" text-lg font-extrabold text-center pt-4">Posts</h3>
				<Feed type="profile" userId={userId} />
			</div>
			
        </MainContainer>
    );
}

export default Profile;
