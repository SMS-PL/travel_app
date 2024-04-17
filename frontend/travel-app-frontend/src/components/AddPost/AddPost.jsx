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
 

function AddPost() {
	const authHeader = useAuthHeader();
	const navigate = useNavigate();
    const { toast } = useToast();

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
                setTimeout(() => { location.reload(); }, 1000);
                //window.location.reload();  // odświeża stronę, aby zobaczyć nowy post -> rozwiązanie tymczasowe
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
                            className="resize-y;"
                            {...register("description", {
                                required: "Description is required",
                            })}

                        />
                        <p className="text-red-600">{errors.content}</p>
                    </div>
                </CardContent>


                <CardFooter className="flex justify-between gap-5">
                    <Button variant="secondary" className="w-full text-foreground"><Icons.imageAdd className="h-6 w-6 fill-foreground mr-1"/> Add photo</Button>
                    <Button variant="default" type="submit" className="bg-primary w-full text-foreground"><Icons.send className="h-6 w-6 fill-foreground mr-1"/>Add post</Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default AddPost
