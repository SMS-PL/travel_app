import React from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useToast } from "@/components/ui/use-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function PinSettingsButton({userId, setOpenDialog, pinId, setRefetch}) {
    const authHeader = useAuthHeader();
    const { toast } = useToast();
    const auth = useAuthUser();

    const deletePin = () => {
        fetch(`http://localhost:5000/api/v1/pins/${pinId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', 
                "Authorization": authHeader,
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(JSON.stringify(err));
                });
            }
            return response.json();
        })
        .then(data => {
            setOpenDialog(false);
            setRefetch(true);

            setRefetch(true);
            toast({
                title: "Hurrah!",
                description: "Pin deleted successfully!",
                className: "bg-green-800"
            })
        })
        .catch(error => {
            console.log(error);
            const errorMessage = JSON.parse(error.message);

            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: errorMessage.message,
            })
        });
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="gap-1 p-2 cursor-pointer hover:bg-secondary rounded-md">
                <DotsHorizontalIcon className="h-5 w-5" />
            </DropdownMenuTrigger>
            
            {auth.id == userId &&
                <DropdownMenuContent>
                    
                        <DropdownMenuItem 
                            className="cursor-pointer" 
                            onClick={() => deletePin()}
                        >
                            Delete pin
                        </DropdownMenuItem>
                    
                </DropdownMenuContent>
            }
        </DropdownMenu>
    )
}

export default PinSettingsButton;
