import { useState, useEffect, useContext } from 'react';
import MainContainer from "@/components/MainContainer/MainContainer";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

function Settings() {
	const { userId } = useParams();
	const authHeader = useAuthHeader();
	const navigate = useNavigate();
	const auth = useAuthUser();


	// ładowanie danych o użytkowniku
	useEffect(() => {

	}, []);

	// const getUserData = () => {
	// 	fetch(`http://localhost:5000/api/v1/users/${userId}`, {
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json', 
	// 			"Authorization": authHeader,
	// 		},
			
	// 	})
	// 	.then(response => {
	// 		if (!response.ok) {
	// 			throw new Error('Błąd sieci!');
	// 		}
	// 		return response.json();
	// 	})
	// 	.then(data => {
	// 		setUserData(data);
	// 		setImageProfileURL(data.photoUrl);
	// 		setImageBackgroundURL(data.backgroundUrl);
			
	// 	})
	// 	.catch(error => {
	// 		console.log(error.message);
	// 		console.error('Wystąpił błąd podczas wczytywania profilu użytkownika:', error);
	// 		navigate("/");
	// 	});
	// };

    return (
        <MainContainer type="settings">
            <p className="text-muted-foreground text-base md:text-lg mt-[-15px] mb-4 md:mb-8 text-center">
                Manage your account settings
            </p>
            <div className="grid gap-6">
                <Card x-chunk="dashboard-04-chunk-1">
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <Input 
                                className="bg-secondary"
                                placeholder="Password..." 
                            />

                            <Input
                                className="mt-4 bg-secondary"
                                placeholder="Repeat password..." 
                            />

                        </form>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button className="text-white">Save</Button>
                    </CardFooter>
                </Card>

                <Card x-chunk="dashboard-04-chunk-1">
                    <CardHeader>
                        <CardTitle>Email</CardTitle>
                        <CardDescription>
                            Change your email
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <Input 
                                className="bg-secondary"
                                placeholder="Email..." 
                            />
                        </form>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button className="text-white">Save</Button>
                    </CardFooter>
                </Card>
                
                <Card x-chunk="dashboard-04-chunk-1">
                    <CardHeader>
                        <CardTitle>First Name</CardTitle>
                        <CardDescription>
                            Change first name
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <Input 
                                className="bg-secondary"
                                placeholder="First name..." 
                            />
                        </form>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button className="text-white">Save</Button>
                    </CardFooter>
                </Card>

                <Card x-chunk="dashboard-04-chunk-1">
                    <CardHeader>
                        <CardTitle>Last Name</CardTitle>
                        <CardDescription>
                            Change last name
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <Input
                                className="bg-secondary"
                                placeholder="Last name..." 
                            />
                        </form>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button className="text-white">Save</Button>
                    </CardFooter>
                </Card>
          </div>
			
        </MainContainer>
    );
}

export default Settings;
