import React, { useState, useEffect, useContext } from 'react';
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
import { cn } from '@/lib/utils';

const UserDetailsAlert = ({user, onOpen, onClose }) => {

    const [open, setOpen] = useState(false);


    return (
        <AlertDialog
            open={onOpen}
            onOpenChange={onClose}
        >
            <AlertDialogTrigger className="hidden" asChild><div></div></AlertDialogTrigger>
            <AlertDialogContent className="max-w-full w-[800px] rounded-lg h-fit">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Details of user.
                    </AlertDialogTitle>
                    <AlertDialogDescription className="hidden"></AlertDialogDescription>
                </AlertDialogHeader>

                <div className=" break-all">
                    {JSON.stringify(user)}
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel
                    >
                        Close
                    </AlertDialogCancel>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog> 
    );
};

export default UserDetailsAlert;
