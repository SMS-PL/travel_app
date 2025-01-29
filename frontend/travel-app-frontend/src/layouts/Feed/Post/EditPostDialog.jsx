import React, {useState, useEffect} from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { Icons } from "@/components/icons";
import { cn } from '@/lib/utils';
import HoverPopoverInputInfo from "@/components/ui/HoverPopoverInputInfo";
import { useToast } from "@/components/ui/use-toast";

const EditPostDialog = ({postId, prevContent, isOpen, setIsOpen, setRefetchPosts, onClose}) => {
    const authHeader = useAuthHeader();
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isValid },
    } = useForm({defaultValues: {
        editDescription: prevContent,
    }});

    const onSubmit = async (values) => {
        if (isValid) {
            await fetch(`http://localhost:5000/api/v1/posts/${postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json', 
                    "Authorization": authHeader,
                },
                body: JSON.stringify({
                    "content": values.editDescription,
                })
            })
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                    throw new Error("Blad sieci!");
                }
                return response.json();
            })
            .then(data => {
                toast({
                    title: "Hurrah!",
                    description: "Post edited correctly!",
                    className: "bg-green-800 text-white"
                })
                setRefetchPosts(true);
                onClose();
            })
            .catch(error => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Failed to edit post!",
                    description: error.message,
                })
            });

        } else {
            alert("INVALID");
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogTrigger>
                
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-full w-[500px] rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Edit post description</AlertDialogTitle>
                        <AlertDialogDescription className="hidden">
                            {/* Make changes to your profile here. Click save when you're done. */}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    
                    <div className="grid gap-1 py-4 w-full">
                        <Textarea
                            id="editDescription"
                            placeholder="Tell us a little bit about yourself"
                            className={cn(errors.description ? "border-2 border-red-600  focus:border-red-500" : "text-foreground border-0", " resize-y rounded-2xl bg-secondary min-h-[100px]")}
                            
                            {...register("editDescription", {
                                maxLength: {
                                    value: 255,
                                    message: "The maximum length of the comment is 255 characters",
                                },
                                required: "Description is required",
                            })}

                        />

                        {errors && errors.editDescription && errors.editDescription.type === "required" && (
                            <p className="text-red-500 text-sm">Description is required!</p>
                        )}
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => reset()}>Cancel</AlertDialogCancel>
                        <Button type="submit" className="text-white" disabled={!isValid} >
                            Save changes
                        </Button> 
                    </AlertDialogFooter>
                </form>
                <div className="absolute right-2 top-[6px] z-40">
                    <HoverPopoverInputInfo
                        content={"To add a post, you must include a description (maximum length 255 characters), add a photo and the location of the photo you took. The photo cannot exceed 10MB and must have a .jpg, .jpeg, or .png extension."}
                    />
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default EditPostDialog;