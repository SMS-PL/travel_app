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


const BanUserAlert = ({ user, onOpen, onClose, setRefetchUsers}) => {
    const authHeader = useAuthHeader();

    const [daysOfBan, setDaysOfBan] = useState(0);

    const banUser = () => {
        if((daysOfBan > 0) && (daysOfBan < 1827)) {
            fetch(`http://localhost:5000/api/v1/users/${user.id}/ban/${daysOfBan}`, {
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
        }
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
                        banUser();
                        setRefetchUsers(true);
                        onClose();
                    }}
                >
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Set ban time (in days):
                        </AlertDialogTitle>
                        <AlertDialogDescription className="hidden"></AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogHeader className="py-5">
                        <Input 
                            type="number" 
                            min={1} 
                            max={1826} 
                            onChange={(e) => setDaysOfBan(e.target.value)}
                            value={daysOfBan}
                        />
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
                            Ban
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>    
    );
};

export default BanUserAlert;
