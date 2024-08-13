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
import { Icons } from "@/components/icons";
import { useState, useEffect } from 'react';

function AddPost({setAddNewPost}) {
	const authHeader = useAuthHeader();
	const navigate = useNavigate();
    const { toast } = useToast();

    const [postCountryId, setPostCountryId] = useState(null);

    const {
        register,
        handleSubmit,
        // watch,
        reset,
        formState: { errors, isValid },
    } = useForm();

    const onSubmit = async (values) => {
        await getCountryByCoordinates();
        
        if (isValid) {
            await fetch("http://localhost:5000/api/v1/posts/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    "Authorization": authHeader,
                },
                body: JSON.stringify({
                    "content": values.description,
                    "countryId": +postCountryId,
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
                toast({
                    title: "Hurrah!",
                    description: "Post added correctly!",
                    className: "bg-green-800"
                })
                
                reset();
                setAddNewPost(true);
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

    const getCountryByCoordinates = async () => {

        if (navigator.geolocation) {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const xCoordinate = await position.coords.latitude;
            const yCoordinate = await position.coords.longitude;

            await fetch(`http://localhost:5000/api/v1/countries/cord/${xCoordinate}/${yCoordinate}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 
                    "Authorization": authHeader,
                },
            })
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                    throw new Error("Blad sieci!");
                }
                return response.json();
            })
            .then(data => {
                setPostCountryId(data.id);
                console.log("!!!", data.id);
                console.log(`xCoordinate = ${xCoordinate}, yCoordinate = ${yCoordinate}`);
            })
            .catch(error => {
                console.log(error);
                toast({
                    variant: "destructive",
                    title: "Uh oh! Failed to get location!",
                    description: error.message,
                })
            });
        } else {
            console.log("navigator.geolocation nie działa");
            setPostCountryId(-1);
        }
    };

    return (
        <Card className="mt-5 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="">
                {/* <CardHeader className="flex flex-col p-3"></CardHeader> */}
                
                <CardContent className="flex flex-row items-center w-full pt-5"> 
                    <Avatar>
                        <AvatarImage src="https://picsum.photos/200/200" alt="stock img" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    
                    <div className="w-full ml-4">
                        <Textarea
                            id="description"
                            placeholder="Tell us a little bit about yourself"
                            className="resize-y"

                            {...register("description", {
                                required: "Description is required",
                            })}

                        />
                        {errors.description && errors.description.type === "required" && (
                            <p className="text-red-500 text-sm">Description is required!</p>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex justify-center items-center gap-4">
                    <Button variant="secondary" className="w-fit text-foreground">
                        <Icons.imageAdd className="h-6 w-6 fill-foreground mr-1"/>
                        Add photo
                    </Button>
                    <Button variant="default" type="submit" className="w-fit bg-primary text-white">
                        <Icons.send className="h-6 w-6 fill-white mr-1"/>
                        Add post
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default AddPost
