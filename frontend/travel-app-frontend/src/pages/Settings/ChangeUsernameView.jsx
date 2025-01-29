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
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';

const ChangeUsernameView = () => {
	const { userId } = useParams();
	const authHeader = useAuthHeader();
	const navigate = useNavigate();
	const auth = useAuthUser();
    const { toast } = useToast();

    const [usernameAvailabilityInfo, setUsernameAvailabilityInfo] = useState(null);

    const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: {errors, isValid}
	} = useForm();

    const onSubmit = async (values) => {
        if(isValid) {
            
            try {
                const response = await fetch("http://localhost:5000/api/v1/users/", {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json', 
                        "Authorization": authHeader,
                    },
                    body: JSON.stringify({
                        username: values.username,
                    })
                });

                const data = await response.json();

                if(!response.ok) {
                    throw new Error(data.message);
                }

                toast({
                    title: "Hurrah!",
                    description: "Username changed successfully!",
                    className: "bg-green-800 text-white"
                })

                navigate("/login");
                
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.message,
                })
            }
			
		} else {
            console.log("NOT VALID");
        }
    };

    const checkUsernameAvailability = (usernameValue) => {
        if(usernameValue) {
            fetch(`http://localhost:5000/api/v1/auth/username/${usernameValue}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Błąd sieci!');
                }
                return response.json();
            })
            .then(data => {
                if(data.available == true) {
                    setUsernameAvailabilityInfo(null);
                } else {
                    setUsernameAvailabilityInfo("Username is taken");
                }
            })
            .catch(error => {
                console.log(error.message);
            });
        } else {
            setUsernameAvailabilityInfo(null);
        }
    };

    return (
        <Card x-chunk="dashboard-04-chunk-1">
            <form onSubmit={handleSubmit(onSubmit)} >
                <CardHeader>
                    <CardTitle>Username</CardTitle>
                    <CardDescription>
                        Change your username
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    
                    <Input 
                        id="username"
                        placeholder="Username"
                        {...register("username", {
                            required: "Username is required",
                            pattern: {
                                value: /^[0-9a-z]{6,16}$/,
                                message: "Username is not validated",
                            },
                        })}
                        className={cn((errors.username != null) && "border-red-600 border-[2px]","m-0", "bg-secondary")}

                        onChange={(e) => checkUsernameAvailability(e.target.value)}
                    />
                    <p className={cn(usernameAvailabilityInfo === null ? "hidden" : "flex" ,"text-red-500 h-2 text-xs")} >
                        {usernameAvailabilityInfo !== null && usernameAvailabilityInfo}
                    </p>
                    <p className={cn(errors.username == null ? "hidden" : "flex" ,"text-red-500 h-5 text-xs")}>
                        {errors.username && errors.username.message}
                    </p>

                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" className="text-white">Save</Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default ChangeUsernameView;
