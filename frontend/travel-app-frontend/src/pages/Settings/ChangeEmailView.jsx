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

const ChangeEmailView = () => {
	const { userId } = useParams();
	const authHeader = useAuthHeader();
	const navigate = useNavigate();
	const auth = useAuthUser();
    const { toast } = useToast();

    const [emailAvailabilityInfo, setEmailAvailabilityInfo] = useState(null);

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
                        email: values.email,
                    })
                });

                const data = await response.json();

                if(!response.ok) {
                    throw new Error(data.message);
                }
                

                toast({
                    title: "Hurrah!",
                    description: "E-mail changed successfully!",
                    className: "bg-green-800 text-white"
                })

                
                
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

    const checkEmailAvailability = (emailValue) => {
        if(emailValue) {
            fetch(`http://localhost:5000/api/v1/auth/email/${emailValue}`, {
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
                    setEmailAvailabilityInfo(null);
                } else {
                    setEmailAvailabilityInfo("Email is taken");
                }
            })
            .catch(error => {
                console.log(error.message);
            });
        } else {
            setEmailAvailabilityInfo(null);
        }
    };

    return (
        <Card x-chunk="dashboard-04-chunk-1">
            <form onSubmit={handleSubmit(onSubmit)} >
                <CardHeader>
                    <CardTitle>Email</CardTitle>
                    <CardDescription>
                        Change your email
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    
                    <Input 
                        className={cn(((emailAvailabilityInfo != null) || (errors.email != null)) && "border-red-600 border-[2px]","bg-secondary")}
                        placeholder="Email..."
                        id="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
                                message: "Email is not validated",
                            },
                        })}
                        onChange={(e) => checkEmailAvailability(e.target.value)}

                    />
                    <p className={cn(emailAvailabilityInfo === null ? "hidden" : "flex" ,"text-red-500 h-2 text-xs")} >{emailAvailabilityInfo !== null && emailAvailabilityInfo}</p>
                    <p className={cn(errors.email == null ? "hidden" : "flex" ,"text-red-500 h-5 text-xs")}>{errors.email && errors.email.message}</p>

                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" className="text-white">Save</Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default ChangeEmailView;
