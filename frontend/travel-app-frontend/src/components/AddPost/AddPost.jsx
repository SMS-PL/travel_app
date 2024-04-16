import React from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useNavigate } from 'react-router-dom';

import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function AddPost() {
	const authHeader = useAuthHeader();
	const navigate = useNavigate();
    const { toast } = useToast();
	const auth = useAuthUser();

    const {
        register,
        handleSubmit,
        // watch,
        // reset,
        formState: { errors, isValid },
    } = useForm();

    const onSubmit = async (values) => {
        if (isValid) {
            fetch("http://localhost:5000/api/v1/posts/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    "Authorization": authHeader,
                },
                body: JSON.stringify({
                    "content": values.description,
                    "countryId": 1,                  // na razie jest na sztywno
                    "imageUrl": "image.pl/image"     // na razie jest na sztywno
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Błąd sieci!');
                }
                return response.json();
            })
            .then(data => {
                window.location.reload();  // odświeża stronę, aby zobaczyć nowy post -> rozwiązanie tymczasowe
                toast({
                    title: "Hurrah!",
                    description: "Post added correctly!",
                    className: "bg-green-800"
                })
                console.log(data);
                
            })
            .catch(error => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.message,
                })
                console.log(error.message);
            });

        } else {
            alert("INVALID");
        }
    };

    return (
        <Card>
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <CardHeader className="flex flex-col items-center">
                    <div >
                        <h1 className="text-center  scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl">
                            Hi <span className="text-primary">{auth.firstName}</span>!
                        </h1>
                        <h3 className="pb-5 text-center font-semibold scroll-m-20 text-xl tracking-tight py-2">
                            Tell us where are you?
                        </h3>
                    </div>

                    <div className="flex flex-row items-center w-full">
                        <Avatar>
                            <AvatarImage src="https://picsum.photos/200/200" alt="stock img" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        
                        <div className="w-full ml-4">
                            <Textarea
                                id="description"
                                placeholder="Tell us a little bit about yourself"
                                className="resize-none"
                                {...register("description", {
                                    required: "Description is required",
                                })}

                            />
                            <p className="text-red-600">{errors.content}</p>
                        </div>
                    </div>
                </CardHeader>
                
                {/* <CardContent> </CardContent> */}
                <CardFooter className="flex justify-between">
                    
                        {/* <Input
                            id="img"
                            type="file"
                            // {...register("email", {
                            //     required: "Email is required",
                            //     pattern: {
                            //         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
                            //         message: "Email is not validated",
                            //     },
                            // })}
                        /> */}

                    <Button variant="outline" type="submit" className="bg-primary w-full">Add post</Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default AddPost
