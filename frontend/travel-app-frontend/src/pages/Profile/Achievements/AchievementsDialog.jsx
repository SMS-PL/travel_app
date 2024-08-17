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
import AchievementView from "@/pages/Profile/Achievements/AchievementView";

const AchievementsDialog = ({userAchievements}) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <Button className="text-white gap-[2px] px-[10px] text-sm" >
                        <Icons.medal2Fill className="h-5 w-5 fill-white" />
                        Show all
                    </Button>
                </div>
            </DialogTrigger>

            <DialogContent className="flex flex-col justify-center items-center max-w-full w-[800px] p-10">
                <DialogHeader className="w-full">
                    <DialogTitle className="font-extrabold">All achievements</DialogTitle>
                    <DialogDescription>
                        Here you will find all achievements earned by this user.
                    </DialogDescription>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-y-scroll max-h-[70vh] pt-2 items-start gap-5">
                        {userAchievements && (userAchievements.content.slice().map((achievement, i) => {
                            return (
                                <AchievementView key={`userAchievements${achievement.id}`} achievement={achievement}/>
                            )
                        }))}
                    </div>

                    {userAchievements && userAchievements.totalElements == 0 && (
                        <div className="text-gray-400 flex flex-col justify-center items-center leading-[140px] pt-2 relative">
                            <img src="/medals/silver_medal.png" alt="" className="w-[170px] h-[170px] opacity-20" />
                            <span className="text-sm absolute bottom-[-7px]">The user has not earned any achievements yet.</span>
                        </div>
                    )}

                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default AchievementsDialog;
