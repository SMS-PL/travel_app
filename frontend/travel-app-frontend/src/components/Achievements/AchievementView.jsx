import React from 'react';
import { Icons } from "@/components/icons";

const AchievementView = ({achievement}) => {
    console.log(achievement)

    return (
        <div className="flex flex-col justify-center items-center cursor-pointer">
            <div className="flex flex-col justify-center items-center bg-secondary border-primary border-2 rounded-full w-[60px] h-[60px]">
                
                {(achievement.level != null) && achievement.level === 0 && (
                    <Icons.medalFill className="h-8 w-8 fill-yellow-900" />
                )}
                {(achievement.level != null) && achievement.level === 1 && (
                    <Icons.medalFill className="h-8 w-8 fill-gray-400" />
                )}

                {(achievement.level != null) && achievement.level === 2 && (
                    <Icons.medalFill className="h-8 w-8 fill-yellow-500" />
                )}

                {(achievement.level != null) && achievement.level === 3 && (
                    <Icons.medalFill className="h-8 w-8 fill-red-600" />
                )}

            </div>

            <div className="relative bg-primary rounded-full flex justify-center items-center w-5 h-5 text-center text-white font-bold top-[-20px] right-[-25px]">
                {achievement.level}
            </div>

            <p className="relative font-normal text-xs text-center top-[-14px]">
                {achievement.title}
            </p>
        </div>
    );
};

export default AchievementView;
