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
import AchievementView from "@/components/Achievements/AchievementView";

const AchievementsDialog = ({userAchievements}) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <Button className="text-white gap-1 text-sm" >
                        <Icons.medal2Fill className="h-5 w-5 fill-white" />
                        Show all
                    </Button>
                </div>
            </DialogTrigger>

            <DialogContent className="flex flex-col justify-center items-center max-w-full w-[800px] p-10">
                <DialogHeader>
                    <DialogTitle className="font-extrabold">All achievements</DialogTitle>
                    <DialogDescription>
                        Here you will find all achievements earned by this user.
                    </DialogDescription>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-y-scroll max-h-[70vh] items-start pt-5 gap-5">
                        {userAchievements && (userAchievements.content.slice().map((achievement, i) => {
                            console.log(i);
                            return (
                                <AchievementView key={`userAchievements${achievement.id}`} achievement={achievement}/>
                            )
                        }))}
                    </div>

                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default AchievementsDialog;
