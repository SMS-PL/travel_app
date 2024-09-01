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
        editCommentDescription: prevContent,
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
                    "content": values.editCommentDescription,
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
                        <AlertDialogTitle>Edit comment description</AlertDialogTitle>
                        <AlertDialogDescription className="hidden"></AlertDialogDescription>
                    </AlertDialogHeader>
                    
                    <div className="grid gap-1 py-4 w-full">
                        <Textarea
                            id="editCommentDescription"
                            placeholder="Tell us a little bit about yourself"
                            className={cn(errors.editCommentDescription ? "border-2 border-red-600  focus:border-red-500" : "text-foreground border-0", " resize-y rounded-2xl bg-secondary min-h-[100px]")}
                            {...register("editCommentDescription", {
                                required: "Description is required",
                                maxLength: {
                                    value: 255,
                                    message: "The maximum length of the comment is 255 characters",
                                },
                            })}
                        />
                        {errors.editCommentDescription && errors.editCommentDescription.type === "required" && (
                            <p className="text-red-500 text-sm">Description is required!</p>
                        )}
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => reset()}>Cancel</AlertDialogCancel>
                        <Button type="submit" className="text-white" disabled={!isValid}>
                            Save changes
                        </Button> 
                    </AlertDialogFooter>
                </form>
                
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default EditCommentDialog;