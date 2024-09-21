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
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import HoverUserInfo from "@/components/ui/HoverUserInfo";
import SpinLoading from '@/components/ui/SpinLoading';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { RefreshFriendshipContext } from '@/contexts/RefreshFriendshipContext';
import { cn } from '@/lib/utils';
import{
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@radix-ui/react-icons";

const PostDetailsAlert = ({post, onOpen, onClose }) => {

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
                        Details of post.
                    </AlertDialogTitle>
                    <AlertDialogDescription className="hidden"></AlertDialogDescription>
                </AlertDialogHeader>

                <div className=" break-all">
                    {JSON.stringify(post)}
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

export default PostDetailsAlert;
