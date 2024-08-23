import React, {useState, useEffect} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { Icons } from "@/components/icons";
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

const DeletePostDialog = ({postId, isOpen, setIsOpen, refetch, onClose}) => {
    const authHeader = useAuthHeader();

    const deletePostOnClick = () => {
        fetch(`http://localhost:5000/api/v1/posts/${postId}`, {
            method: 'DELETE',
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
            console.log(data);
            if (refetch) {
                refetch();
            }

        })
        .catch(error => {
            console.log(error);
            // toast({
            //     variant: "destructive",
            //     title: "Uh oh! Failed to delete post!",
            //     description: error.message,
            // })
        });
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose} >
            <AlertDialogTrigger>
                
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the post from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction type="button" onClick={deletePostOnClick} >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeletePostDialog;