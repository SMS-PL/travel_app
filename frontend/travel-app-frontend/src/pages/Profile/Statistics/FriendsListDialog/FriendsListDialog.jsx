import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import FriendsListRowView from "./FriendsListRowView";
import HoverUserInfo from "@/components/ui/HoverUserInfo";
import SpinLoading from '@/components/ui/SpinLoading';

const FriendsListDialog = ({userFriendsList}) => {

    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div>
                    <Button className="text-white gap-[4px] px-[10px] text-sm" >
                        <Icons.userFill className="h-[15px] w-[15px] fill-white" />
                        Show all
                    </Button>
                </div>
            </DialogTrigger>

            <DialogContent className="flex flex-col justify-center items-center max-w-full w-[700px] rounded-lg px-2 py-10 sm:p-10">
                <DialogHeader className="w-full text-center sm:text-start" >
                    <DialogTitle className="font-extrabold">All friends</DialogTitle>
                    <DialogDescription className="">Here you can find the user's friends list</DialogDescription>
                </DialogHeader>
                <div className="w-full">
                    <div className="flex flex-col justify-center items-center w-full gap-2">
                        {!userFriendsList && <SpinLoading className="w-full flex justify-center items-center" /> }

                        {userFriendsList && userFriendsList.length != 0 && (userFriendsList.map((user, i) => {
                            return (
                                <FriendsListRowView key={`userFriendshipList${user.id}`} user={user} setOpen={setOpen} />
                            )
                        }))}
                    </div>

                    {userFriendsList && userFriendsList.length == 0 && (
                        <div className="text-gray-400 flex flex-col justify-center items-center leading-[140px] pt-2 relative">
                            <Icons.userFill className="h-[100px] w-[100px] fill-white opacity-20" />
                            <span className="text-sm mt-4">The user has not friends.</span>
                        </div>
                    )}
                </div>
                
            </DialogContent>
        </Dialog>
    );
};

export default FriendsListDialog;
