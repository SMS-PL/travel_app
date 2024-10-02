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

const ChangeFirstNameView = () => {
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
                    headers: {
                        'Content-Type': 'application/json', 
                        "Authorization": authHeader,
                    },
                    body: JSON.stringify({
                        firstName: values.firstName,
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

    return (
        <Card x-chunk="dashboard-04-chunk-1">
            <form onSubmit={handleSubmit(onSubmit)} >
                <CardHeader>
                    <CardTitle>First Name</CardTitle>
                    <CardDescription>
                        Change your first name
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    
                    <Input 
                        className={cn((errors.firstName != null) && "border-red-600 border-[2px]","bg-secondary")}
                        id="firstName"
                        placeholder="First name..."
                        {...register("firstName", {
                            required: "First name is required",
                            pattern: {
                                value: /^[A-ZŁŚĆŻŹ][a-ząćęłńóśżź]+$/,
                                message: "First name is not validated",
                            },
                        })}
                    />
                    <p className={cn(errors.firstName == null ? "hidden" : "flex" ,"text-red-500 h-5 text-xs")}>{errors.firstName && errors.firstName.message}</p>

                    
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" className="text-white">Save</Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default ChangeFirstNameView;
