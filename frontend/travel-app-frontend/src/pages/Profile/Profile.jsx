import Navbar from "../../components/Navbar/Navbar";
import { useParams } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useState, useEffect } from 'react';
import MainContainer from "@/components/MainContainer/MainContainer";
import { useNavigate } from "react-router-dom";

function Profile() {
	const { userId } = useParams();
	const authHeader = useAuthHeader();
	const navigate = useNavigate();

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
			navigate("/");
		});

	}, [userId]);


    return (
        <MainContainer>
			<h3 className="font-black text-2xl">PROFIL</h3>
			{userData.firstName}<br />
			{userData.lastName}<br />
			@{userData.username}<br />
	
        </MainContainer>
    );
}

export default Profile;
