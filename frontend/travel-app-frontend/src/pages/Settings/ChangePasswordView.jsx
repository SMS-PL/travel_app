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

const ChangePasswordView = () => {
	const { userId } = useParams();
	const authHeader = useAuthHeader();
	const navigate = useNavigate();
	const auth = useAuthUser();
    const { toast } = useToast();


    const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: {errors, isValid}
	} = useForm();

    const onSubmit = async (values) => {
        console.log("WHAT")
        if(isValid) {
            
            try {
                const response = await fetch("http://localhost:5000/api/v1/users", {
                    method: 'PATCH',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json', 
                        "Authorization": authHeader,
                    },
                    body: JSON.stringify({
                        password: values.password,
                    })
                });

                const data = await response.json();

                if(!response.ok) {
                    throw new Error(data.message);
                }

                toast({
                    title: "Hurrah!",
                    description: "Successfully registered!",
                    className: "bg-green-800"
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

	// const changePassword = () => {
	// 	fetch(`http://localhost:5000/api/v1/users`, {
	// 		method: 'PATCH',
	// 		headers: {
	// 			'Content-Type': 'application/json', 
	// 			"Authorization": authHeader,
    //             body: JSON.stringify(),
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
        <Card x-chunk="dashboard-04-chunk-1">
            <form onSubmit={handleSubmit(onSubmit)} >
                <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                        Change your password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    
                    <Input 
                        className={cn((errors.password != null) && "border-red-600 border-[2px]","bg-secondary")}
                        placeholder="Password..."
                        id="password" 
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message:
                                    "Password must have at least 8 characters",
                            },
                            maxLength: {
                                value: 32,
                                message:
                                    "Password must have at most 32 characters",
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}/,
                                message: "Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number",
                            },
                        })}
                    />
                    <p className={cn(errors.password == null ? "hidden" : "flex" ,"text-red-500 h-5 text-xs")}>{errors.password && errors.password.message}</p>

                    <Input
                        className={cn((errors.passwordRepeated != null) && "border-red-600 border-[2px]","mt-4 bg-secondary")}

                        placeholder="Repeat password..."
                        id="passwordRepeated" 
                        type="password"
                        {...register("passwordRepeated", {
                            required: "Repeated password is required",
                            validate: value =>value === watch("password") || "The passwords do not match"
                        })}
                    />
                    <p className={cn(errors.passwordRepeated == null ? "hidden" : "flex" ,"text-red-500 h-5 text-xs")}>{errors.passwordRepeated && errors.passwordRepeated.message}</p>


                    
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" className="text-white">Save</Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default ChangePasswordView;
