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
import SelectCountry from "@/layouts/Feed/Post/SelectCountry";
import { Separator } from "@/components/ui/separator";
import HoverPopoverInputInfo from "@/components/ui/HoverPopoverInputInfo";

const AddPost = ({setAddNewPost}) => {
	const authHeader = useAuthHeader();
	const navigate = useNavigate();
    const { toast } = useToast();

    // zmienne do SelectCountry
    const [countryId, setCountryId] = useState(""); // id kraju wybranego w SelectCountry
    const [value, setValue] = React.useState("");  // nazwa kraju wybranego w SelectCountry
    const [countryError, setCountryError] = useState(""); // wiadomość o błędzie z SelectCountry

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isValid },
    } = useForm();

    const onSubmit = async (values) => {
        
        if (isValid) {
            await fetch("http://localhost:5000/api/v1/posts/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    "Authorization": authHeader,
                },
                body: JSON.stringify({
                    "content": values.description,
                    "countryId": +countryId,
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

                setValue("");
                setCountryId("");

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

    return (
        <Card className="w-full mt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="">
                {/* <CardHeader className="flex flex-col p-3"></CardHeader> */}
                
                <CardContent className="flex flex-row items-center w-full pt-5 relative"> 
                    <Avatar>
                        <AvatarImage src="https://picsum.photos/200/200" alt="stock img" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    
                    <div className="w-full ml-4">
                        <Textarea
                            id="description"
                            placeholder="Tell us a little bit about yourself"
                            className="resize-y rounded-2xl bg-secondary border-0"

                            {...register("description", {
                                required: "Description is required",
                            })}

                        />
                        {errors.description && errors.description.type === "required" && (
                            <p className="text-red-500 text-sm">Description is required!</p>
                        )}
                    </div>

                    <div className="absolute right-2 top-[6px] z-50">
                        <HoverPopoverInputInfo
                            content={"To add a post, you must include a description, add a photo and the location of the photo you took."}
                        />
                    </div>

                </CardContent>

                <CardFooter className="flex flex-row justify-between items-start gap-4">
                    
                    <div className="flex flex-row justify-center items-start gap-1">
                        <Button variant="ghost" className="w-fit text-foreground p-2" type="button">
                            <Icons.imageAdd className="h-7 w-7 fill-primary"/>
                        </Button>

                        <div className="flex flex-col justify-center items-center">
                            <SelectCountry value={value} setValue={setValue} setCountryId={setCountryId} />
                            {/* <p className=" text-red-500 text-sm">{countryError}</p> */}
                        </div>
                    </div>

                    <div className="flex flex-row justify-center items-center gap-2">
   
                        <Button
                            disabled={!isValid || value == ''}
                            variant="default" 
                            type="submit" 
                            className="w-fit bg-primary text-white"
                        >
                            <Icons.send className="h-6 w-6 fill-white mr-1"/>
                            Add post
                        </Button>
                    </div>

                </CardFooter>
            </form>
        </Card>
    );
};

export default AddPost;
