import { CalendarIcon } from "@radix-ui/react-icons";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "react-router-dom";
import FriendshipButton from '@/components/FriendshipsButton/FriendshipButton';

const HoverUserInfo = ({children, userData, ...props}) => {
    // console.log(userData);

    return (
        
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link to={`/profile/${userData.id}`} {...props} >
                    {children}
                </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-80" asChild>
                <div className="flex flex-col justify-center items-start">
                    <Link to={`/profile/${userData.id}`} className="flex flex-row">
                        <div className="flex flex-row gap-3 justify-center items-center" >
                            <Avatar className="w-[70px] h-[70px]">
                                <AvatarImage src={userData != {} && userData.photoUrl} alt="stock img" className="object-cover bg-black"/>
                                <AvatarFallback>{userData != {} && `${String(userData.firstName)[0]}${String(userData.lastName)[0]}`}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col justify-center items-start">
                                <span className="text-xl font-bold">{userData.firstName} {userData.lastName}</span>
                                <span className="text-md font-semibold text-gray-500">@{userData.username}</span>
                            </div>
                        </div>
                    </Link>
                    <div className="w-full flex justify-center items-center">
                        <FriendshipButton userId={userData.id} />
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
       
    );
};

export default HoverUserInfo;
