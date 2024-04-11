import Navbar from "../../components/Navbar/Navbar";
import { useParams } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useState, useEffect } from 'react';

function Profile() {
	const { userId } = useParams();
	const authHeader = useAuthHeader();

	const [userData, setUserData] = useState("");

	useEffect(() => {
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
			console.log("Profil wczytano poprawnie!");
			setUserData(data);
			
		})
		.catch(error => {
			console.log(error.message);
			console.error('Wystąpił błąd podczas wczytywania profilu użytkownika:', error);
		});

	}, [userId]);


    return (
        <div className="flex flex-col w-full">
			<Navbar />
			<main className="flex flex-col justify-center items-center py-10">
				<h1>AUTORYZOWANA STRONA</h1>
				<h3 className="font-black text-2xl">PROFIL</h3>
				{userData.firstName}<br />
				{userData.lastName}<br />
				@{userData.username}<br />
			</main>
        </div>
    );
}

export default Profile;
