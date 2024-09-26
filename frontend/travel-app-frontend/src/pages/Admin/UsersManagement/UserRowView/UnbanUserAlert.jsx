import React, { useState, useEffect, useContext } from "react";
import { cn } from "@/lib/utils";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Button } from "@/components/ui/button";
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


const UnbanUserAlert = ({ user, onOpen, onClose, setRefetchUsers}) => {
    const authHeader = useAuthHeader();

    const unbanUser = () => {   
        fetch(`http://localhost:5000/api/v1/users/${user.id}/unban`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeader,
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Błąd sieci!");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error.message);
        });
    };

    return (
        <AlertDialog
            open={onOpen}
            onOpenChange={onClose}
        >
            <AlertDialogTrigger className="hidden"></AlertDialogTrigger>
            <AlertDialogContent className="max-w-full w-[500px] rounded-lg">
                <form 
                    onSubmit={(e) => {
                        e.preventDefault();
                        unbanUser();
                        setRefetchUsers(true);
                        onClose();
                    }}
                >
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Unban user
                        </AlertDialogTitle>
                        <AlertDialogDescription className="">
                            Are you sure you want to undo a ban?
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogHeader className="py-5">

                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel
                        >
                            Cancel
                        </AlertDialogCancel>
                        <Button
                            variant="destructive"
                            type="submit"
                            className="text-white"
                        >
                            Unban
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>    
    );
};

export default UnbanUserAlert;
