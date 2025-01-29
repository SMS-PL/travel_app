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
import { useToast } from "@/components/ui/use-toast";


const DeleteCommentDialog = ({commentId, setCommentsData, commentsData, isOpen, onClose}) => {
    const authHeader = useAuthHeader();
    const { toast } = useToast();

    const deleteCommentOnClick = () => {
		fetch(`http://localhost:5000/api/v1/comments/${commentId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json', 
				"Authorization": authHeader,
			},
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Błąd sieci!');
			}
			return response.json();
		})
		.then(data => {
            console.log("Usunięto komentarz!");
            setCommentsData(
                commentsData.map((group, i) => (
                    group.filter(comment => comment.id !== commentId)
                ))
            );
            // setRefetch(true);
            toast({
                title: "Hurrah!",
                description: "Comment deleted correctly!",
                className: "bg-green-800 text-white"
            })
		})
		.catch(error => {
			console.log(error.message);
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
                        This action cannot be undone. This will permanently delete the comment from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction type="button" onClick={deleteCommentOnClick} >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteCommentDialog;