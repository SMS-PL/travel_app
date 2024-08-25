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

const EditCommentDialog = ({commentId, prevContent, isOpen, setRefetch, onClose}) => {
    const authHeader = useAuthHeader();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isValid },
    } = useForm({defaultValues: {
        description: prevContent,
    }});

    const onSubmit = async (values) => {
        
        if (isValid) {
            await fetch(`http://localhost:5000/api/v1/comments/${commentId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json', 
                    "Authorization": authHeader,
                },
                body: JSON.stringify({
                    "content": values.description,
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
                console.log(data);
                setRefetch(true);

                onClose();
            })
            .catch(error => {
                console.log(error);
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
                            id="description"
                            placeholder="Tell us a little bit about yourself"
                            className={cn(errors.description ? "border-2 border-red-600  focus:border-red-500" : "text-foreground border-0", " resize-y rounded-2xl bg-secondary min-h-[100px]")}
                            {...register("description", {
                                required: "Description is required",
                            })}
                        />
                        {errors.description && errors.description.type === "required" && (
                            <p className="text-red-500 text-sm">Description is required!</p>
                        )}
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => reset()}>Cancel</AlertDialogCancel>
                        <Button type="submit" className="text-white">
                            Save changes
                        </Button> 
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default EditCommentDialog;