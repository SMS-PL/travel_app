import React, { useState, useEffect, useContext } from "react";
import { cn } from "@/lib/utils";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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


const MakeAdminOrUserAlert = ({ user, onOpen, onClose, setRefetchUsers}) => {
    const authHeader = useAuthHeader();

    const makeAdminOrUser = () => {
        fetch(`http://localhost:5000/api/v1/admin/admins/make/${user.id}`, {
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
                        makeAdminOrUser();
                        setRefetchUsers(true);
                        onClose();
                    }}
                >
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Switch ROLE_ADMIN or ROLE_USER
                        </AlertDialogTitle>
                        <AlertDialogDescription className="">
                            Are you sure you want to switch roles?
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
                            Switch
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>      
    );
};

export default MakeAdminOrUserAlert;
